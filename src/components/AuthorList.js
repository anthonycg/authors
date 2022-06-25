import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, Router, BrowserRouter} from "react-router-dom";

const AuthorList = (props) => {
    const {authorList, setAuthorList, removeFromDom} = props;
    const [name, setName] = useState("");

    const deleteAuthor = (authorId) => {
        axios.delete("http://localhost:8000/api/authors/"+authorId)
        .then(res => {removeFromDom(authorId)})
        .catch(err=> console.log(err))
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors/")
        .then((res) => {
            console.log(res)
            setAuthorList(res.data)
        }
        )
        .catch((err) => console.log(err))

    }, [])

    return (
        <div>
            {
                authorList.map((author,index) => {
                    return (
                        <div key={index}>
                            <hr />
                            <p>{author.name}</p>

                            <Link to={`/authors/${author._id}`}>{author.name}'s Page</Link>
                            <Link to={'/author/edit/'+author._id}>Edit</Link>

                            <button onClick={(e) => {deleteAuthor(author._id)}}>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AuthorList;