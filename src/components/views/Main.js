import React, { useState } from 'react';
import axios from 'axios';
import AuthorForm from "../AuthorForm";
import AuthorList from "../AuthorList";
// import Demo from '../Paper';


const Main = (props) => {
    const [authorList, setAuthorList] = useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skillOne, setSkillOne] = useState("");
    const [skillTwo, setSkillTwo] = useState("");
    const [skillThree, setSkillThree] = useState("");


    const removeFromDom = authorId => {
        setAuthorList(authorList.filter(author => author._id !== authorId));
    }

    return (
        <div>
            {/* <AuthorForm authorList = {authorList} setAuthorList= {setAuthorList}/> */}
            <AuthorList authorList = {authorList} setAuthorList= {setAuthorList} removeFromDom = {removeFromDom} />
            {/* <Demo /> */}
        </div>
    )

}

export default Main;