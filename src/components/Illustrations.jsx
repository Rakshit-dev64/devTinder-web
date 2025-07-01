import React from 'react'
import touchingGrass from '../assets/touchingGrass.svg'
import ufo from '../assets/ufo.svg'
import requests from '../assets/requests.svg'

export const TouchGrass = () => {
  return (
    <div className='w-88'>
        <img src={touchingGrass} />
    </div>
  )
}

export const UFO = () => {
  return (
    <div className='w-88'>
        <img src={ufo} />
    </div>
  )
}
export const RequestsImg = () => {
  return (
    <div className='w-88'>
        <img src={requests} />
    </div>
  )
}


