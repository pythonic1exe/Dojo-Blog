import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {

    const [title,setTitle] = useState('') ;
    const [body,setBody] = useState('') ;
    const [author,setAuthor] = useState('mario') ;
    const [isPending,setIsPending] = useState(false) ;
    const navigate = useNavigate() ;

    const handleSubmits = (e) => {
        e.preventDefault() ;
        const blog = {title,body,author} ;
        setIsPending(true) ;

        fetch('http://localhost:8000/blogs',{
            method : 'POST',
            headers : { "Content-Type": "appliaction/json"},
            body : JSON.stringify(blog)
        }).then(() => {
            setIsPending(false)
            navigate('/') ;
        }) ;
        
    }
    
    return ( 
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmits}>
                <label>Blog title: </label>
                <input 
                    type="text"
                    required
                    value={ title }
                    onChange={ (e) => setTitle(e.target.value) }
                />
                <label>Blog body: </label>
                <textarea
                    required
                    value={ body }
                    onChange={ (e) => setBody(e.target.value) }
                ></textarea>
                <label>Blog author</label>
                <select
                    value={ author }
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value='yoshi'>yoshi</option>
                    <option value='mario'>mario</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Loading...</button>}
            </form>
        </div>
     );
}
 
export default Create;