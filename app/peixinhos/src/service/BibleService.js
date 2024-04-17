import { get } from "../utils/Rest";
import CacheService from './CacheService';

const HEADERS = {
  'X-Requested-With': 'XMLHttpRequest',
  'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1vbiBOb3YgMjAgMjAyMyAxOTo1OTozNCBHTVQrMDAwMC5scm9iZXJ0b2RhbGRlZ2FuQGhvdG1haWwuY29tIiwiaWF0IjoxNzAwNTEwMzc0fQ.XMsrrf_p_edVWE3DbVn1u7ety2Ny62o2JE1vF7JlMbw'
}

const errorHandler = (err) => console.log(err);

const getBook = async (abrev, errorHandler=(err)=>errorHandler(err)) => {
  return get(`https://www.abibliadigital.com.br/api/books/${abrev}`, 
              errorHandler, HEADERS)
  .then(async (response) => {
    return {status:response.status, content:{...response.data}};
  });
}

const getChapter = async (abrev, chap, errorHandler=(err)=>errorHandler(err)) => {
  let key = `@bible_book_${abrev}${chap}`;

  let chapter = await CacheService.get(key);

  if(chapter && chapter !== null){
    return JSON.parse(chapter);
  } else {
    return get(`https://www.abibliadigital.com.br/api/verses/nvi/${abrev}/${chap}`, 
                errorHandler, HEADERS)
    .then(async (response) => {
      let result = {status:response.status, content:{...response.data}};

      await CacheService.register(key, JSON.stringify(result));

      return result;
    });
  }
}

const getRandomVerse = async (errorHandler=(err)=>errorHandler(err)) => {
  return get(
    `https://www.abibliadigital.com.br/api/verses/nvi/random?t=${new Date().getTime()}`, 
      errorHandler, 
      HEADERS
  )
  .then(async (response) => {
    let result = {status:response.status, content:{...response.data}};

    return result;
  });
}

export { 
  getBook, 
  getChapter, 
  getRandomVerse,
}