
import {Link} from "react-router-dom";
function Wallet({wallet}){
  return (
    <div>
      <h3>
      <Link to={"/record/list/" + wallet.id} params={{ walletId: wallet.id }}>{wallet.wallet_name} - {wallet.total_amount}</Link>
      </h3>
    </div>
  )
}

export default Wallet;
