import noUsersFound from '../assets/NoUsersFound.svg'
import teamWork from '../assets/teamWork.svg'
import requests from '../assets/requests.svg'
import Login from '../assets/Login.svg'

export const TouchGrass = () => {
  return (
    <div className='w-64 sm:w-80 lg:w-lg'>
        <img src={noUsersFound} />
    </div>
  )
}

export const UFO = () => {
  return (
    <div className='w-64 sm:w-80 lg:w-lg'>
        <img src={teamWork} />
    </div>
  )
}
export const RequestsImg = () => {
  return (
    <div className='w-64 sm:w-80 lg:w-lg'>
        <img src={requests} />
    </div>
  )
}
export const LoginIllustration = () => {
  return(
  <div className='w-4xl'>
    <img src={Login}/>
  </div>
  )
}


