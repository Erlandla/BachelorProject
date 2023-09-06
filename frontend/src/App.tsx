import './index.css'
import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import MyProblems from './pages/MyProblems'
import Search from './pages/Search'
import ErrorPage from './pages/ErrorPage'
import UserProfile from './pages/UserProfile'
import RegisterUser from './pages/RegisterUser'
import InspectProblem from './pages/InspectProblem'
import AdminStaging from './pages/AdminStaging'
import ApproveProblem from './pages/ApproveProblem'
import EditProblem from './pages/EditProblem'
import NewProblem from './pages/NewProblem'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProblemProvider from './globalState/ProblemContext'
import Header from './components/Header'
import Footer from './components/Footer'
import { AdminProtectedRoute, LoginProtectedRoute } from './ProtectedRouting'

export default function App() {
  //  Finne på noe for redigerProblem. Bir egen bare

  return (
    <ProblemProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="Hjem" index element={<Home />} />
          <Route
            path="MinProfil"
            element={
              <LoginProtectedRoute>
                <UserProfile />
              </LoginProtectedRoute>
            }
          />
          <Route path="LoggInn" element={<Login />} />
          <Route
            path="RegistrerBruker"
            element={
              <AdminProtectedRoute>
                <RegisterUser />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="MineProblem"
            element={
              <LoginProtectedRoute>
                <MyProblems />
              </LoginProtectedRoute>
            }
          />
          <Route
            path="NyttProblem"
            element={
              <LoginProtectedRoute>
                <NewProblem />
              </LoginProtectedRoute>
            }
          />
          <Route
            path="Søk"
            element={
              <LoginProtectedRoute>
                <Search />
              </LoginProtectedRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Home />} />
          <Route
            path="GodkjennOversikt"
            element={
              <AdminProtectedRoute>
                <AdminStaging />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="InspiserProblem"
            element={
              <LoginProtectedRoute>
                <InspectProblem />
              </LoginProtectedRoute>
            }
          />
          <Route
            path="GodkjennProblem"
            element={
              <AdminProtectedRoute>
                <ApproveProblem />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="RedigerProblem"
            element={
              <LoginProtectedRoute>
                <EditProblem />
              </LoginProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ProblemProvider>
  )
}
