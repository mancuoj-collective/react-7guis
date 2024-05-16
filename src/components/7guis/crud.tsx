import { useState } from 'react'

export default function CRUD() {
  const [names] = useState(['Emil, Hans', 'Mustermann, Max', 'Tisch, Roman'])
  const [prefix, setPrefix] = useState('')
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')

  const filterNames = names.filter((name) => name.toLowerCase().startsWith(prefix.toLowerCase()))

  return (
    <div className="crud">
      <label>
        Filter Prefix: <input value={prefix} onChange={(e) => setPrefix(e.target.value)} />
      </label>

      <select size={5}>
        {filterNames.map((name) => (
          <option key={name}>{name}</option>
        ))}
      </select>

      <div className="names">
        <input value={first} onChange={(e) => setFirst(e.target.value)} placeholder="Name" />
        <input value={last} onChange={(e) => setLast(e.target.value)} placeholder="Surname" />
      </div>

      <div className="buttons">
        <button>Create</button>
        <button>Update</button>
        <button>Delete</button>
      </div>
    </div>
  )
}
