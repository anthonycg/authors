import axios from "axios";
import React, { useEffect, useState } from "react";
import {useParams, Link, useNavigate} from 'react-router-dom';

const OneAuthor = (props) => {
    const {authorList, setAuthorList} = props;
    const {id} = useParams();
    const [authorName, setAuthorName] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors/"+id)
        .then(res => {
            console.log(res.data);
            setAuthorName(res.data);
        })
        .catch(err=> console.log(err))
    }, [])

    // const removeFromDom = authorId => {
    //     setAuthorList(authorList.filter(author => author._id !== authorId));
    // }

    const deleteAuthor = (authorId) => {
        axios.delete("http://localhost:8000/api/authors/"+authorId)
        .then(res => {
            // removeFromDom(authorId)
            navigate("/");
            
        })
        .catch(err=> console.log(err))
    }

    
    return(
        <div>
            <div><button onClick={(e) => {deleteAuthor(authorName._id)}}>Adopt {authorName.name}</button></div>
            <Link to={'/'}>back to home</Link>
            <p>Name: {authorName.name}</p>
            <p>Type: {authorName.type}</p>
            <p>Description: {authorName.description}</p>
            <p>Skill One: {authorName.skillOne}</p>
            <p>Skill Two: {authorName.skillTwo}</p>
            <p>Skill Three: {authorName.skillThree}</p>
        </div>
    )
}

export default OneAuthor;