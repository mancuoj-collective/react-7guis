import { useState } from 'react'
import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import { CheckIcon } from '@radix-ui/react-icons'

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

  const filteredList = list.filter((person) => person.surname.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="flex flex-col gap-3">
      <Input placeholder="Filter by surname" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ScrollArea className="flex h-52 max-h-52 flex-col rounded-md border px-1.5 py-2 text-sm">
        {filteredList.map((person) => (
          <div
            key={person.id}
            className="flex select-none items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
          >
            <CheckIcon className="size-4" />
            <p>
              {person.name}, {person.surname}
            </p>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}
