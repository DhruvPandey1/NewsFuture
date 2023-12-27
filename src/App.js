import './App.css';
import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress,setProgress]=useState(0)
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={5} />} />
            <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={5} category="entertainment" />} />
            <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={5} category="business" />} />
            <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={5} category="general" />} />
            <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={5} category="sports" />} />
            <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={5} category="health" />} />
            <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={5} category="science" />} />
            <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={5} category="technology" />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
}
export default App