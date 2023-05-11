import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import apiFacade from "../apiFacade"
import {useNavigate } from 'react-router-dom';

const CreateRecipeNew = ({username}) => {
    const navigate = useNavigate()

    const [allIngredients, setAllIngredients] = useState([]);
    const [recipe, setRecipe] = useState({
        name: '',
        description: '',
        ingredients: [],
        userName: username,
      });
      
      useEffect(() => {
        apiFacade.getAllIngredients().then(ingredients => setAllIngredients(ingredients))
    }, [])
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe( (prevRecipe) => ({...prevRecipe, [name]: value}) );
      };
    
      const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
      
        if (checked) {
          setRecipe((prevRecipe) => ( {...prevRecipe, ingredients: [...prevRecipe.ingredients, value],} ));
        } else {
          setRecipe((prevRecipe) => ( {...prevRecipe, ingredients: prevRecipe.ingredients.filter((ingredient) => ingredient !== value),} ));
        }
      };
  
      const handleSubmit = (event) => {
        event.preventDefault();
    
        const selectedIngredients = allIngredients.filter(ingredient => recipe.ingredients.includes(ingredient.name));
        const newRecipe = {
          name: recipe.name,
          description: recipe.description,
          userName: recipe.userName,
          ingredients: selectedIngredients.map(ingredient => ({ name: ingredient.name }))
        };
    

        // Create the recipe in the API
        apiFacade.createRecipe(newRecipe);

        // Reset the form inputs
        setRecipe({
          name: '',
          description: '',
          ingredients: [],
          userName : '',
        });

        navigate('/');
       
      };

    
      return (
        <div>
            <div>{username}</div>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                type="text"
                name="name"
                value={recipe.name}
                onChange={handleChange}
                required
                />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                as="textarea"
                name="description"
                value={recipe.description}
                onChange={handleChange}
                required
                />
            </Form.Group>
            <Form.Group controlId="ingredients">
              <Form.Label>Ingredients:</Form.Label>
                {allIngredients.map((ingredient) => (
              <Form.Check
                key={ingredient.id}
                type="checkbox"
                id={ingredient.id}
                label={ingredient.name}
                value={ingredient.name}
                checked={recipe.ingredients.includes(ingredient.name)}
                onChange={handleCheckboxChange}
              />
                ))}
        </Form.Group>
            <Button variant="primary" type="submit">
                Add Recipe
            </Button>
            </Form>
           
        </div>
            
    );
};


export default CreateRecipeNew
