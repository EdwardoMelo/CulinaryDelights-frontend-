import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AiFillPlusCircle, AiFillDelete } from 'react-icons/ai'
import { base_url } from '../utils';
import Loader from '../components/Loading';
const CreateRecipe = () => {

  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const userID = window.localStorage.getItem('userID');
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning ] = useState();

  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    instructions: '',
    imageUrl: '',
    cookingTime: 0,
    userOwner: userID,
  });
  
  const handleChange = (e) => {
    const { name, value} = e.target;
    setRecipe({...recipe, [name]: value});

  };
  const handleIngredientChange = (event, index) =>{
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    setRecipe({...recipe, ingredients: [...recipe.ingredients, ' ']});
  };

  const handleRemoveIngredient = (index) => {
    const ingredients = recipe.ingredients;
    ingredients.splice(1, index);

    setRecipe({...recipe, ingredients: [...ingredients]});
  }

  const handleSubmit = async(event) =>{
    event.preventDefault();
    console.log("handleSubmit")
    if (recipe.ingredients !== '' && recipe.cookingTime !== 0 && recipe.name !== '' && recipe.instructions !== [] && recipe.cookingTime !== 0) {
      setIsLoading(true);
      setWarning(null);
      try {
        await axios.post(`${base_url}/recipes`, recipe, { headers: { authorization: cookies.access_token } });
      } catch (error) {
        console.log(error);
      }
      navigate('/');
    } else {
      setWarning('Preencha Todos os Campos')
    }
    
  };
  return (
      <div className='create-recipe w-full min-h-[1080px] absolute top-20 flex items-center justify-center'>
    
          <form className="bg-white drop-shadow-lg rounded px-8 pt-6 pb-8 w-[90%] lg:w-1/3 ">
            <h2 className="text-2xl font-bold mb-6">Create new recipe</h2>
          <div className=" flex flex-col gap-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={recipe.name}
                onChange={handleChange}
              />
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Instructions
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="instructions"
                type="text"
                name="instructions"
                value={recipe.instructions}
                onChange={handleChange}
              />
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Image URL
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="imageUrl"
                type="text"
                name="imageUrl"
                value={recipe.imageUrl}
                onChange={handleChange}
              />
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Cooking time (minutes)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="cookingTime"
                type="number"
                name="cookingTime"
                value={recipe.cookingTime}
                onChange={handleChange}
              />
      
              { recipe.ingredients.map((ingridient, index) => (
                <div className='flex gap-2'>
                  <div className='form-group w-full'>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        ingredients
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="ingridient"
                        key={index}
                        type="text"
                        name="ingridients"
                        placeholder='ingredient...'
                        value={ingridient}
                        onChange={(e) => handleIngredientChange(e, index)} />
                  </div>
                </div>
            )) 
        }
            <button className='flex self-end items-center gap-4 font-semibold text-gray-700 mb-4' onClick={handleAddIngredient}>Add Ingridient<AiFillPlusCircle style={{color: 'blue', fontSize: '32px'}}/>
            </button>
      </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleSubmit}
        >Create recipe</button>
        {warning ? (<div className='w-full bg-red-200 text-red-700 rounded-md flex justify-center py-4'>
          {warning}
        </div>) : (
          isLoading &&
          <div className='w-full flex justify-center py-4'>
            <Loader />
          </div>
        )
        }
      </form>

    </div>
  )
}

 export default CreateRecipe;
