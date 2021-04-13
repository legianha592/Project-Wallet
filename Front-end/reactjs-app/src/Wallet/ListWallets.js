import React, {useState} from "react"
import { useParams } from "react-router"


function ListWallets(){
    let {userId} = useParams();

    const [state, setState] = useState({
        user_id : null,
    })

    return(
        <h1>Inside the list wallet, userID: {userId}</h1>
    )
}

export default ListWallets