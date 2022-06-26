import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, Router, BrowserRouter} from "react-router-dom";
import AuthorForm from "./AuthorForm";

const styles = {
    tbody: {
        fontFamily: "arial",
        borderCollapse: "collapse",
        width: "100%"
    },
    td: {
        marginBottom: "1rem"
    },
    th: {
        border: "1px solid black",
        textAlign: "left",
        padding: "8px"
    },
    tr: {
        backgroundColor: "gray"
    }
}



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
                <h1 style={{textAlign: 'center', marginLeft: "0rem"}}>Pet Shelter</h1>
                <h3 style={{textAlign: 'center', marginLeft: "0rem"}}>These pets are looking for a home</h3>
            <button><Link to={'/authors/new/'}>Add new Pet</Link></button>
            <div>
            </div>
        <tbody style={{flexDirection: "center",justifyContent: 'center'}}>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Update</th>
                            <th>Edit</th>
                        </tr>
                {authorList.map((author,index) => {
                    return (
                        <tr>
                        {/* <div key={index}> */}
                            <td key={index}><p>{author.name} </p></td>
                            <td key={index}><p>{author.type} </p></td>
                            <td><Link to={`/authors/${author._id}`}>Details</Link></td>
                            <td><Link to={'/author/edit/'+author._id}>Edit</Link></td>
                            
                            

                            
                            
                            {/* <button onClick={(e) => {deleteAuthor(author._id)}}>Delete</button> */}
                        {/* </div> */}
                        </tr>
                    )
                })
            }
            </tbody>
        </div>
    )
}

export default AuthorList;