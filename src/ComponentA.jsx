import React from 'react'
import { useColor } from './contextProvider'

export default function ComponentA() {
    const {colorToggler} = useColor()
  return (
    <div>
      <button onClick={colorToggler}>color Toggler</button>
    </div>
  )
}
