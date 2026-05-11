export type TopStats = {
  topScorer: { name: string; team: string; value: number }
  topAssists: { name: string; team: string; value: number }
  topRating: { name: string; team: string; value: number }
  cleanSheets: { name: string; team: string; value: number }
}

const url = 'https://www.sofascore.com/api/v1/unique-tournament/937/season/78750/top-players/overall'

async function fetchingtopstats(): Promise<TopStats> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      'Referer': 'https://www.sofascore.com/',
    },
  })
  const data = await response.json()
  const tp = data.topPlayers

  return {
    topScorer: extract(tp, 'goals'),
    topAssists: extract(tp, 'assists'),
    topRating: extract(tp, 'rating'),
    cleanSheets: extract(tp, 'cleanSheet'),
  }
}

function extract(tp: any, key: string) {
  const entry = tp[key]?.[0]
  return {
    name: entry?.player?.name?.trim() ?? '',
    team: entry?.team?.shortName ?? entry?.team?.name ?? '',
    value: entry?.statistics?.[key] ?? 0,
  }
}

export default fetchingtopstats
