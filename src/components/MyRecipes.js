import { useEffect, useState } from 'react'
import apiFacade from '../apiFacade'
import React from 'react'
import { Container, Table, Form, Button } from 'react-bootstrap'

const MyRecipes = ({username}) => {
    const [myRecipes, setMyRecipes] = useState([])

    useEffect(() => {
        apiFacade.getAllMyRecipes(username).then(myRecipes => setMyRecipes(myRecipes))
    }, [])

    return (
      
        <Container>
            <h1>{username}</h1>
            <h1>My recipes</h1>
            {myRecipes &&
                <Table striped bordered hover > 
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>title</th>
                        <th>description</th>
                        <th>instructions</th>
                        <th>creator</th>
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
