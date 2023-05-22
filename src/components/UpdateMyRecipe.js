import { Button, ListGroup, Form } from "react-bootstrap"
import { useState, useEffect, useRef } from "react"
import apiFacade from "../apiFacade"
import { useParams } from 'react-router-dom'; // useParams is a hook that allows us to access the parameters from the current route.
import { useNavigate } from 'react-router-dom'; // useNavigate is a hook that allows us to navigate to a new route.

const UpdateMyRecipe = () => {

    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();    
     
    useEffect(() => {
        apiFacade.getRecipeById(recipeId).then(recipe => setRecipe(recipe))
    },[]);


    const handleChangeRecipe = (event) => {
            const target = event.target
            const id = target.id
            const value = target.value
            setRecipe({...recipe, [id]: value})
        }

    const  handleSubmitRecipe = (e) => {
        e.preventDefault();
        apiFacade.updateRecipeInfo(recipe);
        navigate('/myRecipes');
    }

    return (

        <div>
              
            {recipe &&
                <form onChange={handleChangeRecipe} onSubmit={handleSubmitRecipe}>
                                       
                    <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required type="text" value={recipe.title}  placeholder="Title" onChange={(e)=> {console.log('dd')}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control required type="text" value={recipe.description}  placeholder="Description" onChange={(e)=> {console.log('dd')}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="instructions">
                    <Form.Label>Instructions</Form.Label>
                    <Form.Control required type="text" value={recipe.instructions}  placeholder="Instructions" onChange={(e)=> {console.log('dd')}} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update recipe
                    </Button>
                </form>   
            }
        </div>
    )
}

export default UpdateMyRecipe;
