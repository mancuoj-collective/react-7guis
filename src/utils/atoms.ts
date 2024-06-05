import { atom } from 'jotai'

const baseCountAtom = atom(0)

export const countAtom = atom(
  (get) => get(baseCountAtom),
  (_, set) => {
    set(baseCountAtom, (count) => count + 1)
  },
)

const c2f = (c: number) => c * (9 / 5) + 32
const f2c = (f: number) => ((f - 32) * 5) / 9

const baseCelAtom = atom(5)
const baseFahAtom = atom(c2f(5))

export const celAtom = atom(
  (get) => get(baseCelAtom),
  (_, set, value: number) => {
    set(baseCelAtom, value)
    set(baseFahAtom, f2c(value))
  },
)

export const fahAtom = atom(
  (get) => get(baseFahAtom),
  (_, set, value: number) => {
    set(baseFahAtom, value)
    set(baseCelAtom, c2f(value))
  },
)
