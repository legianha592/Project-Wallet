
import React from "react"
import { useParams } from "react-router";

function ListWallets(){
    let {userId} = useParams();

    return(
        <h1>Inside list wallet, user id = {userId}</h1>
    )
}

export default ListWallets;

