import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { base_url } from '../utils';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem('userID');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const fetchSavedRecipes = async () =>{
       try {
        const response = await axios.get(`${base_url}/recipes/savedRecipes/${userID}`); 
        setSavedRecipes(response.data.savedRecipes);
       } catch (error) {
          console.log(error);
       }

      }
        fetchSavedRecipes();

}, [userID]);

  useEffect(() => {
    if(savedRecipes){
      setIsLoading(false);
    }
  }, [savedRecipes])
  

  const handleUnsave = async (recipe) => {
    try {
        const response = await axios.delete(`${base_url}/recipes/savedRecipes/${userID}`, {
        headers: {authorization: cookies.access_token},
        body: { recipeID: recipe._id } 
      });
      const recipes = savedRecipes.filter((item) => item._id !== recipe._id );
      setSavedRecipes(recipes);

      console.log(response.data);
    } catch (error) {
        console.log(error);
    }
  }

  return (
   <div className='w-full bg-orange-300 min-h-[2000px]  flex flex-col items-center gap-4 pt-16'>
    {!isLoading ?  (
      <ul className='w-full flex flex-col items-center'>
      {savedRecipes.length ? savedRecipes.map((recipe)=>(
         <div key={recipe.name} className='flex flex-col lg:flex-row items-center justify-around w-[95%] lg:w-4/5 bg-white min-h-[500px]
         shadow-lg drop-shadow-md rounded-sm'>
          <div className='card-image flex items-center w-full h-[350px] lg:w-1/2 lg:h-[500px] lg:max-h-[700px] p-4'>
            <img src={recipe.imageUrl} alt="recipe-img" className='object-cover h-[90%] w-full drop-shadow-xl rounded-lg' />
          </div>
          <div className='flex flex-col items-center lg:items-start justify-around gap-6 card-content lg:gap-2 w-full lg:w-3/4  lg:min-h-[500px] p-6 drop-shadow-md'>
            <h1 className='text-4xl border-b-2 py-6 border-blue-950 font-normal text-blue-950 drop-shadow-sm'>{recipe.name}</h1>
            <p className=''>{recipe.instructions}</p>
            <div className='w-2/3 font-semibold flex flex-wrap text-gray-700 list-none gap-4'>
                {recipe.ingredients.map((item)=>(
                  <li>{item}</li>
                ))}
            </div>
            { savedRecipes && ( <button  onClick={() => { handleUnsave(recipe) }} className='w-1/2 drop-shadow-md bg-red-600 backdrop-blur-5 p-4 text-white font-bold tracking-wide'>DELETE</button>)}
            
          </div>
        </div>
      )) : ( <h1 className='text-5xl text-white font-semibold drop-shadow-sm text-center flex mt-16 uppercase'>You Have no saved recipies Yet</h1>)} 
    </ul>
    ) : 'LOADING...'}
    
   </div>
  )
}

export default SavedRecipes;