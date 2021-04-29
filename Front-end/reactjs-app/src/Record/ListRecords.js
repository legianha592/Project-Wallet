
import React from "react"
import { useParams } from "react-router";
import { useState, useEffect } from 'react'
import { RECORD_ROOT_URL } from "../utils/constants";
import Record from "../Record/Record";
import AddRecord from "./AddRecord";
import axios from "axios";

function ListRecords(){
    let {walletId} = useParams();
    const [records, setRecords] = useState([])
    const [showAddRecord, setShowAddRecord] = useState(false)
    useEffect(() => {
        const getRecords = async () => {
          const recordsFromServer = await fetchRecords()
            console.log(recordsFromServer)
          if (recordsFromServer.result  != null ){
            console.log(recordsFromServer.result.list_record)
            setRecords(recordsFromServer.result.list_record)
          }
        }
        getRecords()
      }, [])


    // Fetch Records
    const fetchRecords = async () => {
        const res = await fetch(`${RECORD_ROOT_URL}/list?walletId=${walletId}`)
        const data = await res.json()
        return data
    }

    const addRecord = async (record) => {
        //record.amount = 1123
        //record.title = "ahaha";

        record.wallet_id = walletId;
        record.typeRecord_id = 1;
        //record.date =  "01/01/2021";
        //record.note = "test";
        console.log(record);
        axios.post(RECORD_ROOT_URL + "/create", record).then((response) => {
            console.log(response.data);
            if (response.data.result != null ){
                record.id = response.data.result.record_id
                setRecords([...records, record]);
            }else if (response.data.message != null){
                window.alert(response.data.message)
            }
        });
    
        
        
        
      }
    
    return(
        <div>
            <button
            onClick={() => setShowAddRecord(!showAddRecord)}
            >Add Record +
            </button>
            {showAddRecord && <AddRecord onAdd={addRecord} />}
            <h1>Inside list wallet, wallet id = {walletId}</h1>
            <>
            <table>
                <tr>
                    <th>Record id</th>
                    <th>Record title</th>
                    <th>Amunt</th>
                </tr>
                {records.map((record) => (
                    <Record key={record.id} record={record} />
                ))}
            </table>
            
            </>
        </div>
    )
}

export default ListRecords;

