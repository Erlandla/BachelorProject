import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import ODACircle from '../components/ODACircle'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useNavigate, Link } from 'react-router-dom'
import { ProblemContext } from '../globalState/ProblemContext'
import Box from '@mui/material/Box'
import { addOdaProblem, getVendors } from '../api/odaAPI'
import {
  Alert,
  Breadcrumbs,
  Snackbar,
  Tooltip,
  type TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from '@mui/material'

function NewProblem() {
  //  consts for all fields. Also states for success/error-messages.
  const { user } = useContext(ProblemContext)
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [system, setSystem] = useState('')
  const [otherSystem, setOtherSystem] = useState('')
  const [otherSystemShow, setOtherSystemShow] = useState(false)
  const [status, setStatus] = useState('newChallenge')
  const [specificProblem, setSpecificProblem] = useState('Problemet vårt er at ')
  const [clearDataProduct, setClearDataProduct] = useState('Hvis vi kunne sett/hvis vi visste ')
  const [accessibleData, setAccessibleData] = useState('Ved å bruke disse datasettene ')
  const [definedAction, setDefinedAction] = useState('For å løse dette vil vi ')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const checkSystem = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSystem(event.target.value)
    if (event.target.value === 'Annet system') {
      setOtherSystemShow(true)
    } else {
      setOtherSystemShow(false)
    }
  }

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

  //  Helper text for the tooltip components.
  const statusHelpText = `Nytt problem: problemet er nettopp oppdaget og/eller aldri arbeidet med.
                          Påbegynnt: problemet arbeides med.
                          Løst: det er blitt laget en løsning for problemet. `

  const specificProblemHelpText = `Problemet vårt er at … [sett inn spesifikk problemstilling].
                                   F.eks. Problemet vårt problem er at det er mange lisenser som ikke brukes,
                                  men som likevel koster penger for enhetene.`

  const dataProductHelpText = `Hvis vi kunne sett/Hvis vi visste… [sett inn hva dataproduktet viser].
                               F.eks. Hvis vi kunne sett hvilke lisenser som ikke er i bruk og synliggjøre kostnadene som tabell,`

  const accessibleDataHelpText = `Ved å bruke disse datasettene… [sett inn hva datasettene du planlegger å bruke].
                                 F.eks. Ved å bruke rapporter på kostnader, liste med lisenser og liste over reell bruk av programmet,`

  const definedActionHelpText = `For å løse dette vil vi … [liste over tiltak du ønsker å implementere].
                                 F.eks. For å løse dette vil vi frigjøre lisenser vi allerede har betalt for og som kan gjenbrukes av andre,
                                 og bevisstgjøre enhetsledere på kostnaden ved lisenser.`

  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 400,
    },
  })

  //  List of systems available.
  const [systems, setSystems] = useState<string[]>()
  useEffect(() => {
    getVendors()
      .then((r) => {
        setSystems(r.data)
      })
      .catch(() => {
        setSystems([])
      })
  }, [])

  const handleSuccessClose = () => {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // for safari, chrome, edge, etc.
    setShowSuccessMessage(false)
    navigate('/Hjem')
  }

  const postProblem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addOdaProblem(
      title,
      specificProblem,
      clearDataProduct,
      accessibleData,
      definedAction,
      system,
      user.email,
      status
    )
      .then(() => {
        console.log('ODAproblem posted succesfully')
        setShowSuccessMessage(true)
      })
      .catch(() => {
        console.log('Failure posting ODAproblem')
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

          <Typography color="text.primary">Nytt problem</Typography>
        </Breadcrumbs>
      </div>

      <Box
        component="form"
        onSubmit={(e) => {
          postProblem(e)
        }}
        className="bg-background flex flex-col items-center"
      >
        <h1 className="text-3xl text-text p-5">Nytt problem!</h1>

        <TextField
          data-cy="title"
          required
          id="outlined-required"
          label="Tittel"
          size="small"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          sx={{
            ...textFieldStyle,
            width: '60vw',
            maxWidth: '350px',
          }}
        />

        <TextField
          data-cy="system"
          select
          required
          label="System"
          name="system"
          size="small"
          value={system}
          onChange={checkSystem}
          sx={{
            ...textFieldStyle,
            width: '60vw',
            maxWidth: '350px',
            marginTop: '10px',
          }}
        >
          {systems?.map((option) => (
            <MenuItem data-cy={option} key={option} value={option}>
              {option}
            </MenuItem>
          ))}
          <MenuItem data-cy="otherSystem" key="Annet system" value="Annet system">
            Annet System
          </MenuItem>
        </TextField>
        {otherSystemShow ? (
          <TextField
            required
            id="outlined-required"
            label="Annet system"
            size="small"
            value={otherSystem}
            name="otherSystem"
            onChange={(e) => {
              setSystem(e.target.value)
              setOtherSystem(e.target.value)
            }}
            sx={{
              backgroundColor: 'white',
              width: '60vw',
              maxWidth: '350px',
              marginTop: '10px',
            }}
          />
        ) : (
          <div></div>
        )}

        <FormLabel id="demo-radio-buttons-group-label" className="mt-5">
          Status på problemet
          <CustomWidthTooltip title={statusHelpText}>
            <HelpOutlineIcon
              sx={{
                marginLeft: '0.25rem',
                marginTop: '-0.1rem',
                fontSize: 'medium',
                '&:hover': { cursor: 'pointer' },
              }}
            />
          </CustomWidthTooltip>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          className="mb-5"
          defaultValue="newChallenge"
          name="status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
          }}
        >
          <FormControlLabel
            value="newChallenge"
            control={<Radio sx={{ '&.Mui-checked': { color: '#FF002F' } }} />}
            label="Nytt problem"
          />
          <FormControlLabel
            value="inProcess"
            control={<Radio sx={{ '&.Mui-checked': { color: '#F0AE2F' } }} />}
            label="Påbegynnt"
          />
          <FormControlLabel
            value="Solved"
            control={<Radio sx={{ '&.Mui-checked': { color: '#2BB728' } }} />}
            label="Løst"
          />
        </RadioGroup>

        <div className="flex flex-col items-center">
          <div className="flex flex-col sm:flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center gap-8">
            <ODACircle
              style={
                'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA1'
              }
              text={'Spesifikt problem'}
            />
            <TextField
              data-cy="spesificProblem"
              required
              id="outlined-multiline-static"
              multiline
              value={specificProblem}
              onChange={(e) => {
                setSpecificProblem(e.target.value)
              }}
              name="specificProblem"
              rows={8}
              label="Spesifikt problem"
              size="small"
              sx={{
                ...textFieldStyle,
                width: '40vw',
                minWidth: '215px',
                maxWidth: '600px',
                height: '100%',
              }}
            />
            <CustomWidthTooltip title={specificProblemHelpText}>
              <HelpOutlineIcon
                sx={{
                  '@media screen and (max-width: 640px)': {
                    marginLeft: '200px',
                    marginTop: '-230px',
                    marginBottom: '11rem',
                  },
                  marginLeft: '-50px',
                  marginTop: '-175px',
                  zIndex: '1',
                  fontSize: 'medium',
                  '&:hover': { cursor: 'pointer' },
                }}
              />
            </CustomWidthTooltip>
          </div>

          <div className="flex flex-col sm:flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center gap-8">
            <ODACircle
              style={
                'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA2'
              }
              text={'Dataprodukt'}
            />
            <TextField
              data-cy="dataProduct"
              required
              id="outlined-multiline-static"
              multiline
              name="dataProduct"
              rows={8}
              value={clearDataProduct}
              onChange={(e) => {
                setClearDataProduct(e.target.value)
              }}
              label="Tydelig dataprodukt"
              size="small"
              sx={{
                ...textFieldStyle,
                width: '40vw',
                minWidth: '215px',
                maxWidth: '600px',
                height: '100%',
              }}
            />
            <CustomWidthTooltip title={dataProductHelpText}>
              <HelpOutlineIcon
                sx={{
                  '@media screen and (max-width: 640px)': {
                    marginLeft: '200px',
                    marginTop: '-230px',
                    marginBottom: '11rem',
                  },
                  marginLeft: '-50px',
                  marginTop: '-175px',
                  zIndex: '1',
                  fontSize: 'medium',
                  '&:hover': { cursor: 'pointer' },
                }}
              />
            </CustomWidthTooltip>
          </div>

          <div className="flex flex-col sm:flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center gap-8">
            <ODACircle
              style={
                'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA3'
              }
              text={'Tilgjengelig data'}
            />
            <TextField
              data-cy="accesibleData"
              required
              id="outlined-multiline-static"
              multiline
              rows={8}
              value={accessibleData}
              onChange={(e) => {
                setAccessibleData(e.target.value)
              }}
              name="accessibleData"
              label="Tilgjengelige data"
              size="small"
              sx={{
                ...textFieldStyle,
                width: '40vw',
                minWidth: '215px',
                maxWidth: '600px',
                height: '100%',
              }}
            />
            <CustomWidthTooltip title={accessibleDataHelpText}>
              <HelpOutlineIcon
                sx={{
                  '@media screen and (max-width: 640px)': {
                    marginLeft: '200px',
                    marginTop: '-230px',
                    marginBottom: '11rem',
                  },
                  marginLeft: '-50px',
                  marginTop: '-175px',
                  zIndex: '1',
                  fontSize: 'medium',
                  '&:hover': { cursor: 'pointer' },
                }}
              />
            </CustomWidthTooltip>
          </div>

          <div className="flex flex-col sm:flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center gap-8">
            <ODACircle
              style={
                'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 text-xs sm:text-base bg-ODA4'
              }
              text={'Definert handling'}
            />
            <TextField
              data-cy="definedAction"
              required
              id="outlined-multiline-static"
              multiline
              rows={8}
              name="definedAction"
              label="Definert handling"
              value={definedAction}
              onChange={(e) => {
                setDefinedAction(e.target.value)
              }}
              size="small"
              sx={{
                ...textFieldStyle,
                width: '40vw',
                minWidth: '215px',
                maxWidth: '600px',
                height: '100%',
              }}
            />
            <CustomWidthTooltip title={definedActionHelpText}>
              <HelpOutlineIcon
                sx={{
                  '@media screen and (max-width: 640px)': {
                    marginLeft: '200px',
                    marginTop: '-230px',
                    marginBottom: '11rem',
                  },
                  marginLeft: '-50px',
                  marginTop: '-175px',
                  zIndex: '1',
                  fontSize: 'medium',
                  '&:hover': { cursor: 'pointer' },
                }}
              />
            </CustomWidthTooltip>
          </div>
        </div>

        <Button
          data-cy="send"
          variant="contained"
          type="submit"
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
          Send
        </Button>
      </Box>

      <Snackbar open={showSuccessMessage} autoHideDuration={2000} onClose={handleSuccessClose}>
        <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
          Nytt ODA-problem lagt til!
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

export default NewProblem
