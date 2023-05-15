import React, {useRef, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import apiFacade from "../apiFacade";


const CreateIngredient = () => {
    const initialState = {name: ""};
    const [ingredient, setIngredient] = useState(initialState);
   

    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setIngredient({...ingredient, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        apiFacade.createIngredient(ingredient).then(response =>{
            setIngredient(initialState);
        })

    }

    return (
        <Container className="shadow-lg p-3 mb-5 bg-white rounded mt-5">
            <h2 className={"text-center" }>Add New Ingredients</h2>
            <Form onChange={handleInput} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" value={ingredient.name}  placeholder="Name" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add ingredient
                </Button>

            </Form>

        </Container>
    );
};

export default CreateIngredient;