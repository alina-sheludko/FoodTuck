import axios from 'axios'; 

export function getTopNavigation() {
  return axios.get(import.meta.env.VITE_API + '/api/navigation/top')
    .then(function ({data}) {
      return data;
    })
}