
import React from "react"
import { useParams } from "react-router";

function ListWallets(){
    let {id} = useParams();

    return(
        <h1>Inside list wallet, user id = {id}</h1>
    )
}

export default ListWallets;

