import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { type IfetchType } from '../types/types'
import useFetch from '../hooks/useFetch'
import ProblemCard from '../components/ProblemCard'
import { Breadcrumbs, CircularProgress, Typography } from '@mui/material'

function AdminStaging() {
  //  Consts for search/fetching query. orderBY is not implemented yet (future work).
  const [searchPhrase] = useState('')
  const [orderBy] = useState('Løst')
  const [categoryFilter] = useState('')
  const [limit] = useState(20)

  // initial IfetchType object
  const querySearch: IfetchType = {
    limit,
    categoryFilter,
    searchPhrase,
    orderBy,
    approved: false,
  }

  const [query, setQuery] = useState<IfetchType>(querySearch)
  const [page] = useState(0)
  const { isLoading, isError, ODAproblems } = useFetch(query, page)

  useEffect(() => {
    setQuery(querySearch)
  }, [])

  return (
    <div className="text-center">
      <div className="text-left ml-10 sm:ml-[5.25rem] mt-4">
        <Breadcrumbs aria-label="breadcrumb">
          <Link className={'hover:underline'} to="/Hjem">
            Hjem
          </Link>

          <Typography color="text.primary">Godkjenn problem</Typography>
        </Breadcrumbs>
      </div>
      <div className="flex flex-col items-center min-h-[82vh]">
        <h1 className="text-3xl text-text p-5">Godkjenn problem</h1>

        {isLoading ? (
          <div className="justify-center mt-20">
            <CircularProgress sx={{ color: '#0D264A' }} />
          </div>
        ) : isError ? (
          <div className="text-center justify-center mt-20">
            <h1>En feil har oppstått...</h1>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center overflow gap-4 my-5">
            {ODAproblems.length > 0 ? null : <p>Ingen problem som påventer godkjenning</p>}
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
                edit={true}
                approved={data.approved}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminStaging
