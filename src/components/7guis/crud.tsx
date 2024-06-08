import { CheckIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { cn } from '~/utils/cn'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'

type Person = {
  id: number
  name: string
  surname: string
}

export function Crud() {
  const [list, setList] = useState<Person[]>([
    { id: 1, name: 'Emil', surname: 'Hans' },
    { id: 2, name: 'Mustermann', surname: 'Max' },
    { id: 3, name: 'Titch', surname: 'Roman' },
  ])
  const [filter, setFilter] = useState('')
  const [selectId, setSelectId] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')

  const filteredList = list.filter((person) => person.surname.toLowerCase().includes(filter.toLowerCase()))

  const clearSelection = () => {
    setSelectId(null)
    setName('')
    setSurname('')
  }

  const handleSelect = ({ id, name, surname }: Person) => {
    if (selectId === id) {
      clearSelection()
    } else {
      setSelectId(id)
      setName(name)
      setSurname(surname)
    }
  }

  const handleCreate = () => {
    if (!name || !surname) {
      return
    }
    setList([...list, { id: list.length + 1, name, surname }])
    clearSelection()
  }

  const handleUpdate = () => {
    if (!selectId || !name || !surname) {
      return
    }
    setList(list.map((person) => (person.id === selectId ? { ...person, name, surname } : person)))
    clearSelection()
  }

  const handleDelete = () => {
    if (!selectId) {
      return
    }
    setList(list.filter((person) => person.id !== selectId))
    clearSelection()
  }

  return (
    <div className="flex gap-3">
      <div className="flex flex-1 flex-col gap-3">
        <Input placeholder="Filter by surname" value={filter} onChange={(e) => setFilter(e.target.value)} />
        <ScrollArea className="flex h-52 max-h-52 flex-col rounded-md border px-2.5 py-2 text-sm">
          {filteredList.map((person) => (
            <div
              key={person.id}
              className="flex select-none items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
              onClick={() => handleSelect(person)}
            >
              <CheckIcon className={cn('size-4 opacity-0', { 'opacity-100': selectId === person.id })} />
              <p>
                {person.name}, {person.surname}
              </p>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="flex w-40 flex-col justify-between">
        <div className="flex flex-col gap-3">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="outline" onClick={handleCreate}>
            Create
          </Button>
          <Button variant="outline" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="outline" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
