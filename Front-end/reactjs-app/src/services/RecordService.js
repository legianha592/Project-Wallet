import { RECORD_ROOT_URL } from "../utils/constants";
import axios from 'axios';
import { toastError, toastSuccess } from "../utils/ToastManager";


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
    console.log(record)
    let response = await axios.post(RECORD_ROOT_URL + "/create", record)
    console.log(response.data)
    if (response.data.result != null) {
        record.id = response.data.result.record_id
        toastSuccess("Create record success!")
        return record
    } else if (response.data.message != null) {
        toastError(response.data.message)
    }
    return null
}

export async function updateRecord(record) {
    console.log(record)
    let response = await axios.put(RECORD_ROOT_URL + "/update", record)
    console.log(response.data)
    if (response.data.result != null) {
        toastSuccess("Update record success!")
        return record
    } else if (response.data.message != null) {
        toastError(response.data.message)
    }
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
        toastSuccess("Delete record success!")
        return true
    } else {
        toastError(response.data.message)
        return false
    }
}

