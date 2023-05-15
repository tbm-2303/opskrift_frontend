import {useEffect , useState} from "react"
import apiFacade from "../apiFacade"
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";

const Ingredients = () => {
    const [ingredients,setIngredients] = useState();

    useEffect(()=>{
       apiFacade.getAllIngredients().then(ingredients => setIngredients(ingredients))
    },[])

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