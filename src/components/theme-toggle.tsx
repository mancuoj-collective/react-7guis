import { Button } from '~/components/ui/button'
import { useDark } from '~/hooks/use-dark'

export function ThemeToggle() {
  const { toggleDark } = useDark()

  return (
    <Button variant="ghost" size="icon" onClick={toggleDark}>
      <span
        role="img"
        aria-hidden="true"
        className="i-carbon-sun size-5 rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0"
      />
      <span
        role="img"
        aria-hidden="true"
        className="i-carbon-moon absolute size-5 rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
