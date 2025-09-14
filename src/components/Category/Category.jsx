import React from 'react'
import CategoryCard from './CategoryCard'
import {categoryInfos} from './categoryFullInfo'
import classes from './Category.module.css'

export default function Category() {
  return (
    <div className={classes.category__container}>
        {
         categoryInfos.map((infos)=>{
           return <CategoryCard data = {infos}/>
         })
         
        }
    </div>
  )
}
