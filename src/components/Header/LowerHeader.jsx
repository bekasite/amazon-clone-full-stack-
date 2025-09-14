import React from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import classes from './Header.module.css'
export default function LowerHeader() {
  return (
    <div className={classes.lower__container}>
      <ul>
        <li><AiOutlineMenu />
            <p>All</p></li>
        <li>Today's Deal's</li>
        <li>Costumer Service</li>
        <li>Registry</li>
        <li>Gift Card</li>
        <li>Sell</li>
      </ul>
    </div>
  )
}
