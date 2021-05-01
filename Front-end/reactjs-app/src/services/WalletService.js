import { WALLET_ROOT_URL } from '../utils/constants';
import { getUser, isLoggedIn } from '../utils/UserManager';


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

