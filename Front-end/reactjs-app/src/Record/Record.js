
import {useHistory} from "react-router-dom";
function Record({record}){
    let history = useHistory()
    const redirect = () => {
        history.push(`/record/detail/${record.id}`)
    }

    return (
        <tr onClick={redirect}>
            <td>{record.id}</td>
            <td>{record.title}</td>
            <td>{record.amount}</td>
        </tr>
    )
}

export default Record;
