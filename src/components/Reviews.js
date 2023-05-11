import {useEffect , useState} from "react"
import apiFacade from "../apiFacade"
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";

const Reviews = () => {
    const [reviews,setReviews] = useState();
    useEffect(()=>{
         apiFacade.getAllReviews().then(reviews => setReviews(reviews))
     }
        ,[])
    return (
        <div>
        <h1>All reviews</h1>
        {reviews && <Table striped bordered hover >
            <thead>
                <tr>
                <th>#</th>
                <th>name</th>
                <th>description</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {reviews &&
                reviews.map((review) =>
                <tr key={review.id}>
                    <td>{review.id}</td>
                    <td>{review.name}</td>
                    <td>{review.description}</td>
                    <td>
                    <Link to={"/reviewInfo/"+review.id}
                        key={review.id}>do we need a button here?
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
export default Reviews