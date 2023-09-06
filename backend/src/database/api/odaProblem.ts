import { get, update } from './endpoints'
import { odaProblem } from '../queries/odaProblem'
import axios from 'axios'

export const getODAProblems = async (
  limit: number,
  offset: number,
  searchString: string,
  category: string,
  email?: string,
  relation?: number,
  approved?: boolean,
  similarProblem?: string,
  filter?: number
) => {
  return await get(
    odaProblem.getODAProblems(
      limit,
      offset,
      searchString,
      category,
      email,
      relation,
      approved,
      similarProblem,
      filter
    )
  )
}

export const getODAProblemsAdminInfo = async () => { 
  return await get(
    odaProblem.getODAProblemsAdminInfo()
  )
}

export const addODAProblem = async (
  title: string,
  specificProblem: string,
  clearDataProduct: string,
  accessibleData: string,
  definedAction: string,
  supplier: string,
  userMail: string,
  status: string
) => {
  // Assumes title is unique, otherwise we could end up in a situation where a single ODA problem can have many accessible datas etc.
  // Eventually add a check for thiss
  // Query will also need to update which user has made the query etc.
  const nodeName: string = title.replace(/\s/g, '')
  return await update(
    odaProblem.addODAProblem(
      nodeName,
      title,
      specificProblem,
      clearDataProduct,
      accessibleData,
      definedAction,
      supplier,
      userMail,
      status
    )
  )
}
export const deleteODAProblem = async (title: string) => {
  return await update(odaProblem.deleteODAProblem(title))
}

export const addCategories = async (
  specProblem: string,
  dataProduct: string,
  accessibleData: string,
  nodeName: string,
  approved: string
) => {
  const q1 = update(
    odaProblem.addInference(specProblem, dataProduct, accessibleData, nodeName)
  )
  const q2 = update(
    odaProblem.addCategories(
      specProblem,
      dataProduct,
      accessibleData,
      nodeName,
      approved === 'true'
    )
  )
  return await axios.all([q1, q2])
}

export const updateODAProblem = async (
  id: string,
  vendor: string,
  progress: string,
  title: string,
  specificProblem: string,
  clearDataProduct: string,
  accessibleData: string,
  definedAction: string
) => {
  return await update(
    odaProblem.updateODAProblem(
      id,
      vendor,
      progress,
      title,
      specificProblem,
      clearDataProduct,
      accessibleData,
      definedAction
    )
  )
}

export const getSubscribers = async (ODAProblem: string) => {
  return await get(odaProblem.getSubscribers(ODAProblem))
}