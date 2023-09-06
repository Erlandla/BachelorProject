import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { findUser, getUserInfo } from '../api/odaAPI'
import { ProblemContext } from '../globalState/ProblemContext'
import { Alert, Snackbar } from '@mui/material'

function Login() {
  const { setUser } = useContext(ProblemContext)
  const navigate = useNavigate()
  const [showNoUser, setShowNoUser] = useState(false)

  const [email, setEmail] = useState(localStorage.getItem('Email') ?? '')
  const [password, setPassword] = useState(localStorage.getItem('Password') ?? '')
  const [ShowLoggedOutMessage, setShowLoggedOutMessage] = useState(
    localStorage.getItem('ShowLoggedOutMessage')
  )

  // Styling for mui components (sx)
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

  //  Handlers for input fields.
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  //  Handles successMessage closing.
  const handleClose = () => {
    localStorage.setItem('ShowLoggedOutMessage', 'false')
    setShowLoggedOutMessage('false')
  }

  const handleLogin = () => {
    findUser(email, password)
      .then((r) => {
        if (r.data) {
          localStorage.setItem('Email', email)
          localStorage.setItem('Password', password)
          getUserInfo(email)
            .then((userInfo) => {
              if (userInfo.data) {
                setUser({ ...userInfo.data, isLoggedIn: true })
              }
            })
            .catch(() => {
              setShowNoUser(true)
            })

          navigate('/Hjem')
        } else {
          setShowNoUser(true)
        }
      })
      .catch(() => {
        setShowNoUser(true)
      })
  }

  return (
    <div className="text-center">
      <main className="min-h-[82vh] flex flex-col items-center">
        <h1 className="text-center mt-28 text-2xl">Innlogging</h1>

        <section className="mt-10 flex flex-col">
          <section className="flex flex-col gap-4">
            <TextField
              data-cy="email"
              label="E-post"
              size="medium"
              value={email}
              onChange={handleEmailChange}
              sx={{ ...textFieldStyle, width: '50vw', maxWidth: '300px' }}
            />
            <TextField
              data-cy="password"
              label="Passord"
              type="password"
              size="medium"
              value={password}
              onChange={handlePasswordChange}
              sx={{ ...textFieldStyle, width: '50vw', maxWidth: '300px' }}
            />
            {showNoUser ? <p className="mt-0 text-statusRed">Ingen bruker funnet</p> : null}
          </section>
        </section>

        <Button
          data-cy="logginButton"
          variant="contained"
          onClick={handleLogin}
          sx={{
            color: 'white',
            backgroundColor: '#0D264A',
            width: '150px',
            borderRadius: '45px',
            marginBottom: '2rem',
            marginTop: '1rem',
            '&:hover': {
              backgroundColor: '#3d3f6b',
            },
          }}
        >
          Logg inn
        </Button>
      </main>

      <Snackbar
        open={ShowLoggedOutMessage === 'true'}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Logg ut vellykket
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Login
