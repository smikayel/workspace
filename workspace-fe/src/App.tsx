import React from 'react';
import { BrowserRouter , Routes, Route, Link } from "react-router-dom";

import './App.css';
import { SignIn } from './components/signin';
import { SignUp } from './components/signup';
import { Workspace } from './components/workspaces';

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
          <Route path="/" element={<Workspace />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
