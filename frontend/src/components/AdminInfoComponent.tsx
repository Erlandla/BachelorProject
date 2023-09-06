import React from 'react'
import { type AdminInfo } from '../types/types'
import { Link } from 'react-router-dom'

function AdminInfoComponent(props: AdminInfo) {
  const handleLocalStorage = () => {
    switch (props.title) {
      case 'Totalt':
        localStorage.setItem('searchFilter', '0')
        break

      case 'Løst':
        localStorage.setItem('searchFilter', '3')
        break
      case 'Påbegynnt':
        localStorage.setItem('searchFilter', '2')
        break
      case 'Nytt problem':
        localStorage.setItem('searchFilter', '1')
        break
    }
  }

  return (
    <div className="bg-buttonDark h-24 sm:h-32 w-[10rem] sm:w-[14rem] text-white whitespace-nowrap px-2 sm:px-5 py-2 sm:gap-2 flex flex-col cursor-pointer hover:drop-shadow-3xl hover:bg-buttonHover">
      <Link to={props.link} onClick={handleLocalStorage}>
        <h1 className="text-lg sm:text-2xl">{props.title}</h1>
        <p className="text-3xl sm:text-5xl">{props.count}</p>
      </Link>
    </div>
  )
}

export default AdminInfoComponent
