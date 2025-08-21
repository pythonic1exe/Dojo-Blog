import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";

const BlogDetails = () => {

    const {id} = useParams() ;
    const {isPending,error,data:blogs} = useFetch('http://localhost:8000/blogs/'+ id) ;
    const navigate = useNavigate() ;
    
    
    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + blogs.id, {
            method : "DELETE"
        }) .then(() => {
            navigate('/') ;     
        })
    }

    return ( 
        <div className="blog-details">
           { isPending && <div>Loading....</div>} 
           { error && <div> { error }</div>}
           { blogs && (
            <article>
                <h2>{ blogs.title}</h2>
                <p>Written by { blogs.author}</p>
                <div> { blogs.body }</div>
                <button onClick={handleClick}>Delete Blog</button>
            </article>
           )}
        </div>
     );
}
 
export default BlogDetails;