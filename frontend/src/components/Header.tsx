import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { ProblemContext } from '../globalState/ProblemContext'

function Header() {
  const { user } = useContext(ProblemContext)

  return (
    <div className="h-[3.25rem] flex flex-row justify-between bg-white sticky top-0 z-50 drop-shadow-xl px-10 sm:px-20">
      <Link to="/Hjem" className="text-3xl text-left w-48 mt-2">
        <p data-cy = "nestaLogo" className="">Graph Nesta</p>
      </Link>

      <section className="text-based">
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button
                data-cy="hamburgerMenu"
                data-testid="hamburgerMenu"
                {...bindTrigger(popupState)}
              >
                {popupState.isOpen ? (
                  <CloseIcon
                    onClick={popupState.close}
                    sx={{ fontSize: '2.5rem', cursor: 'pointer', color: '#0D264A' }}
                  />
                ) : (
                  <MenuIcon
                    onClick={popupState.close}
                    sx={{ fontSize: '2.5rem', cursor: 'pointer', color: '#0D264A' }}
                  />
                )}
              </Button>
              <Menu {...bindMenu(popupState)}>
                {user.isLoggedIn ? (
                  <Link to="/minProfil" onClick={popupState.close}>
                    <div
                      data-cy="myProfile"
                      className="text-left pl-4 pr-4 h-10 hover:bg-menuHover flex items-centere"
                    >
                      Min profil
                    </div>
                  </Link>
                ) : (
                  <Link to="/LoggInn" onClick={popupState.close}>
                    <div
                      data-cy="loggin"
                      className="text-left pl-4 pr-4 h-10 hover:bg-menuHover flex items-center"
                    >
                      Logg inn
                    </div>
                  </Link>
                )}
                <Link to="/MineProblem" onClick={popupState.close}>
                  <div
                    data-cy="myProblems"
                    className="text-left pl-4 pr-4 h-10 hover:bg-menuHover flex items-center"
                  >
                    Mine problem
                  </div>
                </Link>
                <Link to="/NyttProblem" onClick={popupState.close}>
                  <div className="text-left pl-4 pr-4 h-10 hover:bg-menuHover flex items-center">
                    Nytt problem
                  </div>
                </Link>
                <Link
                  to="/Søk"
                  onClick={() => {
                    popupState.close()
                    localStorage.setItem('searchFilter', '0')
                  }}
                >
                  <div className="text-left pl-4 pr-4 h-10 hover:bg-menuHover flex items-center">
                    Søk
                  </div>
                </Link>
                {user.isAdmin.toString() === 'true' ? (
                  <div className="flex flex-col">
                    <Link to="/GodkjennProblem" onClick={popupState.close}>
                      <div className="text-left pl-4 pr-4 h-10 hover:bg-menuHover flex items-center">
                        Godkjenn problem
                      </div>
                    </Link>
                    <Link to="/RegistrerBruker" onClick={popupState.close}>
                      <div
                        data-cy="newUser"
                        className="text-left pl-4 pr-4 h-10 hover:bg-menuHover flex items-center"
                      >
                        Ny bruker
                      </div>
                    </Link>
                  </div>
                ) : null}
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </section>
    </div>
  )
}

export default Header
