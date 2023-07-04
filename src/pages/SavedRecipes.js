import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem('userID');
  useEffect(() => {
      const fetchSavedRecipes = async () =>{
       try {
        const response = await axios.get(`http://localhost:3000/recipes/savedRecipes/${userID}`); 
        setSavedRecipes(response.data.savedRecipes);
        //console.log(response.data);
       } catch (error) {
          console.log(error);
       }

      }
        fetchSavedRecipes();

}, [savedRecipes]);

  const handleUnsave = async (recipeID) => {
    try {
      const response = await axios.delete(`http://localhost:3000/recipes/savedRecipes/${userID}`, {
        headers: {authorization: cookies.access_token},
        body: { recipeID } 
      });
      //setSavedRecipes(response.data.savedRecipes);
      console.log(response.data);

    } catch (error) {
        console.log(error);
    }
  }

  return (
   <div>
    <h2>Saved Recipes</h2>
    <ul>
      {savedRecipes.map((recipe)=>(
        <li key={recipe._id}>
          <div>
            <h2>{recipe.name}</h2>
            <button onClick={() => handleUnsave(recipe._id)}>unsave</button>
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