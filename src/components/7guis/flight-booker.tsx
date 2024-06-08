import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, format, isAfter, isBefore } from 'date-fns'
import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '~/utils/cn'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export function FlightBooker() {
  const [type, setType] = useState('one-way')
  const [departureDate, setDepartureDate] = useState<Date | undefined>(new Date())
  const [returnDate, setReturnDate] = useState<Date | undefined>()

  const isReturn = type === 'return'

  const disableInvalidReturnDates = (date: Date) => {
    if (!departureDate) return false
    return isBefore(date, addDays(departureDate, -1)) || isAfter(date, addDays(departureDate, 30))
  }

  const handleDepartureDateChange = (newDate: Date | undefined) => {
    if (!newDate) {
      setReturnDate(undefined)
      return
    }
    if (returnDate && (isBefore(returnDate, newDate) || isAfter(returnDate, addDays(newDate, 30)))) {
      setReturnDate(undefined)
    }
    setDepartureDate(newDate)
  }

  const handleBook = () => {
    toast.success(
      isReturn
        ? `You have booked a return flight leaving on ${format(departureDate!, 'PP')} and returning on ${format(returnDate!, 'PP')}`
        : `You have booked a one-way flight leaving on ${format(departureDate!, 'PP')}`,
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Select value={type} onValueChange={setType}>
        <SelectTrigger>
          <SelectValue placeholder="Select a flight type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="one-way">One-way Flight</SelectItem>
          <SelectItem value="return">Return Flight</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn('justify-start text-left font-normal flex-1', !departureDate && 'text-muted-foreground')}
            >
              <CalendarIcon className="mr-2 size-4" />
              {departureDate ? format(departureDate, 'PP') : <span>Departure Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={departureDate} onSelect={handleDepartureDateChange} initialFocus />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              disabled={!(isReturn && departureDate)}
              variant={'outline'}
              className={cn('justify-start text-left font-normal flex-1', !returnDate && 'text-muted-foreground')}
            >
              <CalendarIcon className="mr-2 size-4" />
              {returnDate ? format(returnDate, 'PP') : <span>Return Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={returnDate}
              onSelect={setReturnDate}
              initialFocus
              disabled={disableInvalidReturnDates}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button variant="outline" onClick={handleBook}>
        Book
      </Button>
    </div>
  )
}
