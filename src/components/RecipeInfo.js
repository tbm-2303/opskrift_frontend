import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, ListGroup } from 'react-bootstrap';
import apiFacade from '../apiFacade';

const RecipeInfo = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);


    useEffect(() => {
        apiFacade.getRecipeById(recipeId).then(recipe => setRecipe(recipe))
    },[recipeId]);

    const handleAddReview = () => {
    }
    

    
    return (
        <div>


            <h2>Recipe Info</h2>
            <ListGroup>
                {recipe && 
                    <div>
                        <ListGroup.Item >
                            <h5>Title:</h5>  
                            <span>{recipe.title}</span>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h5>Discription:</h5>  
                            <span>{recipe.description}</span>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h5>Instriction:</h5>  
                            <span>{recipe.instructions}</span>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h5>Creator:</h5>  
                            <span>{recipe.userName}</span>
                        </ListGroup.Item>
                    </div>
                }
            </ListGroup>



            <br></br><br></br>
            <h2>Ingredients</h2>
            <ListGroup>
                {recipe &&
                    recipe.recipeIngredientDTOS.map((recipeingredient) => (
                        <ListGroup.Item key={recipeingredient.id}>  
                            <span className='recipe-name'>{recipeingredient.name}</span>
                            <span className='recipe-amount'> - {recipeingredient.amount}</span>
                            <span className='recipe-unit'> - {recipeingredient.unit}</span>
                        </ListGroup.Item>
                    ))
                }   
            </ListGroup>


            <br></br><br></br>
            <h2>Reviews</h2> 
            {recipe && (
                <ListGroup> 
                    {recipe.reviewDTOS.map((review) => (
                        <ListGroup.Item key={review.id}>
                            <span className='review-name'>{review.name}</span>
                            <span className='review-description'>{review.description}</span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}


            <br></br>
            <Button onClick={() => handleAddReview()}>Add Review</Button>
            
            
        </div>
    )
}

export default RecipeInfo
