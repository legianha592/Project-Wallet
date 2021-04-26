import Cookie from 'universal-cookie'

const cookie = new Cookie()

export function getCurrentWalletId() {
    return cookie.get('currentWalletId')
}

export function setCurrentWalletId(walletId) {
    cookie.set("currentWalletId", walletId)
}

export default function WalletManager() {
}
