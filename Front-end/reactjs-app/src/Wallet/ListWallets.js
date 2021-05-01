
import React from "react"
import { useParams } from "react-router";
import { useState, useEffect } from 'react'
import { WALLET_ROOT_URL } from "../utils/constants";
import Wallet from "../Wallet/Wallet"
function ListWallets() {
    let { userId } = useParams();
    const [wallets, setWallets] = useState([])
    useEffect(() => {
        const getWallets = async () => {
            const walletsFromServer = await fetchWallets()
            if (walletsFromServer.result != null) {
                console.log(walletsFromServer.result.list_wallet)
                setWallets(walletsFromServer.result.list_wallet)
            }
        }

        getWallets()
    }, [])


    // Fetch Records
    const fetchWallets = async () => {
        const res = await fetch(`${WALLET_ROOT_URL}/list?userId=${userId}`)
        const data = await res.json()
        return data
    }

    return (
        <div>
            <h1>Inside list wallet, user id = {userId}</h1>
            <table>
                <tr>
                    <th>Wallet id</th>
                    <th>Wallet name</th>
                    <th>total amount</th>
                </tr>
                <>
                    {wallets.map((wallet) => (
                        <Wallet key={wallet.id} wallet={wallet} />
                    ))}
                </>
            </table>
        </div>
    )
}

export default ListWallets;

