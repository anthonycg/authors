import axios from "axios";
import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';

const OneAuthor = (props) => {
    const {authorList, setAuthorList} = props;
    const {id} = useParams();
    const [authorName, setAuthorName] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors/"+id)
        .then(res => {
            console.log(res.data);
            setAuthorName(res.data);
        })
        .catch(err=> console.log(err))
    }, [])

    return(
        <div>
            <p>Name: {authorName.name}</p>
            <p>ID: {authorName._id}</p>
            <p>Updated at: {authorName.updatedAt}</p>
        </div>
    )
}

export default OneAuthor;