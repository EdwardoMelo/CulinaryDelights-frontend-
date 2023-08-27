import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Loader from '../components/Loading';
import { base_url } from '../utils';

const Home = () => {

  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cookies, _] = useCookies(["access_token"]);
  const [isLoading, setIsLoading] = useState(true);
  const userID = window.localStorage.getItem("userID");
  // const [first, setfirst] = useState()
  useEffect(() => {

    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${base_url}/recipes`);
        setRecipes(response.data);
      } catch (error) {
        console.log(error)
      }
    }


    fetchRecipes();

  }, []);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!userID) return;
      try {
        const response = await axios.get(`${base_url}/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);

      } catch (error) {
        console.log(error);
      }
      
    }
    fetchSavedRecipes();
  }, [userID])
  


useEffect(() => {
 
  if (recipes.length && savedRecipes) {
    setIsLoading(false);
  }
}, [recipes ,savedRecipes]);

const isRecipeSaved = (id) => {
      if(!savedRecipes.length) return false;
      const recipe = savedRecipes.find(recipe => recipe._id === id)
      if (recipe) return true;
      else return false

}

const saveRecipe = async (recipe) => {
  
    if (!userID) alert("You aren't logged in!");
    try {
        const response = await axios.put(`${base_url}/recipes`, {
        recipeID: recipe._id,
        userID
      }, { headers: { authorization: cookies.access_token } });
        console.log(response) 
      setSavedRecipes([...savedRecipes, recipe]);
      console.log(savedRecipes);
      } catch (error) {
      console.log(error)
    }
   
  };


  return (
    <div className=' drop-shadow-lg  border-black bg-black min-h-[780px] w-screen '>
        <div className="header w-full bg-red-800 h-[700px] top-10">
          <div className='flex justify-end items-center lg:w-1/2  h-full'>
              <div className='header-content  flex items-center w-full lg:w-4/5 h-4/5'>
                      <h1 className='text-5xl lg:text-8xl lg:text-left tracking-tight font-extrabold text-white drop-shadow-lg'>
                              FIND AND SHARE DELICIOUS RECEPIES
                      </h1>
              </div>
          </div>
      </div>
    
      <div className='w-full bg-orange-300 min-h-[2000px] flex flex-col items-center justify-around gap-4 py-10'>
      { !isLoading ? ( 
        recipes.map(( recipe ) => (
          <div className='flex flex-col lg:flex-row items-center justify-around w-[95%] lg:w-4/5 bg-white min-h-[500px]
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
              { savedRecipes && ( <button  onClick={() => { saveRecipe(recipe) }} className='w-1/2 drop-shadow-md bg-red-600 backdrop-blur-5 p-4 text-white font-bold tracking-wide'>{isRecipeSaved(recipe._id) ? ("SAVED") : ("SAVE RECIPE")}</button>)}
              
            </div>
          </div>
        )) 
      ) : (<div className='bg-orange-300 h-[2000px] flex items-start justify-center'> <Loader/> </div>)
      }
         
      </div>
   </div>
  )
  
}

export default Home;