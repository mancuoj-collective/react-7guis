import { ScrollArea, ScrollBar } from '../ui/scroll-area'

export function Cells() {
  return (
    <ScrollArea className="size-96 rounded-md border">
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
