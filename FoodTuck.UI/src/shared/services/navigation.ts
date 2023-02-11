import axios from 'axios'; 

export function getTopNavigation() {
  return axios.get('http://localhost:3000/api/navigation/top')
    .then(function ({data}) {
      return data;
    })
}