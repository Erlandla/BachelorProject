import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'
import CategoryButton from '../components/CategoryButton'
import ProblemCard from '../components/ProblemCard'
import useFetch from '../hooks/useFetch'
import type { IfetchType } from '../types/types'
import CircularProgress from '@mui/material/CircularProgress'
import { Link } from 'react-router-dom'
import { Breadcrumbs, Typography } from '@mui/material'

function Search() {
  //  consts/states for search query.
  const [searchPhrase, setSearch] = useState('')
  const [orderBy] = useState('Løst')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [filterBy, setFilterBy] = useState(Number(localStorage.getItem('searchFilter')) || 0)
  //  Infinite scroll. Future work.
  const [limit] = useState(60)

  //  List of filters.
  const filters = [
    {
      value: 0,
      label: 'Alle',
    },
    {
      value: 3,
      label: 'Løst',
    },
    {
      value: 2,
      label: 'påbegynnt',
    },
    {
      value: 1,
      label: 'Uløst',
    },
  ]

  //  Styling for mui components (sx).
  const textFieldStyle = {
    backgroundColor: 'white',
    '& label.Mui-focused': {
      color: '#0D264A',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#0D264A',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0D264A',
      },
    },
  }

  // initial IfetchType object
  const querySearch: IfetchType = {
    limit,
    categoryFilter,
    searchPhrase,
    orderBy,
    approved: true,
    filter: filterBy,
  }

  const [query, setQuery] = useState<IfetchType>(querySearch)
  const [page, setPage] = useState(0)
  const { isLoading, isError, ODAproblems, ODAproblemsLength } = useFetch(query, page)

  useEffect(() => {
    //  Sets which page the user is on. Used on InspectChallenge for breadcrumbs.
    localStorage.setItem('lastMyProblems', 'false')

    const newQuery: IfetchType = {
      limit,
      categoryFilter,
      searchPhrase,
      orderBy,
      approved: true,
      filter: filterBy,
    }
    setQuery(newQuery)
  }, [limit, categoryFilter, searchPhrase, orderBy, filterBy])

  //  Handle events for changes in search inputs. Also timer to delay fetching, environmentally friendly.
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer)

    const newTimer = setTimeout(() => {
      setSearch(event.target.value)
    }, 500)
    setTimer(newTimer)
    setPage(0)
  }

  //  Handle event changes for filter.
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0)
    setFilterBy(parseInt(event.target.value))
  }

  //  Handle event for category changes.
  const handleCategoryButtonClick = (value: string) => {
    setPage(0)
    if (categoryFilter === value) {
      setCategoryFilter('')
    } else {
      setCategoryFilter(value)
    }
  }

  return (
    <div className="App">
      <div className="bg-background flex flex-col mb-5 min-h-screen">
        <div className="text-left ml-10 sm:ml-[5.25rem] mt-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link className={'hover:underline'} to="/Hjem">
              Hjem
            </Link>

            <Typography color="text.primary">Søk</Typography>
          </Breadcrumbs>
        </div>

        <div className="items-center ">
          <div className="flex flex-col mt-5 items-center">
            <div className="flex flex-row gap-1">
              <TextField
                id="outlined-required"
                label="Søk"
                size="small"
                onChange={handleSearchChange}
                sx={{ ...textFieldStyle, width: '60vw', maxWidth: '375px' }}
              />

              <TextField
                select
                label="Filter"
                size="small"
                value={filterBy}
                defaultValue={'Alle'}
                onChange={handleFilterChange}
                sx={{ ...textFieldStyle, width: '20vw', maxWidth: '125px' }}
              >
                {filters.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="flex flex-row flex-nowrap overflow-auto gap-2 my-5 h-12 w-[80vw] sm:w-[500px] no-scrollbar">
              <CategoryButton
                text={'Lisens'}
                focused={categoryFilter}
                onClick={handleCategoryButtonClick}
              />
              <CategoryButton
                text={'Økonomi'}
                focused={categoryFilter}
                onClick={handleCategoryButtonClick}
              />
              <CategoryButton
                text={'Skole'}
                focused={categoryFilter}
                onClick={handleCategoryButtonClick}
              />
              <CategoryButton
                text={'Data'}
                focused={categoryFilter}
                onClick={handleCategoryButtonClick}
              />
              <CategoryButton
                text={'Faktura'}
                focused={categoryFilter}
                onClick={handleCategoryButtonClick}
              />
              <CategoryButton
                text={'Forvaltning'}
                focused={categoryFilter}
                onClick={handleCategoryButtonClick}
              />
            </div>
            <p className="">{ODAproblemsLength} treff</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center mt-20">
              <CircularProgress sx={{ color: '#0D264A' }} />
            </div>
          ) : isError ? (
            <div className="text-center justify-center mt-20">
              <h1>En feil har oppstått...</h1>
            </div>
          ) : ODAproblems.length < 1 ? (
            <div className="text-center justify-center mt-20">
              <h1>Ingen dataproblem funnet!</h1>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center overflow gap-4 mt-5">
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
    </div>
  )
}

export default Search
