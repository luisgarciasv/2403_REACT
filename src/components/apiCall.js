
const baseUrl = "https://pokeapi.co/api/v2/"

export default function apiCall(url){
  return fetch(baseUrl+url)
    .then( res => {
      if (!res.ok) throw new Error(`Response status: ${response.status}`);
      return res.json()})
}