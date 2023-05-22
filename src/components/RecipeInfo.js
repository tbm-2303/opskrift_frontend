import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, ListGroup, FormGroup, Form, Row, Col} from 'react-bootstrap';
import apiFacade from '../apiFacade';

const RecipeInfo = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [review, setReview] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [nutritions, setNutritions] = useState(); 
  const [search, setSearch] = useState();

  const makeRequest = (e) => {
    if (search === "") {
      alert("Please enter a food");
      return;
    }
    e.preventDefault();
    var tmp = search;
    setSearch("");
    const options = makeOptions();
    return fetch(`https://api.api-ninjas.com/v1/nutrition?query=${tmp}`, options).then(r => r.json().then(data => setNutritions(data)));
  }

  const makeOptions= () => {
    var opts = {
      method: "GET",
      headers: {
        'X-Api-Key': 'wPMwz04fOzcE/9bRVLU5+A==tULbklwgCVuo95aM'
      }
    }
    return opts;
  }


  useEffect(() => {
    apiFacade.getRecipeById(recipeId).then(recipe => setRecipe(recipe))
  },[recipeId]);

  const handleAddReview = () => {
  }
    

    
  return (
    <div>
      <Row >

        <Col className='shadow-lg p-5 mb-5 bg-white rounded mt-5 me-5'>
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
                  <h5>Instruction:</h5>  
                  <span>{recipe.instructions}</span>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h5>Creator:</h5>  
                  <span>{recipe.userName}</span>
                </ListGroup.Item>
              </div>
            }
          </ListGroup>
        </Col>

        <Col className='shadow-lg p-5 mb-5 bg-white rounded mt-5 me-5'>
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
        </Col>

        <Col className='shadow-lg p-5 mb-5 bg-white rounded mt-5 me-5'> 
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
        
        
        </Col>      

      </Row>  
      <Row>

        <Col className='shadow-lg p-5 mb-5 bg-white rounded mt-5 me-5'>
          <Form>
            <FormGroup controlId='review'>
            <Form.Label>Add review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
            </FormGroup>
            <Button onClick={() => handleAddReview()}>Add Review</Button> 
          </Form>
        </Col>

        <Col className='shadow-lg p-5 mb-5 bg-white rounded mt-5 me-5'>
          <Form>
            <FormGroup controlId='search'>
            <Form.Label>Food Nutritional facts</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search like this: <amount><unit> <name>"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </FormGroup>
            <Button onClick={(e) => {makeRequest(e)}}>Search</Button>
          </Form>
          

          <div>
            {nutritions &&
              nutritions.map((item, index) => {
                return (
                  <ul key={index}>
                    <li>name: {item.name}</li>
                    <li>calories: {item.calories} g</li>
                    <li>fat: {item.fat_total_g} g</li>
                    <li>carbs: {item.carbohydrates_total_g} g</li>
                    <li>protein: {item.protein_g} g</li>
                  </ul>
                );
              })
            }
          </div>
        
        
        </Col>

      


      </Row>
      
    </div>
  )
}

export default RecipeInfo
