import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);


  useEffect(() => {
    const userID = window.localStorage.getItem('userID');
      const fetchSavedRecipes = async () =>{
       try {
        const response = await axios.get(`http://localhost:3000/recipes/savedRecipes/${userID}`); 
        setSavedRecipes(response.data.savedRecipes);
        console.log(response.data)
       } catch (error) {
          console.log(error);
       }

      }
        fetchSavedRecipes();

}, []);
  

  return (
   <div>
    <h2>Saved Recipes</h2>
    <ul>
      {savedRecipes.map((recipe)=>(
        <li key={recipe._id}>
          <div>
            <h2>{recipe.name}</h2>
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

export default SavedRecipes;