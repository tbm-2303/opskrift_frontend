import React from 'react'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import apiFacade from "../apiFacade"

const CreateRecipe = () => {
    const [ingredients, setIngredients] = useState();
    const [recipe, setRecipe] = useState({
        name: "", 
        description: "", 
        username: "", 
        ingredients: [],
    });
    const initialState = {name: "", description: "", username: "", ingredients:[]};
    
    useEffect(() => {
        apiFacade.getAllIngredients().then(ingredients => setIngredients(ingredients))
    }, [])

    function handleInput(event) {
        const target = event.target
        const id = target.id
        const value = target.value
        setRecipe({...recipe, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        apiFacade.CreateRecipe(recipe)
        setRecipe(initialState);
    }
    


  return (
    <div>
   
        <h1>Add new recipe</h1>
        <Form onChange={handleInput} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
            <Form.Control required type="text" value={recipe.name}  placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
            <Form.Control required type="text" value={recipe.description}  placeholder="Description" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="IngredientID">Select ingredient</Form.Label>
                <Form.Select id="IngredientID">
                    <option value={""}  disabled hidden>Select Ingredient</option>
                        {ingredients && ingredients.map((ingredient) => {
                            return <option key={ingredient.id}  value={ingredient.id}>{ingredient.name} - {ingredient.quantity}, {ingredient.measurementUnit}</option>
                        }
                        )}
                </Form.Select>
            </Form.Group>


            <Button variant="primary" type="submit">
                Add ingredient
            </Button>
        </Form>
    </div>
  )
}

export default CreateRecipe
