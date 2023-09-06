import React, { useContext, useEffect, useState } from 'react'
import { ProblemContext } from '../globalState/ProblemContext'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { type IfetchType } from '../types/types'
import ProblemCard from '../components/ProblemCard'
import { Breadcrumbs, CircularProgress, Typography } from '@mui/material'

function MyProblems() {
  const [isMyProblems, setIsMyProblems] = useState(true)
  const { user } = useContext(ProblemContext)
  const [searchPhrase] = useState('')
  const [orderBy] = useState('Løst')
  const [categoryFilter] = useState('')
  const [limit] = useState(60)

  //  Sets which page the user is on. Used on InspectChallenge for breadcrumbs.
  useEffect(() => {
    localStorage.setItem('lastMyProblems', 'true')
  }, [])

  // initial IfetchType object
  const querySearch: IfetchType = {
    limit,
    categoryFilter,
    searchPhrase,
    orderBy,
    email: user.email,
    relation: 1,
  }

  const [query, setQuery] = useState<IfetchType>(querySearch)
  const [page] = useState(0)
  const { isLoading, isError, ODAproblems } = useFetch(query, page)

  const fetchODAproblems = (
    limit: number,
    categoryFilter: string,
    searchPhrase: string,
    orderBy: string,
    relation: number
  ) => {
    const newQuery: IfetchType = {
      limit,
      categoryFilter,
      searchPhrase,
      orderBy,
      email: user.email,
      relation,
    }
    setQuery(newQuery)
  }

  const handleProblemShow = (value: boolean) => {
    setIsMyProblems(value)
    fetchODAproblems(limit, searchPhrase, categoryFilter, orderBy, value ? 1 : 0)
  }

  return (
    <div className="text-center">
      <div className="text-left ml-10 sm:ml-[5.25rem] mt-4">
        <Breadcrumbs aria-label="breadcrumb">
          <Link className={'hover:underline'} to="/Hjem">
            Hjem
          </Link>
          <Link className={'hover:underline'} to="/MinProfil">
            Min profil
          </Link>
          <Typography color="text.primary">Mine problem</Typography>
        </Breadcrumbs>
      </div>
      <div className="flex flex-col items-center min-h-[82vh]">
        <div className="flex flex-row text-center gap-1 mt-10">
          <div
            onClick={() => {
              handleProblemShow(true)
            }}
            className={
              isMyProblems
                ? 'cursor-pointer text-white py-2 px-5 rounded-l-3xl bg-buttonHover border-y-4 border-l-4 border-buttonDark text-lg w-40 sm:w-60 sm:drop-shadow-3xl'
                : 'cursor-pointer text-white py-2 px-5 rounded-l-3xl bg-buttonDark border-y-4 border-l-4 border-buttonDark w-40 sm:w-60 hover:bg-buttonHover'
            }
          >
            Mine problem
          </div>
          <div
            data-cy="subscribedProblems"
            onClick={() => {
              handleProblemShow(false)
            }}
            className={
              !isMyProblems
                ? 'cursor-pointer text-white py-2 px-5 rounded-r-3xl bg-buttonHover text-bold border-y-4 border-r-4 border-buttonDark text-lg w-40 sm:w-60 sm:drop-shadow-3xl'
                : 'cursor-pointer bg-buttonDark border-y-4 border-r-4 border-buttonDark text-white py-2 px-5 rounded-r-3xl w-40 sm:w-60 hover:bg-buttonHover'
            }
          >
            Abonnerte problem
          </div>
        </div>

        {isLoading ? (
          <div className="justify-center mt-20">
            <CircularProgress sx={{ color: '#0D264A' }} />
          </div>
        ) : isError ? (
          <div className="text-center justify-center mt-20">
            <h1>En feil har oppstått...</h1>
          </div>
        ) : ODAproblems.length < 1 ? (
          isMyProblems ? (
            <p className="mt-20">Du har ingen problem...</p>
          ) : (
            <p className="mt-20">Du har ingen abonnerte problem...</p>
          )
        ) : (
          <div className="flex flex-wrap justify-center overflow gap-4 my-5">
            {ODAproblems.map((data) => (
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
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyProblems
