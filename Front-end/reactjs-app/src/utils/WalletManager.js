import Cookies from 'universal-cookie'

const cookie = new Cookies()
const CURRENT_WALLET_ID = 'currentWalletId'

export async function getCurrentWalletId() {
    return await cookie.get(CURRENT_WALLET_ID)
}

export function setCurrentWalletId(walletId) {
    cookie.set(CURRENT_WALLET_ID, walletId, { path: '/' })
}

export function removeCurrentWalletId() {
    cookie.remove(CURRENT_WALLET_ID)
}


export default function WalletManager() {
}
