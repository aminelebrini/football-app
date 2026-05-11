export type Standing = {
  position: number
  teamName: string
  teamShortName: string
  matches: number
  wins: number
  draws: number
  losses: number
  scoresFor: number
  scoresAgainst: number
  points: number
  scoreDiff: string
}

const url = 'https://www.sofascore.com/api/v1/unique-tournament/937/season/78750/standings/total'

async function fetchingstanding(): Promise<Standing[]> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      'Referer': 'https://www.sofascore.com/',
    },
  })
  const data = await response.json()

  return data.standings[0].rows.map((row: any) => ({
    position: row.position,
    teamName: row.team.name,
    teamShortName: row.team.shortName,
    matches: row.matches,
    wins: row.wins,
    draws: row.draws,
    losses: row.losses,
    scoresFor: row.scoresFor,
    scoresAgainst: row.scoresAgainst,
    points: row.points,
    scoreDiff: row.scoreDiffFormatted,
  }))
}

export default fetchingstanding
