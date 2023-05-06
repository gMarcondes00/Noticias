import './App.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {useState, useEffect} from 'react';

library.add();
function App() {
  const [news, setNews] = useState(null);
  const [search, setSearch] = useState("sao%paulo");
  const [lang, setLang] = useState('pt');
  const [input, setInput] = useState('');

  const urlAPI = `https://newsapi.org/v2/everything?q=${search}&language=${lang}&apiKey=b9207aaccc944677b18cc7d1b7638a79`;

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
          <h1>Carregando...</h1>
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
            <select name='select' onChange={e=>setLang(e.target.value)}>
              <option value="pt" selected>PT</option>
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="fr">FR</option>
              <option value="es">ES</option>
            </select>
          <div className="noticia-wrapper">
            {news.articles.map((artigo, index)=>(
            <div key={index} className='noticia'>
              <h1>{artigo.title}</h1>
              <h2>{artigo.description}</h2>
              <img src={artigo.urlToImage} alt='Foto da noticia' className='noticia-img'/>
              <p>Confira mais <a href={artigo.url} target='_blank' rel="noreferrer">aqui</a></p>
            </div>
            ))}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
