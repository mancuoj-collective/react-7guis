import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

export const Cells = () => {
  const [data, setData] = useState<{ [key: string]: string }>({})
  const [editingCell, setEditingCell] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const updatedData: { [key: string]: string } = {}
    Object.keys(data).forEach((cell) => {
      const value = data[cell]
      if (value && value.startsWith('=')) {
        const evaluatedValue = evaluateFormula(value.slice(1), getCellValue)
        updatedData[cell] = isNaN(evaluatedValue) ? '#ERROR' : evaluatedValue.toString()
      } else {
        updatedData[cell] = value
      }
    })
    setData(updatedData)
  }, [data])

  const handleDoubleClick = (cell: string) => {
    setEditingCell(cell)
    setInputValue(data[cell] || '')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputBlur = () => {
    if (editingCell) {
      setData((prevData) => ({ ...prevData, [editingCell]: inputValue }))
      setEditingCell(null)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputBlur()
    }
  }

  const getCellValue = (cell: string) => {
    const value = data[cell]
    if (value && value.startsWith('=')) {
      return evaluateFormula(value.slice(1), getCellValue)
    }
    return parseFloat(value) || 0
  }

  const evaluateFormula = (formula: string, getCellValue: (cell: string) => number): number => {
    try {
      const value = new Function('getCellValue', `return ${formula.replace(/([A-Z]\d+)/g, 'getCellValue("$1")')}`)
      return value(getCellValue)
    } catch {
      return NaN
    }
  }

  return (
    <Table>
      <ScrollArea className="size-96 rounded-md border">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-12 border-r text-center">#</TableHead>
            {Array.from({ length: 26 }).map((_, i) => (
              <TableHead key={i} className="min-w-[80px] border-r text-center">
                {String.fromCharCode(65 + i)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 100 }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="h-12">
              <TableCell className="border-r text-center">{rowIndex}</TableCell>
              {Array.from({ length: 26 }).map((_, colIndex) => {
                const cell = `${String.fromCharCode(65 + colIndex)}${rowIndex}`
                return (
                  <TableCell key={colIndex} onDoubleClick={() => handleDoubleClick(cell)} className="text-center">
                    {editingCell === cell ? (
                      <Input
                        className="h-7 w-[62px] rounded-none px-1 py-1 text-sm"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleInputKeyDown}
                        autoFocus
                      />
                    ) : (
                      data[cell]
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Table>
  )
}
