<template>
  <header class="site-header">
    <a class="brand" href="/" aria-label="Accueil Botola Pro">
      <img src="../assets/logo_botola.png" alt="Logo Botola Pro" class="brand-mark" width="44" height="44" />
      <span class="brand-text">
        <strong>Botola Pro</strong>
        <small>Le football marocain en direct</small>
      </span>
    </a>

    <nav class="main-nav" aria-label="Navigation principale">
      <a href="#matches">Matchs</a>
      <a href="#classement">Classement</a>
      <a href="#stats">Stats</a>
      <a href="#news">Actus</a>
    </nav>

    <label class="theme-switch" for="dark-mode">
      <span>Light</span>
      <span>Dark</span>
    </label>

    <div class="user-actions">
      <span class="user-icon" aria-hidden="true">
        <i class="fas fa-user"></i>
      </span>
      <button class="login-button" type="button">Se connecter</button>
    </div>
  </header>
</template>

<style scoped>
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

.brand-text {
  display: grid;
  gap: 2px;
  line-height: 1.05;
}

.brand-text strong {
  font-size: 1rem;
}

.brand-text small {
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 700;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: clamp(14px, 3vw, 32px);
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

:global(.theme-input:checked) ~ .site-header .theme-switch span:first-child {
  background: transparent;
  color: var(--muted);
}

:global(.theme-input:checked) ~ .site-header .theme-switch span:last-child {
  background: var(--primary);
  color: #07110d;
}

.user-actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.user-icon {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  color: var(--primary);
  font-size: 0.95rem;
}

.login-button {
  min-height: 40px;
  cursor: pointer;
  border: 0;
  border-radius: 8px;
  background: var(--primary);
  color: #ffffff;
  padding: 0 16px;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 900;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.login-button:hover {
  background: var(--primary-strong);
  transform: translateY(-1px);
}

.login-button:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--primary) 35%, transparent);
  outline-offset: 2px;
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

  .user-actions {
    margin-left: auto;
  }
}
</style>
