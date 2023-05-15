import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "../routes/Home";
import About from "../routes/About";
import Navbar from "../navbar/Navbar";
import LoginForm from "../components/LoginForm";
import Recipes from './Recipes';
import Ingredients from './Ingredients';
import Reviews from './Reviews';
import CreateIngredient from './CreateIngredient';
import CreateRecipeNew from './CreateRecipeNew';


const Content = ({ loggedIn,login,user,logout}) => {
    return (
        <Router>
            <Navbar user={user} loggedIn={loggedIn} login={login} logout={logout}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About user={user}/>}/>
                <Route path="/login" element={<LoginForm login={login}/>}/>
                <Route path="/recipes"element={<Recipes/>} />
                <Route path="/ingredients"element={<Ingredients/>} />
                <Route path="/reviews" element={<Reviews/>}/>
                <Route path="/create" element={<CreateIngredient/>}/>
                <Route path= "/CreateRecipe" element={<CreateRecipeNew username={user.username}/>} />
            </Routes>
           
        </Router>
        
  )
}

export default Content
