import React from 'react'
import { type User } from '../types/types'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import validateUser from '../utils/validateUser'

function SubInfoComponent(props: User) {
  try {
    validateUser(props)
  } catch (error: any) {
    const errorMsg = 'En feil oppstod: '.concat(error)
    return (
      <div>
        <p className="color-red items-center">{errorMsg}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-wrap gap-1 text-white justify-between bg-buttonDark py-2.5 px-2.5 text-xs sm:flex-row sm:text-base">
      <div className="flex flex-row items-center gap-1">
        <LocationCityIcon sx={{ fontSize: '1rem' }} />
        {props.affiliation}
      </div>
      <div className="flex flex-row items-center gap-1">
        <EmailIcon sx={{ fontSize: '1rem' }} />
        {props.email}
      </div>
      <div className="flex flex-row items-center gap-1">
        <PhoneIcon sx={{ fontSize: '1rem' }} />
        +47 {props.telephone}
      </div>
    </div>
  )
}

export default SubInfoComponent
