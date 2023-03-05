import axios from 'axios'; 

export function getTopNavigation() {
  return axios.get('/api/navigation/top')
    .then(function ({data}) {
      return data;
    })
}