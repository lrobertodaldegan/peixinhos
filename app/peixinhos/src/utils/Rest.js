import axios from 'axios';

const DEFAULT_HEADERS = {
  'X-Requested-With': 'XMLHttpRequest'
}

const get = async (urlPath, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let response = await axios.get(urlPath, {headers:headers});

    return response;
  }catch(err){
    console.log(err);

    errorHandler();

    return {status:500, error:err}
  }
}

const post = async (urlPath, body={}, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{    
    let response = await axios.post(urlPath, body, {
      headers: headers
    });

    return response;
  }catch(err){
    console.log(err);

    errorHandler();

    return {status:500, error:err}
  }
}

const del = async (urlPath, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{    
    let response = await axios.delete(urlPath, {
      headers: headers
    });

    return response;
  }catch(err){
    console.log(err);

    errorHandler();

    return {status:500, error:err}
  }
}

export {
  get,
  post,
  del,
}