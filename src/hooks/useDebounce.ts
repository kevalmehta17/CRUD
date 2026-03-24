
import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debounceValue, setDebounceValue] = useState(value)
  console.log("debounceValue", debounceValue)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
      console.log("im updating now after timeout", value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debounceValue
}