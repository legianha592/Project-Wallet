import { WALLET_ROOT_URL } from '../utils/constants';
import { getUser, isLoggedIn } from '../utils/UserManager';
import axios from 'axios';

export default function WalletService() { }

export async function getWallets() {
    const user = await getUser()
    const isLogin = await isLoggedIn()
    if (!isLogin) {
        return
    } else {
        const res = await fetch(`${WALLET_ROOT_URL}/list?userId=${user.id}`)
        const data = await res.json()
        return data.result.list_wallet
    }
}

export async function addWallet(walletName) {
    var wallet = {}
    let user = await getUser()
    wallet.user_id = user.id
    wallet.wallet_name = walletName
    console.log(wallet)
    let response = await axios.post(WALLET_ROOT_URL + "/create", wallet)
    console.log(response.data)
    if (response.data.result != null) {
        wallet.id = response.data.result.wallet_id
        return wallet
    } else if (response.data.message != null) {
        window.alert(response.data.message)
    }
    return null
}



