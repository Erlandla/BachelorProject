import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addUser, findUser } from '../api/odaAPI'
import MenuItem from '@mui/material/MenuItem'
import {
  Alert,
  Box,
  Breadcrumbs,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Typography,
} from '@mui/material'

function RegisterUser() {
  //  consts for all fields, and success/error message states.
  const [newUserIsAdmin, setNewUserIsAdmin] = useState(false)
  const [affiliation, setAffiliation] = useState('')
  const [email, setEmail] = useState('')
  const [tlf, setTlf] = useState(NaN)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showRequiredMessage, setShowRequiredMessage] = useState(false)
  const [showUserExistMessage, setShowUserExistMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

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

  //  List of affiliation. Future work: put on DB and fetch.
  const affiliations = [
    {
      value: 'Trondheim kommune',
      label: 'Trondheim kommune',
    },
    {
      value: 'Malvik kommune',
      label: 'Malvik kommune',
    },
    {
      value: 'Trøndelag fylkeskommune',
      label: 'Trøndelag fylkeskommune',
    },
    {
      value: 'Steinkjer kommune',
      label: 'Steinkjer kommune',
    },
  ]

  // Handlers for changes in input.
  const handleAffiliationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAffiliation(event.target.value)
  }
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const handleTlfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTlf(event.target.valueAsNumber)
  }
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handlePasswordConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(event.target.value)
  }

  const handleSuccessClose = () => {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // for safari, chrome, edge, etc.
    setShowSuccessMessage(false)
  }

  const postProblem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    findUser(email, password)
      .then((r) => {
        if (r.data) {
          console.log('User allready exists')
          setShowUserExistMessage(true)
        } else {
          if (
            affiliation.length === 0 ||
            email.length === 0 ||
            tlf.toString().length !== 8 ||
            password.length === 0 ||
            password !== passwordConfirm
          ) {
            setShowRequiredMessage(true)
          } else {
            addUser(tlf, email, affiliation, password, newUserIsAdmin)
              .then(() => {
                console.log('User added')
                setAffiliation('')
                setEmail('')
                setTlf(NaN)
                setPassword('')
                setPasswordConfirm('')
                setShowSuccessMessage(true)
              })
              .catch(() => {
                setShowErrorMessage(true)
              })
          }
        }
      })
      .catch(() => {
        setShowErrorMessage(true)
      })
  }

  return (
    <div className="App">
      <div className="text-left ml-10 sm:ml-[5.25rem] mt-4">
        <Breadcrumbs aria-label="breadcrumb">
          <Link className={'hover:underline'} to="/Hjem">
            Hjem
          </Link>

          <Typography color="text.primary">Registrer ny bruker</Typography>
        </Breadcrumbs>
      </div>
      <main className="min-h-[82vh] flex flex-col items-center">
        <h1 className="text-center mt-10 text-2xl">Registrer ny bruker</h1>
        <section className="mt-5 flex flex-col">
          <Box
            component="form"
            onSubmit={(e) => {
              postProblem(e)
            }}
          >
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              className="mb-5"
              defaultValue="newChallenge"
              name="Brukertype"
              value={newUserIsAdmin}
              onChange={(e) => {
                setNewUserIsAdmin(e.target.value === 'true')
              }}
            >
              <FormControlLabel
                value={false}
                control={<Radio sx={{ '&.Mui-checked': { color: '#2BB728' } }} />}
                label="Vanlig bruker"
              />
              <FormControlLabel
                value={true}
                control={<Radio sx={{ '&.Mui-checked': { color: '#FF002F' } }} />}
                label="Administrator"
              />
            </RadioGroup>

            <section className="flex flex-col gap-4">
              <TextField
                data-cy="affiliation"
                select
                required
                label="Tilhørighet"
                size="medium"
                value={affiliation}
                onChange={handleAffiliationChange}
                sx={{ ...textFieldStyle, width: '50vw', maxWidth: '300px' }}
              >
                {affiliations.map((option) => (
                  <MenuItem data-cy={option.value} key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                data-cy="email"
                required
                label="E-post"
                size="medium"
                value={email}
                onChange={handleEmailChange}
                sx={{ ...textFieldStyle, width: '50vw', maxWidth: '300px' }}
              />
              <TextField
                data-cy="tlf"
                required
                label="Tlf"
                size="medium"
                type="number"
                value={tlf}
                onChange={handleTlfChange}
                sx={{ ...textFieldStyle, width: '50vw', maxWidth: '300px' }}
              />

              <TextField
                data-cy="password"
                required
                label="Passord"
                type="password"
                size="medium"
                value={password}
                onChange={handlePasswordChange}
                sx={{ ...textFieldStyle, width: '50vw', maxWidth: '300px' }}
              />

              <TextField
                data-cy="confirmPassword"
                required
                label="Bekreft passord"
                type="password"
                size="medium"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                sx={{ ...textFieldStyle, width: '50vw', maxWidth: '300px' }}
              />
            </section>
            <Button
              data-cy="send"
              variant="contained"
              type="submit"
              sx={{
                color: 'white',
                backgroundColor: '#0D264A',
                width: '180px',
                borderRadius: '45px',
                marginBottom: '2rem',
                marginTop: '1rem',
                '&:hover': {
                  backgroundColor: '#3d3f6b',
                },
              }}
            >
              <p className="whitespace-nowrap">Registrer bruker</p>
            </Button>
          </Box>
        </section>
      </main>

      <Snackbar
        data-cy="sucess"
        open={showSuccessMessage}
        autoHideDuration={2000}
        onClose={handleSuccessClose}
      >
        <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
          Ny bruker lagt til
        </Alert>
      </Snackbar>
      <Snackbar
        open={showUserExistMessage}
        autoHideDuration={4000}
        onClose={() => {
          setShowUserExistMessage(false)
        }}
      >
        <Alert
          onClose={() => {
            setShowUserExistMessage(false)
          }}
          severity="warning"
          sx={{ width: '100%' }}
        >
          Bruker finnes fra før!
        </Alert>
      </Snackbar>
      <Snackbar
        open={showRequiredMessage}
        autoHideDuration={4000}
        onClose={() => {
          setShowRequiredMessage(false)
        }}
      >
        <Alert
          onClose={() => {
            setShowRequiredMessage(false)
          }}
          severity="info"
          sx={{ width: '100%' }}
        >
          Fyll inn alle felter korrekt!
        </Alert>
      </Snackbar>
      <Snackbar
        open={showErrorMessage}
        autoHideDuration={6000}
        onClose={() => {
          setShowErrorMessage(false)
        }}
      >
        <Alert
          onClose={() => {
            setShowErrorMessage(false)
          }}
          severity="error"
          sx={{ width: '100%' }}
        >
          Det har skjedd en feil...
        </Alert>
      </Snackbar>
    </div>
  )
}

export default RegisterUser
