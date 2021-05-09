import { RECORD_ROOT_URL } from "../utils/constants";
import axios from 'axios';
import { getCurrentWalletId } from '../utils/WalletManager';


export default function RecordService() { }

export async function getRecords(walletId) {
    if (walletId == null) { return null }
    const res = await fetch(`${RECORD_ROOT_URL}/list?walletId=${walletId}`)
    const data = await res.json()
    console.log(walletId, data.result)
    if (data.result != null) {
        return data.result.list_record
    } else {
        return []
    }

}

export async function addRecord(record) {
    //record.amount = 1123
    //record.title = "ahaha";

    record.wallet_id = await getCurrentWalletId()
    record.typeRecord_id = 1
    //record.date =  "01/01/2021";
    //record.note = "test";
    console.log(record)
    axios.post(RECORD_ROOT_URL + "/create", record).then((response) => {
        console.log(response.data)
        if (response.data.result != null) {
            record.id = response.data.result.record_id
            return record
        } else if (response.data.message != null) {
            window.alert(response.data.message)
        }
    })
    return null
}

export async function deleteRecord(record_id) {
    console.log(record_id)
    let response = await axios.delete(`${RECORD_ROOT_URL}/delete`, {
        data: {
            record_id: record_id
        }
    })
    if (response.data.result != null) {
        return true
    } else {
        window.alert(response.data.message)
        return false
    }
}

