import { useState } from 'react'

export default function FlightBooker() {
  const [flightType, setFlightType] = useState('one-way')
  const [departureDate, setDepartureDate] = useState(dateToString(new Date()))
  const [returnDate, setReturnDate] = useState(departureDate)
  const isReturn = flightType === 'return'
  const canBook = !isReturn || stringToDate(returnDate) > stringToDate(departureDate)

  function pad(n: number) {
    return String(n).length < 2 ? `0${n}` : n
  }

  function dateToString(date: Date) {
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + date.getDate()
  }

  function stringToDate(str: string) {
    const [y, m, d] = str.split('-').map(Number)
    return new Date(y, m - 1, d)
  }

  function handleBook() {
    alert(
      isReturn
        ? `You have booked a return flight leaving on ${departureDate} and returning on ${returnDate}.`
        : `You have booked a one-way flight leaving on ${departureDate}.`
    )
  }

  return (
    <div className="booker">
      <select value={flightType} onChange={e => setFlightType(e.target.value)}>
        <option value="one-way">One-way Flight</option>
        <option value="return">Return</option>
      </select>
      <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} />
      <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} disabled={!isReturn} />
      <button onClick={handleBook} disabled={!canBook}>
        Book
      </button>
      {!canBook && <p style={{ color: 'red' }}>Return date must be after departure date.</p>}
    </div>
  )
}
