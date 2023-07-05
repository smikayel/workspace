import React from 'react';
import { BrowserRouter , Routes, Route, Link } from "react-router-dom";

import './App.css';
import { SignIn } from './components/signin';

function Home () {
  return (
    <>
      hellasdasdasdasdasdo 
    </>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
