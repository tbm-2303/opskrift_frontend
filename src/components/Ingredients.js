import {useEffect , useState} from "react"
import apiFacade from "../apiFacade"
import {Button, Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

const Ingredients = () => {
    const [ingredients,setIngredients] = useState();

    useEffect(()=>{
       apiFacade.getAllIngredients().then(ingredients => setIngredients(ingredients))
    },[])

    const handleRemove = (e) => {
        const ingredientID = e.target.value;
        apiFacade.deleteIngredient(ingredientID)
        if(ingredients) {const newingredient = ingredients.filter((ingredients) => ingredients.id != ingredientID);
            setIngredients(newingredient)}
    };

    return (
        <div>
            <h1>All ingredients</h1>
            {ingredients &&
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredients &&
                            ingredients.map((ingredients) =>
                                <tr key={ingredients.id}>
                                    <td>{ingredients.id}</td>
                                    <td>{ingredients.name}</td>
                                    <td>
                                        <Link to={"/ingredient/"+ingredients.id}
                                              key={ingredients.id}
                                        >Change</Link>
                                        </td>
                                        <td><Button type="button" onClick={handleRemove} key={ingredients.id} value={ingredients.id} className="btn-danger">remove ingredient</Button></td>

                                    </tr>
                            )
                        }
                    </tbody>
                </Table>
            }
        </div>
    )
}

export default Ingredients