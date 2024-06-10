import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

export function Cells() {
  return (
    <Table>
      <ScrollArea className="size-96 rounded-md border pb-3 pr-3">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            {Array.from({ length: 26 }).map((_, i) => (
              <TableHead key={i}>{String.fromCharCode(65 + i)}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 100 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>{i}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Table>
  )
}
