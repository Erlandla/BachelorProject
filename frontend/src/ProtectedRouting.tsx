import React, { useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ProblemContext } from './globalState/ProblemContext'
import { findUser, getUserInfo } from './api/odaAPI'

interface Props {
  children: JSX.Element
}

export const AdminProtectedRoute = ({ children }: Props) => {
  const { user } = useContext(ProblemContext)
  if (user.isAdmin.toString() === 'true') {
    //  returns page component.
    return children
  }
  // user is not admin. Redirects to login.
  return <Navigate to="/LoggInn" />
}

//  Not ideal way to do it, becuase it will every time return the children, but navigates away after if not logged in.
//  Its fast, thats why one is not able to look at the child page.
//  And it makes it possible to remove the useEffect used below on every page. No security requirements, so it is good enough.
export const LoginProtectedRoute = ({ children }: Props) => {
  const { user, setUser } = useContext(ProblemContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.isLoggedIn) {
      const email = localStorage.getItem('Email') ?? ''
      const password = localStorage.getItem('Password') ?? ''
      findUser(email, password)
        .then((r) => {
          if (r.data) {
            getUserInfo(email)
              .then((userInfo) => {
                if (userInfo.data) {
                  setUser({ ...userInfo.data, isLoggedIn: true })
                }
              })
              .catch(() => {
                // user is not logged in. Some error occured.
                document.body.scrollTop = 0 // For Safari
                document.documentElement.scrollTop = 0 // for safari, chrome, edge, etc.
                navigate('/LoggInn')
              })
          } else {
            setUser({
              email: '',
              password: '',
              affiliation: '',
              telephone: '',
              isLoggedIn: false,
              isAdmin: false,
            })
            // user is not logged in.
            document.body.scrollTop = 0 // For Safari
            document.documentElement.scrollTop = 0 // for safari, chrome, edge, etc.
            navigate('/LoggInn')
          }
        })
        .catch(() => {
          // user is not logged in. Some error occured.
          document.body.scrollTop = 0 // For Safari
          document.documentElement.scrollTop = 0 // for safari, chrome, edge, etc.
          navigate('/LoggInn')
        })
    }
  }, [])
  return children
}
