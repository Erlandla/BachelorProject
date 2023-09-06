import Button from '@mui/material/Button'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ODACircle from '../components/ODACircle'
import PDFdownload from '../components/PDFdownload'
import { ProblemContext } from '../globalState/ProblemContext'
import { findUser, getODAProblemsAdminInfo, getUserInfo } from '../api/odaAPI'
import AdminInfoComponent from '../components/AdminInfoComponent'

function Home() {
  //  Globalstate user, and admin panel consts.
  const { user, setUser } = useContext(ProblemContext)
  const [totalProblems, setTotalProblems] = useState<number>(0)
  const [notApprovedProblems, setNotApprovedProblems] = useState<number>(0)
  const [solvedProblems, setSolvedProblems] = useState<number>(0)
  const [inProgressProblems, setInProgressProblems] = useState<number>(0)
  const [newProblems, setNewProblems] = useState<number>(0)

  //  Styling for mui buttons (sx)
  const buttonStyle = {
    color: 'white',
    backgroundColor: '#0D264A',
    width: '150px',
    borderRadius: '45px',
    border: '1px solid white',
    '&:hover': { backgroundColor: '#3d3f6b' },
  }

  useEffect(() => {
    //  Needed to for admin when refreshin page. Better solution set to future work.
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
                console.log('error')
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
            console.log('error')
          }
        })
        .catch(() => {
          console.log('error')
        })
    }

    //  If admin, then fetch admin panel.
    if (user.isAdmin.toString() === 'true') {
      getODAProblemsAdminInfo()
        .then((r) => {
          setTotalProblems(r.data[0])
          setNotApprovedProblems(r.data[1])
          setSolvedProblems(r.data[2])
          setInProgressProblems(r.data[3])
          setNewProblems(r.data[4])
        })
        .catch(() => {
          console.log('Fetching admin panel failed!')
        })
    }
  }, [user.isAdmin])

  return (
    <div className="text-center flex flex-col min-h-screen">
      <div className="text-white bg-footer px-5 py-3 w-full items-center justify-center flex flex-col">
        <div>
          <h1 className="text-4xl mb-4">Velkommen!</h1>
          {user.isAdmin.toString() === 'true' ? (
            <div>
              <p className="max-w-3xl text-xl sm:text-2xl mb-2">
                Innlogget som administrator: {user.email}
              </p>
              <p className="max-w-2xl text-sm sm:text-base mb-4">
                Som administrator kan du godkjenne, redigere og slette dataproblem. Du kan også
                legge til nye brukere. Under ligger en oversikt over alle dataproblem og antallet
                som tilhører de forskjellige statusene.
              </p>
            </div>
          ) : (
            <div>
              <p className="max-w-2xl text-xl sm:text-2xl mb-2">
                Har du en utfordring i din arbeidsoppgave?
              </p>
              <p className="max-w-2xl text-sm sm:text-base mb-4">
                Alle norske kommuner har samme lovpålagte ansvarsområder. Det betyr at en annen
                kommune kanskje har eller har hatt samme utfordring! Søk etter din utfordring,
                kanskje er den allerede løst eller noen arbeider med en løsning. Hvis ikke, opprett
                en ny utfordring!{' '}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-row gap-4 md:gap-2 mb-2">
          <div className="flex flex-col md:flex-row gap-4 md:gap-2">
            <Link
              to="/Søk"
              onClick={() => {
                localStorage.setItem('searchFilter', '0')
              }}
            >
              <Button
                data-cy="search"
                variant="contained"
                sx={{
                  ...buttonStyle,
                }}
              >
                Søk
              </Button>
            </Link>
            <Link to="/NyttProblem">
              <Button
                data-cy="newProblem"
                variant="contained"
                sx={{
                  ...buttonStyle,
                }}
              >
                Nytt problem
              </Button>
            </Link>
          </div>

          {user.isAdmin.toString() === 'true' ? (
            <div className="flex flex-col md:flex-row gap-4 md:gap-2">
              <Link to="/GodkjennOversikt">
                <Button
                  data-cy = "evaluateProblem"
                  variant="contained"
                  sx={{
                    ...buttonStyle,
                    width: '200px',
                  }}
                >
                  Godkjenn problem
                </Button>
              </Link>
              <Link to="/RegistrerBruker">
                <Button
                  data-cy = "registerUser"
                  variant="contained"
                  sx={{
                    ...buttonStyle,
                    '@media screen and (max-width: 767px)': {
                      width: '200px',
                    },
                  }}
                >
                  Ny bruker
                </Button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <div className=" border-2 flex flex-col items-center">
          {user.isAdmin.toString() === 'true' ? (
            <div className="my-5">
              <h1 className="text-3xl sm:text-4xl text-text whitespace-nowrap mb-5">Adminpanel</h1>
              <div className="flex flex-wrap justify-center gap-4 max-w-[35rem] sm:max-w-[46rem]">
                <AdminInfoComponent title={'Totalt'} count={totalProblems} link={'/Søk'} />
                <AdminInfoComponent
                  title={'Til godkjenning'}
                  count={notApprovedProblems}
                  link={'/GodkjennOversikt'}
                />
                <AdminInfoComponent title={'Løst'} count={solvedProblems} link={'/Søk'} />
                <AdminInfoComponent title={'Påbegynnt'} count={inProgressProblems} link={'/Søk'} />
                <AdminInfoComponent title={'Nytt problem'} count={newProblems} link={'/Søk'} />
              </div>
            </div>
          ) : null}

          <div className="flex flex-row h-12 w-[80vw] sm:w-[65vw] items-center justify-center mt-5">
            <div className="w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48"></div>

            <div className="flex flex-col mt-5 pl-4 sm:pl-8 w-[62vw] sm:w-[45vw] gap-1">
              <div className="text-3xl sm:text-4xl text-text whitespace-nowrap text-left">
                Om ODA-metoden
              </div>
              <PDFdownload />
            </div>
          </div>

          <div className="flex flex-row h-12 w-[80vw] sm:w-[65vw] items-center justify-center mt-5">
            <div className="w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48"></div>

            <div className="flex flex-row items-center gap-2 pl-4 sm:pl-8 w-[62vw] sm:w-[45vw]">
              <ODACircle
                style={
                  'rounded-full flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 bg-ODA1'
                }
                text={''}
              />
              <ODACircle
                style={
                  'rounded-full flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 bg-ODA2'
                }
                text={''}
              />
              <ODACircle
                style={
                  'rounded-full flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 bg-ODA3'
                }
                text={''}
              />
              <ODACircle
                style={
                  'rounded-full flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 bg-ODA4'
                }
                text={''}
              />
            </div>
          </div>

          <div className="text-xs md:text-base">
            <div className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center">
              <ODACircle
                style={
                  'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 bg-ODA1 text-xs sm:text-base'
                }
                text={'Et spesifikt problem'}
              />
              <div className="flex flex-col gap-2 w-[62vw] sm:w-[45vw] h-100% text-text text-left pl-4 sm:pl-8">
                <p className="font-bold">
                  Hovedpoeng: Det er ytterst viktig å bevege seg fra større, makronivå problemer til
                  noe spesifikt og gjennomførbart.
                </p>
                <p>
                  Virksomheter i den offentlige sektoren håndterer mange store problemer, men
                  enkelte av dem er for bredt definert til å ha en umiddelbar løsning. For eksempel
                  så er problemstillingen: “Det finnes tilfeller av moderne slaveri i byen” for vag.
                </p>
                <p>
                  Etter litt betenkning kan problemstillingen omformuleres til noe mer spesifikt,
                  slik som “Vi vet ikke hvilke av de regulerte bedriftene som har større
                  sannsynlighet for å utnytte offer for moderne slaveri.”
                </p>
              </div>
            </div>

            <div className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center">
              <ODACircle
                style={
                  'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 bg-ODA2 text-xs sm:text-base'
                }
                text={'Et tydelig dataprodukt'}
              />
              <div className="flex flex-col gap-2 w-[62vw] sm:w-[45vw] h-100% text-text text-left pl-4 sm:pl-8">
                <p className="font-bold">
                  Hovedspørsmål: Hvilken informasjon må en person ha tilgang til på skjermen for å
                  kunne utføre handlingene som ble bestemt i det forrige steget?
                </p>
                <p>
                  Det er usannsynlig at de som utfører tiltaket (f.eks førstelinjearbeidere eller
                  kundeansvarlige) vil be om et regneark eller rådata. I stedet vil de ofte ha
                  informasjonen lagt fram på en mer forståelig måte som gir faktisk innsikt- det er
                  det vi mener med et &#39;dataprodukt&#39;.
                </p>
                <p>
                  Et &#39;dataprodukt&#39; kan være et kart, varmekart, prioritert liste,
                  varselsystem, et dashboard, en visualisering og så videre.
                </p>
              </div>
            </div>

            <div className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center">
              <ODACircle
                style={
                  'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 bg-ODA3 text-xs sm:text-base'
                }
                text={'Tilgjengelig data'}
              />
              <div className="flex flex-col gap-2 w-[62vw] sm:w-[45vw] h-100% text-text text-left pl-4 sm:pl-8">
                <p className="font-bold">
                  hovedspørsmål: Hvilke data trenger du for å lage dataproduktet, eksisterer de, har
                  du tilgang til dem, og kan de brukes?
                </p>
                <p>
                  Data kan komme fra flere forskjellige kilder, slik som:
                  <br />
                  • Åpne data (f.eks. data.gov.uk)
                  <br />
                  • Offentlig sektor
                  <br />
                  • Bedrifter og tredjesektor (frivillige organisasjoner)
                  <br />• Allmennheten
                </p>
                <p>
                  Du kan bruke en enkel mal slik som den på neste lysbilde til idémyldring om hvilke
                  datasett som kan hentes fra de forskjellige kildene.
                </p>
              </div>
            </div>

            <div className="flex flex-row h-50 w-[80vw] sm:w-[65vw] mb-8 items-center justify-center">
              <ODACircle
                style={
                  'rounded-full flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 bg-ODA4 text-xs sm:text-base'
                }
                text={'En definert handling'}
              />
              <div className="w-[62vw] sm:w-[45vw] h-100% text-text text-left pl-4 sm:pl-8">
                <p className="font-bold">
                  Hovedspørsmål: Hva ville du gjort annerledes om du hadde all informasjonen du
                  trengte om ditt spesifikke problem?
                </p>
                <p>
                  For å være tydelig, dataanalyseprosessen er ikke tiltaket. Det er viktig å
                  identifisere praktiske løsninger og tiltak som er innenfor din kontroll å
                  forandre. For eksempel så kan ikke virksomheter &#39;løse&#39; bostedløshet på
                  egenhånd - men du kan kanskje ta for deg et spesifikt aspekt i ditt miljø.
                </p>
                <p>Finn ut nøyaktig hvem som skal gjøre noe, hvor og når det skal gjøres.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
