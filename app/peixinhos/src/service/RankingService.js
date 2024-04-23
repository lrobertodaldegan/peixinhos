import { get, post } from "../utils/Rest";

const RANKING_API = 'https://lucasrobertodev.com.br/api/peixinhos/ranking';
const RANKING_HEADERS = {
  'X-Requested-With': 'XMLHttpRequest', 
  'app-key':'ASJ7*GDSAG.kdf'
};

const errorHandler = (err) => console.log(err);

const postRanking = (body) => {
  try{
    return post(RANKING_API, body, errorHandler, RANKING_HEADERS);
  }catch(err){
    errorHandler(err);

    return null;
  }
};

const getRanking = () => {
  try{
    return get(`${RANKING_API}?d=${new Date().getTime()}`, errorHandler, RANKING_HEADERS);
  }catch(err){
    errorHandler(err);

    return null;
  }
};

export { 
  postRanking,
  getRanking,
}