import noUsersFound from '../assets/noUsersFound.svg'
import teamWork from '../assets/teamWork.svg'
import requests from '../assets/requests.svg'

export const TouchGrass = () => {
  return (
    <div className='w-lg'>
        <img src={noUsersFound} />
    </div>
  )
}

export const UFO = () => {
  return (
    <div className='w-lg'>
        <img src={teamWork} />
    </div>
  )
}
export const RequestsImg = () => {
  return (
    <div className='w-lg'>
        <img src={requests} />
    </div>
  )
}


