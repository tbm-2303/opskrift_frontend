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
          <th>name</th>
          <th>description</th>
          <th>username</th>
          <th></th>
          </tr>
      </thead>
      <tbody>
          {recipes &&
          recipes.map((recipe) =>
          <tr key={recipe.id}>
              <td>{recipe.id}</td>
              <td>{recipe.name}</td>
              <td>{recipe.description}</td>
              <td>{recipe.username}</td>
              <td>
              <Link to={"/recipeInfo/"+recipe.id}
                  key={recipe.id}>do we need a button here?
              </Link>
              </td>
          </tr>
          )}
      </tbody>
    </Table>
     }
    </div>
  )
}

export default Recipes
