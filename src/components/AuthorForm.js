import React, {useEffect, useState} from "react";
import axios from "axios";

const AuthorForm = (props) => {
    const {authorList, setAuthorList} = props;
    const [name, setName] = useState("");

    const addAuthor = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/authors", {
            name
        })
        .then(res =>{
            console.log(res);
            console.log(res.data);
            setAuthorList([...authorList, res.data]);
        })
        .catch(err=>console.log(err))
    }

    return (
        <div>
            <form onSubmit={addAuthor}>
                <label>Author Name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)}></input>
            </form>
        </div>
    )
}

export default AuthorForm;