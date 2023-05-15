import React, {useRef, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import apiFacade from "../apiFacade";


const CreateIngredient = () => {
    const initialState = {name: "", quantity: "", measurementUnit: ""};
    const [ingredients, setIngredients] = useState(initialState);
    const errorAlertMsg = useRef(null);
    const successAlertMsg = useRef(null);
    const [errorMsg, setErrorMsg] = useState("");

    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setIngredients({...ingredients, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        apiFacade.createIngredient(ingredients).then(response =>{
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
            setIngredients(initialState);
        })

    }

    return (
        <Container className="shadow-lg p-3 mb-5 bg-white rounded mt-5">
            <h2 className={"text-center" }>Add New Ingredients</h2>
            <Form onChange={handleInput} onSubmit={handleSubmit}>
                <div ref={errorAlertMsg} className="alert alert-danger" style={{display:"none"}}>
                    <strong>{errorMsg}</strong>
                </div>
                <div ref={successAlertMsg} className="alert alert-success" style={{display:"none"}}>
                    <strong>Ingredient has been added</strong>
                </div>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" value={ingredients.name}  placeholder="Name" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add ingredient
                </Button>

            </Form>

        </Container>
    );
};

export default CreateIngredient;