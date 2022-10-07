import axios from 'axios';

export const fetcher = (url: string) => 
  axios
    .get(url)
    .then(res => res.data)
    .catch(err => {
      // console.error(err);
      return []
    });
