
import {Link, useHistory} from "react-router-dom";


function Wallet({wallet}){
    let history = useHistory()
    const redirect = () => {
        history.push(`/record/list/${wallet.id}`)
    }
    return (
        <tr onClick={redirect}>
            <td>{wallet.id}</td>
            <td>{wallet.wallet_name}</td>
            <td>{wallet.total_amount}</td>
        </tr>
    )
}

export default Wallet;
