import React from 'react'
import { createContext, type Dispatch, type SetStateAction, type ReactNode, useState } from 'react'
import { type ProblemCardProps, Status, type User, type ContextUser } from '../types/types'

export interface ProblemContextInterface {
  problem: ProblemCardProps
  setProblem: Dispatch<SetStateAction<ProblemCardProps>>

  user: ContextUser
  setUser: Dispatch<SetStateAction<ContextUser>>
}

const initialUser: User = {
  email: '-',
  telephone: '-',
  affiliation: '-',
}

const initialSubs = [initialUser]

const initialProblemCard: ProblemContextInterface = {
  problem: {
    id: '',
    title: '',
    system: '',
    status: Status.newProblem,
    specificProblem: '',
    clearDataProduct: '',
    accessibleData: '',
    definedAction: '',
    subCount: 0,
    owner: initialUser,
    subs: initialSubs,
  },
  setProblem: (_problem: ProblemCardProps) => {},

  user: {
    email: '-',
    password: '-',
    affiliation: '-',
    telephone: '-',
    isLoggedIn: false,
    isAdmin: false,
  },
  setUser: (_user: ContextUser) => {},
} as any // as ProblemContextInferface
// Which had an eslint error Always prefer const x: T = { ... }. the assertion to any is ignored by objectLiteralTypeAssertions.
// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-type-assertions.md

export const ProblemContext = createContext(initialProblemCard)

interface ProblemProviderProps {
  children: ReactNode
}

export default function ProblemProvider({ children }: ProblemProviderProps) {
  const [user, setUser] = useState({
    email: '',
    password: '',
    affiliation: '',
    telephone: '',
    isLoggedIn: false,
    isAdmin: false,
  })

  const [problem, setProblem] = useState<ProblemCardProps>({
    id: '',
    title: 'Tittel',
    vendor: '',
    status: Status.newProblem,
    specificProblem: '',
    clearDataProduct: '',
    accessibleData: '',
    definedAction: '',
    subCount: 0,
    owner: initialUser,
    subs: initialSubs,
    edit: false,
    approved: false,
  })

  return (
    <ProblemContext.Provider value={{ problem, setProblem, user, setUser }}>
      {children}
    </ProblemContext.Provider>
  )
}
