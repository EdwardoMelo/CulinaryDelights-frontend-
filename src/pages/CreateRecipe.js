import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CreateRecipeBg from '../assets/CreateRecipeBg.jpg'
import { base_url } from '../utils';
const CreateRecipe = () => {

  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const userID = window.localStorage.getItem('userID');
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    instructions: '',
    imageUrl: '',
    cookingTime: 0,
    userOwner: userID,
  });
 //console.log(cookies.access_token);
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

  const handleAddIngredient = () => {
    setRecipe({...recipe, ingredients: [...recipe.ingredients, '']});
  };
  const handleSubmit = async(event) =>{
    event.preventDefault();

    try { 
      await axios.post(`${base_url}/recipes`, recipe, {headers: {authorization: cookies.access_token }});
    } catch (error) {
      console.log(error);
    }
    navigate('/');
  };
  return (
    <div className="create-recipe" style={{backgroundImage: 'url(https://img.freepik.com/vetores-gratis/conjunto-de-comida-grelhada_1284-9805.jpg?w=740&t=st=1688624205~exp=1688624805~hmac=ddc0b9e76fcadd790461ebfa8645bbafc14a311ed415e5d45c7eef52742a3707)', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', borderRadius: '18px', backgroundSize: 'cover'}}>
    <Box
      component="form"
      onSubmit={ handleSubmit }
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
         justifyContent: "space-between",
         backdropFilter: 'blur(2px)',
         backgroundColor: '#fff',
         padding: '1.5rem',
         alignItems: 'center',
         borderRadius: '18px',
         backgroundColor: '#F1EFEF',
         width: {sm: '90%', lg: '60%'},
         boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'
      }}
      noValidate
      autoComplete="off"
    >
      <TextField  sx={{borderRadius: '18px'}} label="name" name="name" variant="filled" value={recipe.name} onChange={handleChange}/>
      <TextField id="description" label="description"  name="description" variant="filled" value={recipe.description} onChange={handleChange} />
      {recipe.ingredients.map((ingredient, index) => (
        <TextField id="ingredient" key={index} name="ingredients" label="ingredients" variant="filled" value={ingredient} onChange={(event) => handleIngredientChange(event, index)} />
      ))}
        <Button variant="outlined" type="button" onClick={handleAddIngredient}>
         Add Ingredient
       </Button>
      <TextField id="instructions" name="instructions" label="instructions" variant="filled"  value={recipe.instructions} onChange={handleChange} ></TextField>

      <TextField id="cookingTime" label="Cooking Time (minutes)" name="cookingTime" type="number" variant="filled"  value={recipe.cookingTime} onChange={handleChange}></TextField>
      <Button variant="contained" type="submit" onClick={handleAddIngredient}>
         Create Recipe
       </Button>
    </Box> 
  </div>
  )
}

 export default CreateRecipe;
