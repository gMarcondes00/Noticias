import './App.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {useState, useEffect} from 'react';

library.add();
function App() {
  const [news, setNews] = useState(null);
  const [search, setSearch] = useState("");
  const [lang, setLang] = useState('pt');
  const [input, setInput] = useState('');
  
  const key = "26df8101fda71a66aa8a3f2f3be64f81"

  const urlAPI = `https://gnews.io/api/v4/search?q=${search}&lang=${lang}&apikey=${key}`;

  useEffect(()=>{
   axios.get(urlAPI)
      .then(res=> setNews(res.data))
      .catch(err => console.log(err))
  },[urlAPI])

  const getNews = () => {
    setSearch(input.toLocaleLowerCase().replace(/\s/g, "%20"));
    axios.get(urlAPI)
      .then(res=> setNews(res.data))
      .catch(err => console.log(err))
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      getNews();
    }
  }

  if(!news){
  return (
    <div className="App">
      <header className="App-header">
        <h1>Insira uma palavra e receba notícias diversas sobre o assunto!</h1>
          <input type='text' onChange={(e)=>setInput(e.target.value)} onKeyUp={handleKeyPress}/>
          <button onClick={getNews}className='btn'><FontAwesomeIcon icon={faMagnifyingGlass} className='search'/></button>
          <select name='select' class="btn btn-light" onChange={e=>setLang(e.target.value)}>
            <option value="pt" selected>PT</option>
            <option value="en">EN</option>
            <option value="ru">RU</option>
            <option value="fr">FR</option>
            <option value="es">ES</option>
            </select>
      </header>
    </div>
  );
  } else {
    return (
      <div className="App">
        <header className="App-header">
            <h1>Insira uma palavra e receba notícias diversas sobre o assunto!</h1>
            <input type='text' onChange={(e)=>setInput(e.target.value)} onKeyUp={handleKeyPress}/>
            <button onClick={getNews}className='btn'><FontAwesomeIcon icon={faMagnifyingGlass} className='search'/></button>
            <select name='select' class="btn btn-light" onChange={e=>setLang(e.target.value)}>
              <option value="pt" selected>PT</option>
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="fr">FR</option>
              <option value="es">ES</option>
            </select>
          <div className="noticia-wrapper">
            {news.articles.map((artigo, index)=>(
            <div key={index} className='noticia'>
              <img src={artigo.image} alt='Foto da noticia' className="card-img-top noticia-img"/>
              <div className='card-body'>
                <h1 className="card-title">{artigo.title}</h1>
                <h2 className="card-subtitle mb-2">{artigo.description}</h2>
                <p className="card-text">Confira mais <a href={artigo.url} target='_blank' rel="noreferrer">aqui</a></p>
              </div>
            </div>
            ))}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
