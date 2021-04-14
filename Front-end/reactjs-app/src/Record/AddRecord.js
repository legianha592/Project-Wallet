
import { useState } from 'react'

function AddRecord({ onAdd }) {
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [note, setNote] = useState('')
    const [date, setDate] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!amount || !note || !date || !title) {
            alert('please fill out all required fields')
            return
        }
        onAdd({ title, amount,note,date })
        setTitle('')
        setAmount('')
        setNote('')
        setDate('')
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
          <div className='form-control'>
            <label>Title      </label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            required/>
          </div>
          <div className='form-control'>
            <label>Note       </label>
            <input
              type='text'
              value={note}
              onChange={(e) => setNote(e.target.value)}
            required/>
          </div>
          <div className='form-control'>
            <label>Date       </label>
            <input
              type='text'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required/>
          </div>
          <div className='form-control'>
            <label>Amount     </label>
            <input
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required/>
          </div>
          <input type='submit' value='Save Record' className='btn btn-block' />
        </form>
      )
}

export default AddRecord;