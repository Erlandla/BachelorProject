export enum Status {
  newProblem = 'Nytt problem',
  started = 'Påbegynnt',
  solved = 'Løst',
}

export interface User {
  email: string
  telephone: string
  affiliation: string
}

export interface ContextUser {
  email: string
  password: string
  affiliation: string
  telephone: string
  isLoggedIn: boolean
  isAdmin: boolean
}

export interface ProblemCardProps {
  id: string
  title: string
  vendor: string
  status: Status
  specificProblem: string
  clearDataProduct: string
  accessibleData: string
  definedAction: string
  subCount: number
  owner: User
  subs: User[]
  edit: boolean
  approved: boolean
}

export interface IfetchType {
  limit: number
  searchPhrase: string
  categoryFilter: string
  orderBy: string
  email?: string
  relation?: number
  approved?: boolean
  similarProblem?: string
  filter?: number
}

export interface IfetchTypeMyProblems {
  limit: number
  searchPhrase: string
  categoryFilter: string
  orderBy: string
  email?: string
  relation?: number
}

export interface Categories {
  specificProblem: string[]
  accessibleData: string[]
  dataProduct: string[]
}

export interface AdminInfo {
  title: string
  count: number
  link: string
}
