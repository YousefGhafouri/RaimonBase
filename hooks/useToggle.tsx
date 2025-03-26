import React, { useState } from 'react'

const useToggle = (inp?:boolean) => {
  const State = useState(inp??false) as [boolean, ()=>void]
  State[1] = State[1].bind(this,(prev)=>!prev)
  return State
}

export default useToggle