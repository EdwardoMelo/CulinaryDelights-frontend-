import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = window.localStorage.getItem('userID');
  const [cookies, _] = useCookies(["access_token"]);

  useEffect( () => {
      const fetchRecipes = async () => {
        try {
          const response = await axios.get('http://localhost:3000/recipes');
          setRecipes(response.data);
        } catch (error) {
          console.log(error)
        }}
      const fetchSavedRecipes = async () =>{
       try {
        const response = await axios.get(`http://localhost:3000/recipes/savedRecipes/ids/${userID}`);
        setSavedRecipes(response.data);    
       } catch (error) {
          console.log(error);
       }

      }
        fetchRecipes();
        fetchSavedRecipes();
}, [savedRecipes]);

  const saveRecipe = async (recipeID)=>{
    try {
      const response = await axios.put('http://localhost:3000/recipes', {
        recipeID,
        userID
      }, { headers: { authorization: cookies.access_token}});
      isRecipeSaved(recipeID);
    } catch (error) {
      console.log(error)
    }
  }; 
  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
   <div>
    <h2>Your Recipes</h2>
    <ul>
      {recipes.map((recipe)=>(
        <li key={recipe._id}>
          <div>
            <h2>{recipe.name}</h2>
            <button onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
            { isRecipeSaved(recipe._id) ? "Saved" : "Save"}  
            </button>   
          </div>
          <div className='instructions'>
            <p>{recipe.instructions}</p>
          </div>
          <img src={recipe.imageUrl} alt={recipe.name }/>
          <p> Cooking Time: {recipe.cookingTime} minutes</p>
        </li>
      ))}
    </ul>
   </div>
  )
  
}

export default Home;