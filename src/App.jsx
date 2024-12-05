import React, { useEffect, useState } from 'react'
import supabase from './connector'
import Chance from 'chance'

const App = () => {
  let chance = new Chance()
  const [attData, setAttData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
   
  function handleSubmit(event){
    event.preventDefault()

    const fullname = event.target.fullname.value
    const email = event.target.email.value
    const phone = event.target.phone.value
    const address = event.target.address.value

    if(!fullname || !email || !phone || !address) return alert("silahkan masukan data")

    supabase.from("attendances").insert([
      {
        fullname : fullname,
        email : email,
        phone : phone,
        address : address,
      }
    ])
    .then(res => {
      console.info(res)
      setRefresh(prev => prev = !prev)

      event.target.fullname.value = ""
      event.target.email.value = ""
      event.target.phone.value = ""
      event.target.address.value = ""
    })
  }

  function handleDelete(id){
    const conf = window.confirm("Yakin delete data ini ?")
    if(!conf) return

    supabase.from("attendances").delete().eq("id", id)
    .then( res => {
      setRefresh(prev => prev = !prev)
    })
  }

  function handleRandomData(){
    let collData = []

    for(let i = 1; i <= 50; i++){
      let fullname = chance.name()
      let address = chance.address()
      let phone = chance.phone()
      let email = chance.email()
      collData.push({
        fullname, address, phone, email
      })
    }

    supabase.from("attendances").insert(collData)
    .then(res => {
      setRefresh(prev => prev = !prev)
    })
  }

  function handleSelectMultiple(event){
    let checked = event.target.checked
    let id = parseInt(event.target.id)

    if(checked){
      setSelectedRows(prev => [...prev, id])
    }else {
      let filterId = selectedRows.filter(e => e != id)
      setSelectedRows(filterId)
    }
  }

  function handleDeleteAll(){
    let conf = window.confirm("Yakin delete " + selectedRows.length + " data ?")
    if(!conf) return

    supabase.from("attendances").delete().in("id", selectedRows)
    .then(res => {
      setRefresh(prev => prev = !prev)
      setSelectedRows([])
    })
  }

  function handleSelectAll(event){
    let checked = event.target.checked
    if(checked){
      let allRows = attData.map(val => val.id)
      setSelectedRows(allRows)
    }else {
      setSelectedRows([])
    }
  }

  useEffect(()=>{
    console.info(selectedRows)
  }, [ selectedRows ])

  useEffect(()=>{
    supabase.from("attendances").select()
    .then(res => {
      setAttData(res.data)
    })
  }, [refresh])

  return (
    <div className="bg-[#0D0D0D] min-h-screen p-8 text-[#E6E6E6]">
      <h1 className="text-3xl font-bold mb-8 text-[#4BFFFF] text-center">Attendance App</h1>

      <div className="flex space-x-4 mb-8">
        <button 
          onClick={handleRandomData} 
          className="h-10 px-4 bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] 
                     text-[#187a7a] rounded-lg hover:bg-[#4BFFFF] 
                     hover:text-[#4BFFFF] transition-all duration-300
                     shadow-[0_0_10px_rgba(0,255,255,0.4)] 
                     hover:shadow-[0_0_20px_rgba(0,255,255,0.6)]"
        >
          Generate Random Data
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        {['fullname', 'email', 'phone', 'address'].map((field) => (
          <div key={field} className="flex flex-col">
            <label 
              htmlFor={field} 
              className="mb-2 text-[#B3B3B3] uppercase tracking-wider"
            >
              {field}
            </label>
            <input 
              type="text" 
              id={field} 
              className="bg-[#1A1A1A] border border-[#2D2D2D] 
                         text-[#E6E6E6] p-2 rounded-md 
                         focus:outline-none focus:ring-2 
                         focus:ring-[#4BFFFF]"
            />
          </div>
        ))}

        <button 
          type='submit'
          className="w-full py-3 bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] 
                     text-[#187a7a] rounded-lg hover:bg-[#4BFFFF] 
                     hover:text-[#4BFFFF] transition-all duration-300
                     shadow-[0_0_10px_rgba(0,255,255,0.4)] 
                     hover:shadow-[0_0_20px_rgba(0,255,255,0.6)]"
        >
          Submit
        </button>
      </form>

      {selectedRows.length > 0 && (
        <button 
          className="mb-4 h-10 px-4 bg-red-600 text-white rounded-lg
                     hover:bg-red-700 transition-all duration-300"
          onClick={handleDeleteAll}
        >
          {selectedRows.length === attData.length 
            ? 'Delete All Rows' 
            : `Delete ${selectedRows.length} Rows`}
        </button>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#1A1A1A] text-[#4BFFFF]">
              <th className="p-3">
                <input 
                  type="checkbox" 
                  id='all' 
                  onChange={handleSelectAll}
                  checked={attData.length == selectedRows.length && selectedRows.length != 0}
                  className="form-checkbox text-[#4BFFFF] bg-[#0D0D0D]"
                />
              </th>
              <th className="p-3">ID</th>
              <th className="p-3">Fullname</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Address</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {attData.map((e) => (
              <tr 
                key={e.id} 
                className="border-b border-[#2D2D2D] hover:bg-[#1A1A1A] transition-colors"
              >
                <td className="p-3">
                  <input 
                    type="checkbox" 
                    id={e.id} 
                    onChange={handleSelectMultiple} 
                    checked={selectedRows.includes(e.id)}
                    className="form-checkbox text-[#4BFFFF] bg-[#0D0D0D]"
                  />
                </td>
                <td className="p-3"> {e.id} </td>
                <td className="p-3"> {e.fullname} </td>
                <td className="p-3"> {e.email} </td>
                <td className="p-3"> {e.phone} </td>
                <td className="p-3"> {e.address} </td>
                <td className="p-3 space-x-2">
                  <button 
                    onClick={() => handleDelete(e.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded-md 
                               hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                  <button 
                    className="px-2 py-1 bg-[#1A1A1A] text-[#4BFFFF] 
                               rounded-md hover:bg-[#2D2D2D] transition-colors"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App