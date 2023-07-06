import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Button from '@mui/material/Button';
import { base_url } from '../utils';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem('userID');
  useEffect(() => {
      const fetchSavedRecipes = async () =>{
       try {
        const response = await axios.get(`${base_url}/recipes/savedRecipes/${userID}`); 
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
      const response = await axios.delete(`${base_url}/recipes/savedRecipes/${userID}`, {
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
    <h1>Saved Recipes</h1>
    <ul className='savedRecipes'>
      {savedRecipes.map((recipe)=>(
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
         <Button  sx={{backgroundColor: '#537791', borderBottomLeftRadius: '16px'}} variant="contained" onClick={()=>handleUnsave(recipe._id)}>
           delete
         </Button>
         </div>
       </li>
      ))}
    </ul>
   </div>
  )
}

export default SavedRecipes;