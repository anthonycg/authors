import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthorList from "./AuthorList";

const Update = (props) => {
    const {id} = useParams();
    const {authorList, setAuthorList} = props;
    const [name, setName] = useState();
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://localhost:8000/api/authors/" + id)
        .then(
            (res) => {
                console.log(res.data)
                setName(res.data.name)
            }
        )
        .catch(err=> {console.log(err)})
    }, [])

    const updateAuthor = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/authors/" + id, {
            name
        })
        .then(res => {
            console.log(res);
            navigate("/");
        })
        .catch(err=>{
            console.log(err.response.data.errors)
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
            <form onSubmit={updateAuthor}>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <h2>Update an Author</h2>
            <label>Name</label>
            <input type="text" name="name" 
            value={name}
            onChange={(e) => {setName(e.target.value)}}></input>
            <input type="submit" />
            </form>
        </div>
    )
}

export default Update;