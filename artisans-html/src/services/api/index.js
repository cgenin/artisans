import fetch from 'isomorphic-fetch';

const preprend = (process.env.NODE_ENV  !== 'production') ? 'http://localhost:8888' : '';

export default   {
  get(url){
    return fetch(`${preprend}${url}`)
      .then(res => res.json());
  }
}
