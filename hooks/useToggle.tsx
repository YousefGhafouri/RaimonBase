import { useCallback, useState } from 'react'
const useToggle = (inp?:boolean) => {
  const State = useState(inp??false) 
  const toggle = useCallback(() => State[1](prev => !prev), [State[1]])
  State[1] = toggle
  return State as [boolean, ()=>void]
}

export default useToggle