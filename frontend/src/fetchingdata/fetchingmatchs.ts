export type Match = {
  id: number
  competition: string
  minute: string
  time: string
  date: string
  homeTeam: string
  awayTeam: string
  homeScore: number | null
  awayScore: number | null
  stadium: string
  status: 'live' | 'finished' | 'upcoming'
}

const url = 'https://www.sofascore.com/api/v1/unique-tournament/937/season/78750/events/round/'

async function fetchingmatchs(round: number, status: string | null): Promise<Match[]> {
  const response = await fetch(`${url}${round}`)
  const data = await response.json()
  console.log(data)

  if (status === "") {
    status = 'live'
  }

  return data.events.map((match: any) => ({
    id: match.id,
    competition: match.tournament.name,
    minute: match.status.description,
    time: new Date(match.startTimestamp * 1000).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    date: new Date(match.startTimestamp * 1000).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    }),
    homeTeam: match.homeTeam.shortName,
    awayTeam: match.awayTeam.shortName,
    homeScore: match.homeScore?.current ?? null,
    awayScore: match.awayScore?.current ?? null,
    stadium: match.venue?.name ?? 'Stade non defini',
    status:
      match.status.type === 'inprogress'
        ? 'live'
        : match.status.type === 'finished'
          ? 'finished'
          : 'upcoming',
  }))
}


export default fetchingmatchs
