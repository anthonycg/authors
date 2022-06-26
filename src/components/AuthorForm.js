import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, BrowserRouter, Routes, Route} from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";

const AuthorForm = (props) => {
    const {authorList, setAuthorList} = props;
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skillOne, setSkillOne] = useState("");
    const [skillTwo, setSkillTwo] = useState("");
    const [skillThree, setSkillThree] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const addAuthor = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/authors/", {
            name,
            type,
            description,
            skillOne,
            skillTwo,
            skillThree
        })
        .then(res =>{
            console.log(res);
            console.log(res.data);
            setAuthorList([...authorList, res.data]);
            navigate("/");
        })
        .catch((err)=>{
            console.log(err)
            const errorResponse = err.response.data.err.errors;
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        })
    }

    return (
        <div>
            <Link to="/">Back to home</Link>
            <form onSubmit={addAuthor}>
                
                {errors.map((err, index) => <p key={index}>{err}</p>)}
                <label>Pet Name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)}></input>
                <label>Pet Type:</label>
                <input type="text" onChange={(e) => setType(e.target.value)}></input>
                <label>Pet Description:</label>
                <input type="text" onChange={(e) => setDescription(e.target.value)}></input>
                <label>Skill 1:</label>
                <input type="text" onChange={(e) => setSkillOne(e.target.value)}></input>
                <label>Skill 2:</label>
                <input type="text" onChange={(e) => setSkillTwo(e.target.value)}></input>
                <label>Skill 3:</label>
                <input type="text" onChange={(e) => setSkillThree(e.target.value)}></input>
                <input type="submit" />
            </form>
        </div>
    )
}

export default AuthorForm;