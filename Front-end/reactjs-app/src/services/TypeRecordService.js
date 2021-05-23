import { TYPE_RECORD_ROOT_URL } from "../utils/constants";
import axios from 'axios';
import { toastError, toastSuccess } from "../utils/ToastManager";


export default function TypeRecordService() { }
const baseURL = TYPE_RECORD_ROOT_URL

export async function getTypeRecords() {
    const res = await fetch(`${baseURL}/list`)
    console.log("getTypeRecords",res)
    const data = await res.json()
    console.log("getTypeRecords",data)
    if (data.result != null) {
        return data.result.list_typeRecord
    } else {
        return []
    }

}

export async function addTypeRecord(typeRecord_name) {
    console.log(typeRecord_name)
    let typeRecord = {
        "typeRecord_name" : typeRecord_name
    }
    let response = await axios.post(baseURL + "/create", typeRecord)
    console.log(response.data)
    if (response.data.result != null) {
        toastSuccess("Create typeRecord success!")
        return typeRecord_name
    } else if (response.data.message != null) {
        toastError(response.data.message)
    }
    return null
}

export async function updateTypeRecord(typeRecord) {
    console.log(typeRecord)
    let response = await axios.put(baseURL + "/update", typeRecord)
    console.log(response.data)
    if (response.data.result != null) {
        toastSuccess("Update typeRecord success!")
        return typeRecord
    } else if (response.data.message != null) {
        toastError(response.data.message)
    }
    return null
}



export async function deleteTypeRecord(typeRecord_id) {
    console.log(typeRecord_id)
    let response = await axios.delete(`${baseURL}/delete`, {
        data: {
            typeRecord_id: typeRecord_id
        }
    })
    if (response.data.result != null) {
        toastSuccess("Delete typeRecord success!")
        return true
    } else {
        toastError(response.data.message)
        return false
    }
}

