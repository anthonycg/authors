import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthorList from "./AuthorList";
import { Link } from "react-router-dom";

const Update = (props) => {
    const {id} = useParams();
    const {authorList, setAuthorList} = props;
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skillOne, setSkillOne] = useState("");
    const [skillTwo, setSkillTwo] = useState("");
    const [skillThree, setSkillThree] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://localhost:8000/api/authors/" + id)
        .then(
            (res) => {
                console.log(res.data)
                setName(res.data.name)
                setType(res.data.type)
                setDescription(res.data.description)
                setSkillOne(res.data.skillOne)
                setSkillTwo(res.data.skillTwo)
                setSkillThree(res.data.skillThree)
            }
        )
        .catch(err=> {console.log(err)})
    }, [])

    const updateAuthor = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/authors/" + id, {
            name,
            type,
            description,
            skillOne,
            skillTwo,
            skillThree
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
            <div>
                <Link to="/">Back to home</Link>
            </div>
            <form onSubmit={updateAuthor}>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <h2>Edit a Pet</h2>
            <label>Name</label>
            <input type="text" name="name" 
            value={name}
            onChange={(e) => {setName(e.target.value)}}></input>
            <label>Type</label>
            <input type="text" name="name" 
            value={type}
            onChange={(e) => {setType(e.target.value)}}></input>
            <label>Description</label>
            <input type="text" name="name" 
            value={description}
            onChange={(e) => {setDescription(e.target.value)}}></input>
            <label>Skill One</label>
            <input type="text" name="name" 
            value={skillOne}
            onChange={(e) => {setSkillOne(e.target.value)}}></input>
            <label>Skill Two</label>
            <input type="text" name="name" 
            value={skillTwo}
            onChange={(e) => {setSkillTwo(e.target.value)}}></input>
            <label>Skill Three</label>
            <input type="text" name="name" 
            value={skillThree}
            onChange={(e) => {setSkillThree(e.target.value)}}></input>
            <input type="submit" />
            </form>
        </div>
    )
}

export default Update;