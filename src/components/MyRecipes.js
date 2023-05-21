import { useEffect, useState } from 'react'
import apiFacade from '../apiFacade'
import React from 'react'
import { Container, Table, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MyRecipes = ({username}) => {
    const [myRecipes, setMyRecipes] = useState([])

    useEffect(() => {
        apiFacade.getAllMyRecipes(username).then(myRecipes => setMyRecipes(myRecipes))
    }, [])

   
    const handleDelete = (e) => {
        const recipeID = e.target.value;
        apiFacade.deleteRecipe(recipeID)
        if(myRecipes) {
            const newRecipe = myRecipes.filter((myRecipes) => myRecipes.id != recipeID);
            setMyRecipes(newRecipe)
        }

    };


    return (
      
        <Container>
            
        
            <h1>My recipes</h1>
            {myRecipes  &&
                <Table striped bordered hover > 
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>title</th>
                        <th>description</th>
                        <th>instructions</th>
                        <th>creator</th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {myRecipes &&
                            myRecipes.map((recipe) =>
                                <tr key={recipe.id}>
                                <td>{recipe.id}</td>
                                <td>{recipe.title}</td>
                                <td>{recipe.description}</td>
                                <td>{recipe.instructions}</td>
                                <td>{recipe.userName}</td>
                                <td><Button type='button' onClick={handleDelete} value={recipe.id} key={recipe.id} className="btn-danger">Delete </Button></td>
                                <td><Link to={`/updateRecipe/${recipe.id}`} key={recipe.id}> Update</Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            }

       
       
        </Container>
           
        
       
    );
};


export default MyRecipes
