import React from 'react'
import { useColor } from './contextProvider'

export default function ComponentB() {
    const {color} = useColor()
  return (
    <div className={color}>
      <h1>Component B</h1>
      <h1>color is {color}</h1>
    </div>
  )
}
