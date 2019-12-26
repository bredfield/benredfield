
const BASE_URL = `https://api.airvisual.com/v2`
const API_KEY = `84a58c0a-f465-49d9-8b2b-bb4b0a413be4`
const NEAREST_CITY_URL = `${BASE_URL}/nearest_city?key=${API_KEY}`
const DAY_MS = 60 * 60 * 1000 * 24

export async function getLocalAirData() {
  const resp = await fetch(NEAREST_CITY_URL)
  const json = await resp.json()
  return json['data']
}

export async function getCachedAirData() {
  const now = new Date()
  const stored = localStorage.getItem('airData')
  const parsed = JSON.parse(stored)
  let timestamp = null
  let delta_ms = null

  if (parsed) {
    timestamp = new Date(parsed['current']['pollution']['ts'])
    delta_ms = now.getTime() - timestamp.getTime()
  }


  if (!stored || (delta_ms && delta_ms > DAY_MS)) {
    console.log('Pulling new air data')
    const airData = await getLocalAirData()

    localStorage.setItem(
      'airData',
      JSON.stringify(airData)
    )
    return airData
  }
  else {
    return await JSON.parse(stored)
  }
}

export function aqiusToQuality(aqius) {
  if (aqius >= 0 && aqius <= 50) {
    return "good"
  }
  else if (aqius >= 51 && aqius <= 100) {
    return "moderate"
  }
  else if (aqius >= 101 && aqius <= 150) {
    return "unhealthy for sensitive groups"
  }
  else if (aqius >= 151 && aqius <= 200) {
    return "unhealthy"
}
  else if (aqius >= 201 && aqius <= 300) {
    return "very unhealthy"
  }
  else if (aqius >= 301 && aqius <= 500) {
    return "hazardous"
  }
  else {
    return "unreal"
  }
}

