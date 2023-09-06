import Button from '@mui/material/Button'
import React, { useContext, useEffect, useState } from 'react'
import ODACircle from '../components/ODACircle'
import { type IfetchType, Status, type User } from '../types/types'
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo'
import PeopleIcon from '@mui/icons-material/People'
import SubInfoComponent from '../components/SubInfoComponent'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import EditIcon from '@mui/icons-material/Edit'
import { ProblemContext } from '../globalState/ProblemContext'
import { Link } from 'react-router-dom'
import { getSubscribers, isSubscribed, subscribe } from '../api/odaAPI'
import { Breadcrumbs, Typography } from '@mui/material'
import useFetch from '../hooks/useFetch'
import ProblemCard from '../components/ProblemCard'

function InspectProblem() {
  const [subs, setSubs] = useState<User[]>([])
  const [isSubbed, setIsSubbed] = useState(false)
  const [statusColor, setStatusColor] = useState(
    'rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusRed'
  )
  const [showSimilarProblems, setShowSimilarProblems] = useState(false)
  //  State for the last page. Used for breadcrumbs.
  const [lastMyProblems] = useState(localStorage.getItem('lastMyProblems'))
  const { user, problem } = useContext(ProblemContext)

  // Inital search query.
  const querySearch: IfetchType = {
    limit: 40,
    categoryFilter: '',
    searchPhrase: '',
    orderBy: '',
    approved: true,
    similarProblem: problem.id,
  }

  const [query] = useState<IfetchType>(querySearch)
  const { ODAproblems } = useFetch(query, 0)
  //  Updates subs and status.
  useEffect(() => {
    setSubs([])

    //  Changes the color theme of the status circle.
    switch (problem.status) {
      case Status.newProblem:
        setStatusColor('rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusRed')
        break

      case Status.started:
        setStatusColor('rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusOrange')
        break

      case Status.solved:
        setStatusColor('rounded-full flex items-center justify-center h-4 w-4 mr-2 bg-statusGreen')
        break
    }

    //  Adds all subs of a problem to the subs Array.
    getSubscribers(problem.id)
      .then((r) => {
        console.log(r.data)
        setSubs(r.data)
      })
      .catch(() => {})
    isSubscribed(problem.id, user.email)
      .then((r) => {
        if (r.data) {
          console.log(r)
          setIsSubbed(true)
        }
      })
      .catch(() => {
        setIsSubbed(false)
      })
  }, [problem])

  //  Handles similarProblems show
  const handleSimilarProblemsShow = () => {
    setShowSimilarProblems(!showSimilarProblems)
  }

  //  updates database of subs
  const handleSubClick = () => {
    if (isSubbed) {
      subscribe(problem.id, user.email, false)
        .then(() => {
          setIsSubbed(false)
          getSubscribers(problem.id)
            .then((r) => {
              console.log(r.data)
              setSubs(r.data)
            })
            .catch(() => {})
        })
        .catch(() => '')
    } else {
      subscribe(problem.id, user.email, true)
        .then(() => {
          setIsSubbed(true)
          getSubscribers(problem.id)
            .then((r) => {
              console.log(r.data)
              setSubs(r.data)
            })
            .catch(() => {})
        })
        .catch(() => '')
    }
  }

  return (
    <div className="App">
      <div className="bg-background flex flex-col">
        <div className="text-left ml-10 sm:ml-[5.25rem] mt-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link className={'hover:underline'} to="/Hjem">
              Hjem
            </Link>
            <Link
              className={'hover:underline'}
              to={lastMyProblems === 'true' ? '/MineProblem' : '/Søk'}
            >
              {lastMyProblems === 'true' ? 'Mine problem' : 'Søk'}
            </Link>

            <Typography color="text.primary">{problem.title}</Typography>
          </Breadcrumbs>
        </div>

        <div className="items-center justify-center flex flex-col">
          <div className="text-text px-5 py-3 w-full items-center justify-center flex flex-col mb-5">
            <div className="flex flex-row gap-4 items-center mb-2.5">
              <h1 className="text-4xl">{problem.title}</h1>
              {user.isAdmin.toString() === 'true' || problem.owner.email === user.email ? (
                <Link to={'/RedigerProblem'}>
                  <EditIcon
                    data-cy ="editIcon"
                    sx={{
                      fontSize: '2rem',
                      '&:hover': {
                        backgroundColor: '#3d3f6b',
                        color: 'white',
                        borderRadius: '5px',
                      },
                    }}
                  />
                </Link>
              ) : null}
            </div>

            <section className=" items-end flex flex-row justify-between text-xs mb-1.5 gap-2">
              <div className="flex flex-row">
                <PersonalVideoIcon sx={{ fontSize: '1rem' }} />
                <p className="ml-1.5 whitespace-nowrap">{problem.vendor}</p>
              </div>

              <div className="flex flex-row">
                <PeopleIcon sx={{ fontSize: '1rem' }} />
                <p className="ml-1.5 whitespace-nowrap">{subs.length}</p>
              </div>

              <div className="flex flex-row">
                <LocationCityIcon sx={{ fontSize: '1rem' }} />
                <p className="ml-1.5 whitespace-nowrap">{problem.owner.affiliation}</p>
              </div>
            </section>

            <div className="flex flex-row items-center">
              <ODACircle style={statusColor} text={''} />
              <p className="whitespace-nowrap">{problem.status}</p>
            </div>
          </div>

          <div>
            <div data-cy = "spesificProblem" className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center">
              <ODACircle
                style={
                  'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA1'
                }
                text={'Spesifikt problem'}
              />
              <p className="w-[62vw] sm:w-[45vw] h-100% text-text text-xs sm:text-base text-left pl-4 sm:pl-8">
                {problem.specificProblem}
              </p>
            </div>

            <div data-cy ="dataProduct" className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center">
              <ODACircle
                style={
                  'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA2'
                }
                text={'Dataprodukt'}
              />
              <p className="w-[62vw] sm:w-[45vw] h-100% text-text text-xs sm:text-base text-left pl-4 sm:pl-8">
                {problem.clearDataProduct}
              </p>
            </div>

            <div data-cy = "accesibleData" className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center">
              <ODACircle
                style={
                  'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA3'
                }
                text={'Data'}
              />
              <p className="w-[62vw] sm:w-[45vw] h-100% text-text text-xs sm:text-base text-left pl-4 sm:pl-8">
                {problem.accessibleData}
              </p>
            </div>

            <div data-cy ="definedAction" className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center">
              <ODACircle
                style={
                  'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA4'
                }
                text={'Definert handling'}
              />
              <p className="w-[62vw] sm:w-[45vw] h-100% text-text text-xs sm:text-base text-left pl-4 sm:pl-8">
                {problem.definedAction}
              </p>
            </div>
          </div>

          <Button
            variant="contained"
            onClick={handleSimilarProblemsShow}
            sx={{
              color: 'white',
              backgroundColor: '#0D264A',
              width: '250px',
              borderRadius: '45px',
              '&:hover': { backgroundColor: '#3d3f6b' },
            }}
          >
            {' '}
            {showSimilarProblems ? 'Lukk lignende problem' : 'Vis lignende problem'}
          </Button>

          {showSimilarProblems ? (
            <div className="my-8 w-[60vw]">
              <div
                className={
                  ODAproblems.length > 1
                    ? 'bg-white flex px-4 py-2 flex-nowrap overflow-auto gap-4'
                    : 'text-center'
                }
              >
                {ODAproblems.length > 1 ? (
                  ODAproblems.map((data) => {
                    return data.id !== problem.id ? (
                      <ProblemCard
                        key={data.id}
                        id={data.id}
                        title={data.title}
                        vendor={data.vendor.substring(20)}
                        status={data.status}
                        specificProblem={data.specificProblem}
                        clearDataProduct={data.clearDataProduct}
                        accessibleData={data.accessibleData}
                        definedAction={data.definedAction}
                        subCount={data.subCount}
                        owner={data.owner}
                        subs={data.subs}
                        edit={false}
                        approved={data.approved}
                      />
                    ) : null
                  })
                ) : (
                  <p>Ingen lignende problem funnet!</p>
                )}
              </div>
            </div>
          ) : null}

          <div
            data-cy="contactContainer"
            className="flex flex-row w-[60vw] 3xl:w-[57vw] 4xl:w-[54vw] mt-10 mb-5 items-center justify-center"
          >
            <div className="flex flex-col text-left gap-1 ">
              <h2 className="text-text underline underline-offset2 text-2xl">Kontaktinformasjon</h2>

              <div className="flex flex-row items-center gap-1 text-xs sm:text-base">
                <LocationCityIcon sx={{ fontSize: '1rem' }} />
                {problem.owner.affiliation}
              </div>
              <div className="flex flex-row items-center gap-1 text-xs sm:text-base">
                <EmailIcon sx={{ fontSize: '1rem' }} />
                {problem.owner.email}
              </div>
              <div className="flex flex-row items-center gap-1 text-xs sm:text-base">
                <PhoneIcon sx={{ fontSize: '1rem' }} />
                +47 {problem.owner.telephone}
              </div>
            </div>
            <div className="w-[60vw] pl-4 sm:pl-8"></div>
          </div>

          <div className="flex flex-col w-[60vw] 3xl:w-[57vw] 4xl:w-[54vw] text-left mb-5 gap-1">
            <div className="mt-5 flex flex-row flex-wrap gap-2 mb-2 items-center justify-between">
              <h1
                data-cy="subcount"
                className="text-text underline underline-offset2 text-2xl flex flex-row items-center whitespace-nowrap"
              >
                <PeopleIcon
                  sx={{
                    fontSize: '2rem',
                    marginRight: '0.5rem',
                  }}
                />
                {subs.length} har samme problem
              </h1>
              {user.email === problem.owner.email ? null : (
                <Button
                  data-cy="subscribeBtn"
                  variant="contained"
                  onClick={handleSubClick}
                  sx={{
                    color: 'white',
                    backgroundColor: '#0D264A',
                    width: '200px',
                    borderRadius: '45px',
                    '&:hover': { backgroundColor: '#3d3f6b' },
                  }}
                >
                  {' '}
                  {isSubbed ? 'Fjern fra listen' : 'Abonner'}
                </Button>
              )}
            </div>

            {subs.map((userprops: User) => (
              <div key={userprops.email}>
                <SubInfoComponent {...userprops} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InspectProblem
