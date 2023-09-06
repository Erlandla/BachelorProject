import React, { useEffect, useState, useContext } from 'react'
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo'
import PeopleIcon from '@mui/icons-material/People'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import { type ProblemCardProps } from '../types/types'
import { Status } from '../types/types'
import ODACircle from './ODACircle'
import { ProblemContext } from '../globalState/ProblemContext'
import { Link } from 'react-router-dom'
import validateProblem from '../utils/validateProblem'

function ProblemCard(props: ProblemCardProps) {
  const [statusColor, setStatusColor] = useState(
    'rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusRed'
  )

  const { setProblem } = useContext(ProblemContext)

  const onChange = () => {
    setProblem({
      id: props.id,
      title: props.title,
      vendor: props.vendor,
      status: props.status,
      specificProblem: props.specificProblem,
      clearDataProduct: props.clearDataProduct,
      accessibleData: props.accessibleData,
      definedAction: props.definedAction,
      subCount: props.subCount,
      owner: props.owner,
      subs: props.subs,
      edit: props.edit,
      approved: props.approved,
    })
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // for safari, chrome, edge, etc.
  }

  useEffect(() => {
    if (props.approved.toString() === 'true') {
      switch (props.status) {
        case Status.newProblem:
          setStatusColor('rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusRed')
          break

        case Status.started:
          setStatusColor(
            'rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusOrange'
          )
          break

        case Status.solved:
          setStatusColor(
            'rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusGreen'
          )
          break
      }
    } else {
      setStatusColor('rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-white')
    }
  }, [props.status])

  try {
    validateProblem(props)
  } catch (error: any) {
    const errorMsg = 'En feil oppstod: '.concat(error)
    return (
      <div>
        <p className="color-red items-center">{errorMsg}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-between h-64 w-80 bg-buttonDark px-5 py-5 text-white cursor-pointer hover:drop-shadow-3xl hover:bg-buttonHover">
      <Link to={props.edit ? '/GodkjennProblem' : '/InspiserProblem'} onClick={onChange}>
        <section className="flex justify-between  items-center">
          <p className="font-bold text-left truncate max-w-[15ch]">{props.title}</p>

          <div className="flex flex-row items-center">
            <ODACircle style={statusColor} text={''} />
            <p className="whitespace-nowrap">
              {props.approved.toString() === 'true' ? props.status : 'Til vurdering'}
            </p>
          </div>
        </section>

        <section className="text-left pt-2.5 h-44">
          <p className="text-sm line-clamp-6">{props.specificProblem}</p>
        </section>

        <section className=" items-end flex flex-row justify-between text-xs">
          <div className="flex flex-row">
            <PersonalVideoIcon sx={{ fontSize: '1rem' }} />
            <p className="ml-1.5 whitespace-nowrap">{props.vendor}</p>
          </div>
          <p>&#x2022;</p>
          <div className="flex flex-row">
            <PeopleIcon sx={{ fontSize: '1rem' }} />
            <p className="ml-1.5 whitespace-nowrap">{props.subCount}</p>
          </div>
          <p>&#x2022;</p>
          <div className="flex flex-row">
            <LocationCityIcon sx={{ fontSize: '1rem' }} />
            <p className="ml-1.5 whitespace-nowrap truncate max-w-[20ch]">
              {props.owner.affiliation}
            </p>
          </div>
        </section>
      </Link>
    </div>
  )
}

export default ProblemCard
