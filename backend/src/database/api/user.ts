import { get, update } from './endpoints'
import { user } from '../queries/user'

export const addUser = async (
  phone: number,
  email: string,
  affiliation: string,
  password: string,
  setAdmin: boolean
) => {
  return await update(
    user.addUser(phone, email, affiliation, password, setAdmin)
  )
}

export const findUser = async (email: string, password: string) => {
  return await get(user.findUser(email, password))
}

export const setAdmin = async (email: string, setAdmin: boolean) => {
  return await update(user.setAdmin(email, setAdmin))
}

export const subscribe = async (email: string, ODAProblem: string) => {
  return await update(user.subscribe(email, ODAProblem))
}

export const unsubscribe = async (email: string, ODAProblem: string) => {
  return await update(user.unsubscribe(email, ODAProblem))
}

export const isSubbed = async (email: string, ODAProblem: string) => {
  return await get(user.isSubbed(email, ODAProblem))
}

export const getUser = async (email: string) => {
  return await get(user.getUser(email))
}
