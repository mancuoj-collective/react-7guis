import { useState } from 'react'
import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import { CheckIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { cn } from '~/utils/cn'

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

  const handleSelect = (person: Person) => {
    if (selectId === person.id) {
      setSelectId(null)
      setName('')
      setSurname('')
      return
    }
    setSelectId(person.id)
    setName(person.name)
    setSurname(person.surname)
  }

  return (
    <div className="flex gap-3">
      <div className="flex flex-1 flex-col gap-3">
        <Input placeholder="Filter by surname" value={filter} onChange={(e) => setFilter(e.target.value)} />
        <ScrollArea className="flex h-52 max-h-52 flex-col rounded-md border px-1.5 py-2 text-sm">
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
          <Input placeholder="Name" value={name} />
          <Input placeholder="Surname" value={surname} />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="outline">Create</Button>
          <Button variant="outline">Update</Button>
          <Button variant="outline">Delete</Button>
        </div>
      </div>
    </div>
  )
}
