import { useState, useEffect, useCallback } from 'react'
import { getOdaProblems } from '../api/odaAPI'
import type { IfetchType, ProblemCardProps } from '../types/types'

function useFetch(query: IfetchType, offset: number) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [ODAproblems, setODAproblems] = useState<ProblemCardProps[]>([])
  const [ODAproblemsLength, setODAProblemsLength] = useState(0)

  const sendQuery = useCallback(
    async (query: IfetchType) => {
      setIsLoading(true)
      let multiplier = 2
      if (offset === 0) {
        multiplier = 1
      }

      getOdaProblems(
        offset,
        query.limit * multiplier,
        query.categoryFilter,
        query.searchPhrase,
        query.email,
        query.relation,
        query.approved,
        query.similarProblem,
        query.filter
      )
        .then((res) => {
          setODAproblems(res.data)
          setODAProblemsLength(res.data.length)
        })
        .catch(() => {
          setIsError(true)
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
    [offset]
  )

  useEffect(() => {
    sendQuery(query).catch(() => {
      setIsError(true)
    })
  }, [query, sendQuery, offset])

  return { isLoading, isError, ODAproblems, ODAproblemsLength }
}

export default useFetch
