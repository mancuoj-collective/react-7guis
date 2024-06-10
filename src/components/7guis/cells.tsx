import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

export const Cells = () => {
  const [data, setData] = useState<{ [key: string]: { formula: string; value: string } }>({})
  const [editingCell, setEditingCell] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [dependencies, setDependencies] = useState<{ [key: string]: string[] }>({})

  useEffect(() => {
    const updatedData: { [key: string]: { formula: string; value: string } } = { ...data }
    const updatedDependencies: { [key: string]: string[] } = { ...dependencies }

    Object.keys(data).forEach((cell) => {
      const formula = data[cell].formula
      if (formula.startsWith('=')) {
        const matches = formula.match(/([A-Z]\d+)/g)
        if (matches) {
          updatedDependencies[cell] = matches
        } else {
          updatedDependencies[cell] = []
        }
        const evaluatedValue = evaluateFormula(formula.slice(1), getCellValue)
        updatedData[cell].value = isNaN(evaluatedValue) ? '#ERROR' : evaluatedValue.toString()
      } else {
        updatedData[cell].value = formula
      }
    })

    setData(updatedData)
    setDependencies(updatedDependencies)
  }, [data])

  const handleDoubleClick = (cell: string) => {
    setEditingCell(cell)
    setInputValue(data[cell]?.formula || '')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputBlur = () => {
    if (editingCell) {
      setData((prevData) => ({
        ...prevData,
        [editingCell]: { formula: inputValue, value: prevData[editingCell]?.value || '' },
      }))
      updateDependentCells(editingCell)
      setEditingCell(null)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputBlur()
    }
  }

  const getCellValue = (cell: string) => {
    const formula = data[cell]?.formula
    if (formula && formula.startsWith('=')) {
      return evaluateFormula(formula.slice(1), getCellValue)
    }
    return parseFloat(formula) || 0
  }

  const evaluateFormula = (formula: string, getCellValue: (cell: string) => number): number => {
    try {
      const value = new Function('getCellValue', `return ${formula.replace(/([A-Z]\d+)/g, 'getCellValue("$1")')}`)
      return value(getCellValue)
    } catch {
      return NaN
    }
  }

  const updateDependentCells = (cell: string) => {
    Object.keys(dependencies).forEach((dependentCell) => {
      if (dependencies[dependentCell].includes(cell)) {
        const formula = data[dependentCell].formula.slice(1)
        const evaluatedValue = evaluateFormula(formula, getCellValue)
        setData((prevData) => ({
          ...prevData,
          [dependentCell]: {
            formula: prevData[dependentCell].formula,
            value: isNaN(evaluatedValue) ? '#ERROR' : evaluatedValue.toString(),
          },
        }))
      }
    })
  }

  return (
    <ScrollArea className="size-96 rounded-md border">
      <Table>
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
                      data[cell]?.value || ''
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
