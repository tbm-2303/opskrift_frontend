import { Button, ListGroup, Form } from "react-bootstrap"
import { useState, useEffect, useRef } from "react"
import apiFacade from "../apiFacade"
import { useParams } from 'react-router-dom'; // useParams is a hook that allows us to access the parameters from the current route.

const UpdateMyRecipe = () => {
        const { recipeId } = useParams();
        const [recipe, setRecipe] = useState(null);
        const errorAlertMsg = useRef(null);
        const successAlertMsg = useRef(null);
        const [errorMsg, setErrorMsg] = useState("");
     
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
                apiFacade.updateRecipeInfo(recipe).then(response => {
                        const status = response.code;
                        const msg = response.message;
                        if(status){
                                setErrorMsg(msg)
                                errorAlertMsg.current.style.display = 'block';
                                setTimeout(function() {errorAlertMsg.current.style.display = 'none'},3000)
                        } else{
                                successAlertMsg.current.style.display = 'block';
                                setTimeout(function() {successAlertMsg.current.style.display = 'none'},3000)
                        }
                })
                }




               
        
        


        return (

            <div>
                <div ref={errorAlertMsg} className="alert alert-danger" style={{display:"none"}}>
                    <strong>{errorMsg}</strong>
                </div>
                <div ref={successAlertMsg} className="alert alert-success" style={{display:"none"}}>
                    <strong>Updated</strong>
                </div>
                {recipe &&
                    <form onChange={handleChangeRecipe} onSubmit={handleSubmitRecipe}>
                                       
                        <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required type="text" value={recipe.title}  placeholder="Title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control required type="text" value={recipe.description}  placeholder="Description" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="instructions">
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control required type="text" value={recipe.instructions}  placeholder="Instructions" />
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
