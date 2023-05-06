import './App.scss';
import axios from 'axios';
import {useState, useEffect} from 'react';

function App() {
  const [news, setNews] = useState(null);
  const [search, setSearch] = useState("sao%20paulo");
  const [input, setInput] = useState('');

  const urlAPI = `https://newsapi.org/v2/everything?q=${search}&language=pt&apiKey=b9207aaccc944677b18cc7d1b7638a79`;

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

  if(!news){
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input type='text' onChange={(e)=>setInput(e.target.value)}/><br/>
          <button onClick={getNews}>Procurar</button>
        </div>
      </header>
    </div>
  );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <input type='text' onChange={(e)=>setInput(e.target.value)}/><br/>
            <button onClick={getNews}>Procurar</button>
          </div>
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
