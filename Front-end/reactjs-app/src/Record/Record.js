
import {Link} from "react-router-dom";
function Record({record}){
  return (
    <div>
      <h3>
      <Link to="/record/list/">{record.id} : {record.title} - {record.amount} VND</Link>
        
      </h3>
    </div>
  )
}

export default Record;
