import { useState ,useEffect} from "react"
import "../styles/Table.css"
import axios from "axios";

export default function Review(){
    const[review,setReview]=useState([]);
   

  useEffect(() => {
    axios.get("http://localhost:8080/getallReviews").then((res) => {
        console.log(res);
        setReview(res.data);
    })
  }, []);

    return(
        <div className="head">
            <h2>Reviews</h2>
            <table className="table_colm">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>PhoneNumber</th>
                    <th>Review</th>
                    <th>Rating</th>
                </tr>
                </thead>
                <tbody className="table_colm" >
                    {review.map((r)=>(
                        <tr key={r.reviewid}>
                            <td>{r.reviewid}</td>
                            <td>{r.name}</td>
                            <td>{r.phonenumber}</td>
                            <td>{r.review}</td>
                            <td>{r.rating}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}

