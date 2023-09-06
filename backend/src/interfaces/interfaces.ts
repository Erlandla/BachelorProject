interface OdaProblemParams {
  limit: number
  offset: number
  searchString: string
  category: string
  email: string
  relation: number
  approved: boolean
  similarProblem: string
  filter: string
}

interface AddOdaProblemParams {
  title: string
  specificProblem: string
  clearDataProduct: string
  accessibleData: string
  definedAction: string
  supplier: string
  userMail: string
  status: string
}

interface AddUserParams {
  phone: number
  email: string
  affiliation: string
  password: string
  admin: boolean
}

interface FindUserParams {
  email: string
  password: string
}

interface AddCategoriesParams {
  specProblem: string
  dataProduct: string
  accessibleData: string
  id: string
  approved: string
}

interface SetAdminParams {
  email: string
  setAdmin: string
}

interface SubscribeParams {
  email: string
  ODAProblem: string
}

interface CategoryParams {
  specificProblem: string[]
  dataProduct: string[]
  accessibleData: string[]
}

export {
  type OdaProblemParams,
  type AddOdaProblemParams,
  type AddCategoriesParams,
  type AddUserParams,
  type SetAdminParams,
  type SubscribeParams,
  type FindUserParams,
  type CategoryParams,
}
