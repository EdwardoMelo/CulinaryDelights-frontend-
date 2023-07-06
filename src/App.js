import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Auth from './pages/Auth';
import CreateRecipe from './pages/CreateRecipe';
import SavedRecipes from './pages/SavedRecipes';
import Navbar from './components/Navbar';
import './App.scss';
import Register from './components/Register';

const App = () => {
  const [isUserRegistered, setIsUserRegistered] = useState(true);

  return (
    <div className='App'>
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/auth' element={<Auth isUserRegistered={isUserRegistered} setIsUserRegistered={setIsUserRegistered}/>} />
                <Route path='/create-recipe' element={<CreateRecipe/>} />
                <Route path='/saved-recipes' element={<SavedRecipes/>} />
            </Routes>
        </Router>
    </div>
  )
}

export default App;