import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'




function App() {
  const [count, setCount] = useState(0)
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const submit = () => {
    fetch('http://localhost:3000/short-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    })
      .then(async(res) => {
        if(res.ok)
          return res.json();
        else{
          throw await res.json();
        }
      })
      .then(data => {
        setShortUrl(`${import.meta.env.VITE_SHORT_URL}/${data.code}`)
      })
      .catch(error => {
        if(error.message === "Invalid URL") {
          setError('無效的網址')
        }
      })
  }

  return (
    <div className="App grid grid-cols-6">
      <div className="card md:col-start-2 md:col-span-4 col-start-0 col-span-6">
        <h2>
          輸入網址，來建立你的縮網址
        </h2>
        <div className="m-3">
          <input type="text" placeholder="https://" value={url} onChange={handleChange} />
        </div>
        <div>
          <button onClick={() => submit()}>
            送出
          </button>
        </div>
        
          
        {error && <div className="error">{error}</div>}
        
        {shortUrl && <p className="m-3">縮網址已建立：<a target="_blank" href={shortUrl}>{shortUrl}</a></p>}
      </div>
    </div>
  )
}

export default App
