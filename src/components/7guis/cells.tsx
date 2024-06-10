import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

type CellData = {
  formula: string
  value: string
}

type DataState = {
  [key: string]: CellData
}

type DependenciesState = {
  [key: string]: string[]
}

export const Cells = () => {
  const [data, setData] = useState<DataState>({
    A0: { formula: '4', value: '4' },
    B0: { formula: '9', value: '9' },
    A1: { formula: '=A0+B0', value: '13' },
    B1: { formula: '=A0*B0', value: '36' },
    C1: { formula: '=A1+B1', value: '49' },
  })
  const [editingCell, setEditingCell] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [dependencies, setDependencies] = useState<DependenciesState>({
    A1: ['A0', 'B0'],
    B1: ['A0', 'B0'],
    C1: ['A1', 'B1'],
  })

  useEffect(() => {
    const updatedData = { ...data }
    const updatedDependencies = { ...dependencies }

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
        updatedData[cell].value = Number.isNaN(evaluatedValue) ? '#ERROR' : evaluatedValue.toString()
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
    if (formula?.startsWith('=')) {
      return evaluateFormula(formula.slice(1), getCellValue)
    }
    return Number.parseFloat(formula) || 0
  }

  const evaluateFormula = (formula: string, getCellValue: (cell: string) => number): number => {
    try {
      const value = new Function('getCellValue', `return ${formula.replace(/([A-Z]\d+)/g, 'getCellValue("$1")')}`)
      return value(getCellValue)
    } catch {
      return Number.NaN
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
            value: Number.isNaN(evaluatedValue) ? '#ERROR' : evaluatedValue.toString(),
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
              <TableHead key={i} className="min-w-[72px] border-r text-center">
                {String.fromCharCode(65 + i)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 100 }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="h-12">
              <TableCell className="border-r text-center text-muted-foreground">{rowIndex}</TableCell>
              {Array.from({ length: 26 }).map((_, colIndex) => {
                const cell = `${String.fromCharCode(65 + colIndex)}${rowIndex}`
                return (
                  <TableCell key={colIndex} onDoubleClick={() => handleDoubleClick(cell)} className="text-center">
                    {editingCell === cell ? (
                      <Input
                        className="h-7 w-[56px] rounded-none px-1 py-1 text-sm"
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
