import React from 'react';
import { BrowserRouter , Routes, Route, Link, Navigate } from "react-router-dom";

import './App.css';
import { SignIn } from './components/signin';
import { SignUp } from './components/signup';
import { Workspace } from './components/workspaces';
import ProtectedRoutes from './feature/protectedRouts';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />

            <Route path="/" element={
              <ProtectedRoutes>
                <Workspace />
              </ProtectedRoutes>}
            />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
