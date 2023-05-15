import {useEffect , useState} from "react"
import apiFacade from "../apiFacade"
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";


const Recipes = () => {
    const [recipes,setRecipes] = useState();

    useEffect(()=>{
       apiFacade.getAllRecipes().then(recipes => setRecipes(recipes))
    },[])


    return (
        <div>
            <h1>All recipes</h1>
            {recipes &&
                <Table striped bordered hover > 
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>title</th>
                        <th>description</th>
                        <th>instructions</th>
                        <th>creator</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes &&
                            recipes.map((recipe) =>
                                <tr key={recipe.id}>
                                <td>{recipe.id}</td>
                                <td>{recipe.title}</td>
                                <td>{recipe.description}</td>
                                <td>{recipe.instructions}</td>
                                <td>{recipe.userName}</td>
                                <td>
                                <Link to={`/recipeInfo/${recipe.id}`}
                                    key={recipe.id}>See more information about this recipe
                                </Link>
                                </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            }
        </div>
    )

}

export default Recipes
