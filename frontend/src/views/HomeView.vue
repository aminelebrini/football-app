<script lang="ts">
import fetchingmatchs from '@/fetchingdata/fetchingmatchs'
import type { Match } from '@/fetchingdata/fetchingmatchs'

export default {
  name: 'HomeView',

  data() {
    return {
      matches: [] as Match[],
      round: 2,
      status: "live",
      isLoadingMatches: true,
      matchesError: '',
      date: new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    }
  },
  computed: {
    totalGoals(): number {
      return (
        this.matches?.reduce(
          (acc: number, m: Match) => acc + (m.homeScore ?? 0) + (m.awayScore ?? 0),
          0,
        ) || 0
      )
    },
    filteredMatches(): Match[] {
      if (this.status === 'live') {
        return this.matches.filter((m) => m.status === 'live')
      } else if (this.status === 'Not started') {
        return this.matches.filter((m) => m.status === 'upcoming')
      } else if (this.status === 'Ended') {
        return this.matches.filter((m) => m.status === 'finished')
      }
      return this.matches
    },
  },
  async mounted() {
    await this.loadMatches(this.status)
  },
  watch: {
    round() {
      this.loadMatches(this.status)
    },
  },
  methods: {
    async loadMatches(s: string) {
      this.status = s
      this.isLoadingMatches = true
      this.matchesError = ''

      try {
        this.matches = await fetchingmatchs(this.round, s)
      } catch (error) {
        console.error('Erreur pendant le chargement des matchs:', error)
        this.matchesError = 'Impossible de charger les matchs pour le moment.'
        this.matches = []
      } finally {
        this.isLoadingMatches = false
      }
    },

    getTeamCode(teamName: string) {
      return teamName
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 3)
        .toUpperCase()
    },

    getMatchTime(match: Match) {
      return match.status === 'live' || match.status === 'finished' ? match.minute : match.time
    },

    getMatchDate(match: Match) {
      return match.date
    },

    formatMatchScore(match: Match) {
      if (match.homeScore === null || match.awayScore === null) {
        return 'vs'
      }

      return `${match.homeScore} - ${match.awayScore}`
    },
  },
}
</script>

<template>
  <main class="home-page">
    <input id="dark-mode" class="theme-input" type="checkbox" aria-label="Activer le mode sombre" />

    <SiteHeader />

    <section class="hero">
      <div class="hero-content">
        <p class="eyebrow">Botola Pro 1</p>
        <h1>Scores, calendrier et classement du championnat marocain.</h1>
        <p class="hero-text">
          Une page simple pour suivre les matchs du jour, les temps forts, le tableau
          du championnat et les dernieres nouvelles des clubs.
        </p>

        <div class="hero-actions">
          <a class="primary-action" href="#matches">Matchs du jour</a>
          <a class="secondary-action" href="#classement">Voir le classement</a>
        </div>
      </div>
      <img src="/src/assets/image.png" alt="Hero Image" width="300" height="300" class="hero-image" />
    </section>

    <section class="quick-stats" aria-label="Statistiques rapides">
      <article>
        <span>Matchs aujourd'hui</span>
        <strong>{{ matches.length }}</strong>
      </article>
      <article>
        <span>Buts marques</span>
        <strong>{{ totalGoals }}</strong>
      </article>
      <article>
        <span>Leader</span>
        <strong>AS FAR</strong>
      </article>
      <article>
        <span>Clean sheets</span>
        <strong>9</strong>
      </article>
    </section>

    <section class="dashboard">
      <div class="main-column">
        <section id="matches" class="panel">
          <div class="section-heading">
            <div>
              <p class="section-kicker">Calendrier</p>
              <h2>Matchs du jour</h2>
              <p class="section-date">{{ date }}</p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="filter-row">
              <button
                :class="{ active: status === 'live' }"
                @click="loadMatches('live')"
              >
                En direct
              </button>
              <button
                :class="{ active: status === 'Not started' }"
                @click="loadMatches('Not started')"
              >
                A venir
              </button>
              <button
                :class="{ active: status === 'Ended' }"
                @click="loadMatches('Ended')"
              >
                Termines
              </button>
            </div>
            <div class="bg-white p-2 rounded shadow-sm w-max">
              <select name="round" id="round" v-model="round" class="border rounded p-1">
                <option v-for="n in 30" :value="n">Round {{ n }}</option>
              </select>
            </div>
          </div>

          <div v-if="isLoadingMatches" class="match-list">
            <article class="match-row">
              <span class="match-time">...</span>
              <span class="team-name">Chargement des matchs</span>
              <strong class="match-score">...</strong>
              <span class="team-name">Veuillez patienter</span>
            </article>
          </div>

          <div v-else-if="matchesError" class="match-list">
            <article class="match-row">
              <span class="match-time">!</span>
              <span class="team-name"></span>
              <strong class="match-score">-</strong>
              <span class="team-name">{{ matchesError }}</span>
            </article>
          </div>

          <div v-else class="match-list">
            <article
              v-for="match in filteredMatches"
              :key="match.id"
              class="match-row"
              :class="{ 'is-live': match.status === 'live' }"
            >
              <span class="match-time">{{ getMatchTime(match) }}</span>
              <span class="team-name">{{ match.homeTeam }}</span>
              <strong class="match-score">{{ formatMatchScore(match) }}</strong>
              <span class="team-name">{{ match.awayTeam }}</span>
            </article>

            <article v-if="filteredMatches.length === 0" class="match-row">
              <span class="match-time">-</span>
              <span class="team-name">Aucun match</span>
              <strong class="match-score">-</strong>
              <span class="team-name">Disponible</span>
            </article>
          </div>
        </section>
      </div>
      <aside class="side-column">
        <section id="classement" class="panel">
          <div class="section-heading compact">
            <div>
              <p class="section-kicker">Botola Pro 1</p>
              <h2>Classement</h2>
            </div>
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Club</th>
                  <th>J</th>
                  <th>Pts</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span>1</span> AS FAR</td>
                  <td>18</td>
                  <td>38</td>
                </tr>
                <tr>
                  <td><span>2</span> RS Berkane</td>
                  <td>18</td>
                  <td>35</td>
                </tr>
                <tr>
                  <td><span>3</span> Raja CA</td>
                  <td>18</td>
                  <td>32</td>
                </tr>
                <tr>
                  <td><span>4</span> Wydad AC</td>
                  <td>18</td>
                  <td>31</td>
                </tr>
                <tr>
                  <td><span>5</span> FUS Rabat</td>
                  <td>18</td>
                  <td>29</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="stats" class="panel">
          <div class="section-heading compact">
            <div>
              <p class="section-kicker">Performance</p>
              <h2>Top stats</h2>
            </div>
          </div>

          <div class="stat-list">
            <article>
              <span>Meilleur buteur</span>
              <strong>Y. Mehri</strong>
              <small>12 buts</small>
            </article>
            <article>
              <span>Meilleure defense</span>
              <strong>RS Berkane</strong>
              <small>9 buts encaisses</small>
            </article>
            <article>
              <span>Serie active</span>
              <strong>AS FAR</strong>
              <small>7 matchs sans defaite</small>
            </article>
            <article>
              <span>Meilleur passeur</span>
              <strong>A. El Idrissi</strong>
              <small>8 passes decisives</small>
            </article>
          </div>
        </section>
      </aside>
    </section>
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.home-page {
  min-height: 100vh;
  --bg: #f3f6f4;
  --surface: #ffffff;
  --surface-soft: #eef4f0;
  --text: #122017;
  --muted: #647067;
  --line: rgba(18, 32, 23, 0.1);
  --primary: #0f7a49;
  --primary-strong: #075f37;
  --danger: #c92f45;
  --shadow: 0 22px 70px rgba(18, 32, 23, 0.11);
  background: var(--bg);
  color: var(--text);
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.theme-input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.home-page:has(.theme-input:checked) {
  --bg: #07110d;
  --surface: #101c17;
  --surface-soft: #16251f;
  --text: #e8f1eb;
  --muted: #a6b6ad;
  --line: rgba(232, 241, 235, 0.12);
  --primary: #36c47f;
  --primary-strong: #58d995;
  --danger: #ff6679;
  --shadow: 0 22px 70px rgba(0, 0, 0, 0.34);
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  padding: 16px clamp(18px, 4vw, 64px);
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(18px);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--text);
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border-radius: 8px;
  background: var(--primary);
  color: #ffffff;
  font-weight: 950;
}

.brand span:last-child {
  display: grid;
  gap: 2px;
}

.brand strong {
  font-size: 1rem;
}

.brand small {
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 700;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: clamp(14px, 3vw, 34px);
}

.main-nav a {
  color: var(--muted);
  font-size: 0.94rem;
  font-weight: 850;
  text-decoration: none;
}

.main-nav a:hover {
  color: var(--primary);
}

.theme-switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 116px;
  min-height: 40px;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 900;
}

.theme-switch span {
  display: grid;
  place-items: center;
}

.theme-switch span:first-child {
  background: var(--text);
  color: var(--surface);
}

.theme-input:checked ~ .site-header .theme-switch span:first-child {
  background: transparent;
  color: var(--muted);
}

.theme-input:checked ~ .site-header .theme-switch span:last-child {
  background: var(--primary);
  color: #07110d;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(340px, 0.75fr);
  gap: clamp(28px, 5vw, 70px);
  align-items: center;
  padding: clamp(52px, 8vw, 96px) clamp(18px, 4vw, 64px) 34px;
}

.hero-content {
  max-width: 780px;
}

.hero-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  justify-self: center;
}

.eyebrow,
.section-kicker {
  margin: 0;
  color: var(--primary);
  font-size: 0.78rem;
  font-weight: 950;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  max-width: 820px;
  margin-bottom: 22px;
  font-size: clamp(2.7rem, 6vw, 5.4rem);
  line-height: 0.98;
}

.hero-text {
  max-width: 640px;
  color: var(--muted);
  font-size: clamp(1rem, 1.8vw, 1.22rem);
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.primary-action,
.secondary-action,
.section-heading a {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0 18px;
  font-weight: 900;
  text-decoration: none;
}

.primary-action {
  background: var(--primary);
  color: #ffffff;
}

.secondary-action,
.section-heading a {
  border: 1px solid var(--line);
  color: var(--text);
}

.live-card,
.panel,
.quick-stats article {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  box-shadow: var(--shadow);
}

.live-card {
  display: grid;
  gap: 28px;
  padding: clamp(22px, 4vw, 34px);
}

.live-card-header,
.match-meta,
.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.live-card-header {
  color: var(--muted);
  font-size: 0.88rem;
  font-weight: 850;
}

.live-pill {
  border-radius: 999px;
  background: rgba(201, 47, 69, 0.12);
  color: var(--danger);
  padding: 7px 10px;
}

.score-board {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 18px;
  align-items: center;
}

.club {
  display: grid;
  justify-items: center;
  gap: 12px;
  text-align: center;
}

.club-logo {
  display: grid;
  width: 76px;
  height: 76px;
  place-items: center;
  border-radius: 50%;
  color: #ffffff;
  font-weight: 950;
}

.club-logo.green {
  background: var(--primary);
}

.club-logo.red {
  background: var(--danger);
}

.score {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px 10px;
  border-radius: 8px;
  background: var(--surface-soft);
  padding: 12px 18px;
  color: var(--primary);
  font-size: 2rem;
  font-weight: 950;
}

.score span:not(.match-date) {
  color: var(--muted);
  font-size: 1.25rem;
}

.match-date {
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 600;
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 2px;
}

.match-meta {
  color: var(--muted);
  font-size: 0.88rem;
  font-weight: 750;
}

.quick-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  padding: 0 clamp(18px, 4vw, 64px) 22px;
}

.quick-stats article {
  display: grid;
  gap: 8px;
  padding: 18px;
  box-shadow: none;
}

.quick-stats span,
.stat-list span {
  color: var(--muted);
  font-size: 0.86rem;
  font-weight: 800;
}

.quick-stats strong {
  font-size: 1.55rem;
}

.dashboard {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.6fr);
  gap: 22px;
  padding: 0 clamp(18px, 4vw, 64px) clamp(56px, 7vw, 90px);
}

.main-column,
.side-column {
  display: grid;
  align-content: start;
  gap: 22px;
}

.panel {
  padding: clamp(18px, 3vw, 26px);
}

.section-heading {
  margin-bottom: 20px;
}

.section-heading.compact {
  margin-bottom: 14px;
}

.section-heading h2 {
  margin: 4px 0 0;
  font-size: clamp(1.35rem, 2vw, 1.7rem);
}

.section-date {
  margin: 2px 0 0;
  color: var(--muted);
  font-size: 0.86rem;
  font-weight: 700;
}

.section-heading a {
  min-height: 38px;
  color: var(--muted);
  font-size: 0.86rem;
}

.filter-row {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  overflow-x: auto;
  padding-bottom: 2px;
}

.filter-row button {
  min-height: 36px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface-soft);
  color: var(--muted);
  cursor: pointer;
  padding: 0 14px;
  font-weight: 900;
}

.filter-row button.active {
  border-color: transparent;
  background: var(--primary);
  color: #ffffff;
}

.match-list {
  display: grid;
  gap: 10px;
}

.match-row {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) 72px minmax(0, 1fr);
  align-items: center;
  gap: 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface-soft);
  padding: 14px;
}

.match-row.is-live {
  border-color: color-mix(in srgb, var(--danger) 42%, transparent);
}

.match-time {
  color: var(--danger);
  font-weight: 950;
}

.team-name {
  color: var(--text);
  font-weight: 850;
}

.match-score {
  justify-self: center;
  color: var(--primary);
}

.news-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 14px;
}

.news-card {
  display: grid;
  align-content: end;
  min-height: 150px;
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(15, 122, 73, 0.78), rgba(18, 32, 23, 0.9)),
    var(--surface-soft);
  color: #ffffff;
  padding: 20px;
}

.news-card.main-news {
  grid-row: span 2;
  min-height: 314px;
}

.news-card span {
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.76);
  font-size: 0.78rem;
  font-weight: 950;
  text-transform: uppercase;
}

.news-card h3 {
  margin-bottom: 8px;
  font-size: 1.1rem;
  line-height: 1.28;
}

.news-card p {
  margin-bottom: 0;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.55;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border-bottom: 1px solid var(--line);
  padding: 13px 8px;
  text-align: left;
}

th {
  color: var(--muted);
  font-size: 0.78rem;
  text-transform: uppercase;
}

td {
  font-weight: 850;
}

td span {
  display: inline-grid;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  place-items: center;
  border-radius: 6px;
  background: var(--surface-soft);
  color: var(--primary);
  font-size: 0.8rem;
}

.stat-list {
  display: grid;
  gap: 12px;
}

.stat-list article {
  display: grid;
  gap: 5px;
  border-radius: 8px;
  background: var(--surface-soft);
  padding: 14px;
}

.stat-list strong {
  font-size: 1.04rem;
}

.stat-list small {
  color: var(--muted);
  font-weight: 750;
}

@media (max-width: 980px) {
  .hero,
  .dashboard {
    grid-template-columns: 1fr;
  }

  .quick-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .site-header {
    flex-wrap: wrap;
  }

  .main-nav {
    order: 3;
    width: 100%;
    justify-content: space-between;
    overflow-x: auto;
  }

  .theme-switch {
    width: 104px;
  }

  .score-board,
  .news-grid {
    grid-template-columns: 1fr;
  }

  .score {
    justify-self: center;
  }

  .match-row {
    grid-template-columns: 52px 1fr;
  }

  .match-score {
    justify-self: start;
  }
}

@media (max-width: 520px) {
  .quick-stats {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 2.45rem;
  }
}
</style>
