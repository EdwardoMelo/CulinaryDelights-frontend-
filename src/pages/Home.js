import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Button from '@mui/material/Button';
import { base_url } from '../utils';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = window.localStorage.getItem('userID');
  const [cookies, _] = useCookies(["access_token"]);

  useEffect( () => {
      const fetchRecipes = async () => {
        try {
          const response = await axios.get(`${base_url}/recipes`);
          console.log(response.data)
          setRecipes(response.data);
        } catch (error) {
          console.log(error)
        }}
      const fetchSavedRecipes = async () =>{
      if(!userID) return;
       try {
        const response = await axios.get(`${base_url}/recipes/savedRecipes/ids/${userID}`);
        setSavedRecipes(response.data);    
       } catch (error) {
          console.log(error);
       }

      }
        fetchRecipes();
        fetchSavedRecipes();
}, [savedRecipes]);

  const saveRecipe = async (recipeID)=>{
    if(!userID) alert("You aren't logged in!");
    try {
      const response = await axios.put(`${base_url}/recipes`, {
        recipeID,
        userID
      }, { headers: { authorization: cookies.access_token}});
      isRecipeSaved(recipeID);
    } catch (error) {
      console.log(error)
    }
  }; 
  const isRecipeSaved = (id) => savedRecipes? savedRecipes.includes(id) : false;

  return (
   <div>
    <h1>Community Recipes</h1>
    <ul> 
      {recipes.map((recipe)=>(
        <li className='card' key={recipe._id}>
          <div className='cardImage'>
          <img src={recipe.imageUrl} alt={recipe.name }/>
          </div>
          <div className='card-content'>
          <h2>{recipe.name}</h2>
          <div className='instructions'>
            <p>{recipe.instructions}</p>
          </div>
          <strong> Cooking Time: {recipe.cookingTime} minutes</strong>
          <div className='ingredients'>
            <h2>Ingredients</h2>
            { recipe.ingredients ? <ul>
              {recipe.ingredients.map((item)=>(
                <li>{item}</li>
              ))}
            </ul> : ''}
            
          </div>
          </div>
          <div className='card-info'>
          <Button  sx={{backgroundColor: '#537791', borderBottomLeftRadius: '16px'}} variant="contained" onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
            { isRecipeSaved(recipe._id) ? "Saved" : "Save Recipe"}
          </Button>
          </div>
        </li>
      ))}
    </ul>
   </div>
  )
  
}

export default Home;