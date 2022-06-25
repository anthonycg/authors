import React, {useEffect, useState} from "react";
import axios from "axios";

const AuthorForm = (props) => {
    const {authorList, setAuthorList} = props;
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);

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
        .catch(err=>{
            console.log(err)
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        })
    }

    return (
        <div>
            <form onSubmit={addAuthor}>
                {errors.map((err, index) => <p key={index}>{err}</p>)}
                <label>Author Name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)}></input>
                <input type="submit" />
            </form>
        </div>
    )
}

export default AuthorForm;