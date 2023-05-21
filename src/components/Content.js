import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "../routes/Home";
import About from "../routes/About";
import Navbar from "../navbar/Navbar";
import LoginForm from "../components/LoginForm";
import Recipes from './Recipes';
import Ingredients from './Ingredients';
import CreateRecipeNew from './CreateRecipeNew';
import RecipeInfo from './RecipeInfo';
import MyRecipes from './MyRecipes';
import CreateIngredient from './CreateIngredient';
import UpdateMyRecipe from './UpdateMyRecipe';


const Content = ({ loggedIn,login,user,logout}) => {
    return (
        <Router>
            <Navbar user={user} loggedIn={loggedIn} login={login} logout={logout}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About user={user}/>}/>
                <Route path="/login" element={<LoginForm login={login}/>}/>
                <Route path="/recipes"element={<Recipes/>} />
                <Route path="/myRecipes"element={<MyRecipes username={user.username}/>} />
                <Route path="/recipeInfo/:recipeId" element={<RecipeInfo/>} />
                <Route path="/ingredients"element={<Ingredients/>} />
                <Route path= "/CreateRecipe" element={<CreateRecipeNew username={user.username}/>} />
                <Route path= "/CreateIngredient" element={<CreateIngredient username={user.username}/>} />
                <Route path= "/updateRecipe/:recipeId" element={<UpdateMyRecipe/>} />
                    
            </Routes>
           
        </Router>
        
  )
}

export default Content
