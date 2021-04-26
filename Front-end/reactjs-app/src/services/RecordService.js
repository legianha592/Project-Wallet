import { RECORD_ROOT_URL } from "../utils/constants";
import { axios } from 'axios';
import { getCurrentWalletId } from '../utils/WalletManager';


export default function RecordService() { }

export async function getRecords(walletId) {
    const res = await fetch(`${RECORD_ROOT_URL}/list?walletId=${walletId}`)
    const data = await res.json()
    console.log(walletId, data.result)
    return data.result.list_record
}

export async function addRecord(record) {
    //record.amount = 1123
    //record.title = "ahaha";

    record.wallet_id = getCurrentWalletId()
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
