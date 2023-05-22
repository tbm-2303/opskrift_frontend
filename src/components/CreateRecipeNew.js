import { Container, Form, Button, FormGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import apiFacade from "../apiFacade"
import { useNavigate } from 'react-router-dom';

const CreateRecipeNew = ({username}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [ingredientAmounts, setIngredientAmounts] = useState({});
    const [ingredientUnits, setIngredientUnits] = useState({});
    const navigate = useNavigate();
      
    useEffect(() => {
      apiFacade.getAllIngredients().then(ingredients => setIngredients(ingredients)) 
    }, [])
    

    const handleIngredientChange = (event) => {
        const ingredientId = event.target.value;
        const ingredientName = event.target.name; // Assuming the name attribute of the checkbox contains the ingredient name
        const isSelected = selectedIngredients.some((ingredient) => ingredient.id === ingredientId);
    
      if (isSelected) {
        // Deselect the ingredient by filtering it out from the selectedIngredients array
        const updatedIngredients = selectedIngredients.filter((ingredient) => ingredient.id !== ingredientId);
        setSelectedIngredients(updatedIngredients);
      } else {
        // Select the ingredient by adding it to the selectedIngredients array
        setSelectedIngredients([...selectedIngredients, { id: ingredientId, name: ingredientName }]);
      }
    };
  
    const handleAmountChange = (e, ingredientId) => {
      const amount = e.target.value;
      setIngredientAmounts((prevState) => ({...prevState, [ingredientId]: amount,}));
    };
  
    const handleUnitChange = (e, ingredientId) => {
      const unit = e.target.value;
      setIngredientUnits((prevState) => ({...prevState,[ingredientId]: unit,}));
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
    
      const recipeIngredients = selectedIngredients.map((ingredient) => (
        {
        ingredientId: ingredient.id,
        name: ingredient.name,
        amount: ingredientAmounts[ingredient.id],
        unit: ingredientUnits[ingredient.id],
  
        }
      )); 
        
      const recipeData = {
        title: title,
        description: description,
        instructions: instructions,
        userName: username,
        recipeIngredientDTOS: recipeIngredients,
      };  

      apiFacade.createRecipe(recipeData).then(response =>{    
          console.log('Recipe created:', response);
          // Reset form fields and data
          setTitle('');
          setDescription('');
          setSelectedIngredients([]);
          setIngredientAmounts({});
          setIngredientUnits({});
          navigate('/');
      })
      
    };
     
    
      return (
        <Container>

        <h2>Create Recipe</h2>
        <Form onSubmit={handleSubmit}>

            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </Form.Group>

            <FormGroup controlId='instructions'>
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="1. Do this 2. Do that 3. Do this and that"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    required
                />
            </FormGroup>

            <Form.Group controlId="ingredients">
                <Form.Label>Ingredients</Form.Label>
                    {ingredients.map((ingredient) => (
                        <Form.Check
                            key={ingredient.id}
                            type="checkbox"
                            id={`ingredient-${ingredient.id}`}
                            label={ingredient.name}
                            name={ingredient.name}
                            onChange={(e) => handleIngredientChange(e)}
                            value={ingredient.id}
                        />
                    ))}
            </Form.Group>
            
            {selectedIngredients.map((ingredient) => {
                const { id, name } = ingredient;
                return (
                    <div key={id}>
                        <Form.Group controlId={`amount-${id}`}>
                            <Form.Label>Amount for {name}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter amount"
                                value={ingredientAmounts[id] || ''}
                                onChange={(e) => handleAmountChange(e, id)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId={`unit-${id}`}>
                            <Form.Label>Unit for {name}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter unit"
                                value={ingredientUnits[id] || ''}
                                onChange={(e) => handleUnitChange(e, id)}
                                required
                            />
                        </Form.Group>
                    </div>
                );
            })}

            <Button variant="primary" type="submit">
            Create Recipe
            </Button>

        </Form>
      
    </Container>
            
    );
};


export default CreateRecipeNew
