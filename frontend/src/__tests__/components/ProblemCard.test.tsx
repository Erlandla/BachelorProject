import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProblemCard from '../../components/ProblemCard'
import { ContextUser, Status, type ProblemCardProps } from '../../types/types'
import { MemoryRouter } from 'react-router-dom'
import { ProblemContext } from '../../globalState/ProblemContext'
import renderer from 'react-test-renderer'

// ChallengeCardProp-objects used for various test cases
const problemCorrectData: ProblemCardProps = {
  id: '123',
  title: 'Test Challenge',
  vendor: 'Test System',
  status: Status.newProblem,
  specificProblem: 'Test Specific Problem',
  clearDataProduct: 'Test Clear Data Product',
  accessibleData: 'Test Accessible Data',
  definedAction: 'Test Defined Action',
  subCount: 5,
  owner: { email: 'test@mail.no', telephone: '111 22 333', affiliation: 'Test kommune' },
  subs: [],
  edit: false,
  approved: true
}
const problemEmptyTitle: ProblemCardProps = {
  id: '1234',
  title: '',
  vendor: 'aa',
  status: Status.newProblem,
  specificProblem: 'aa',
  clearDataProduct: 'aa',
  accessibleData: 'aa',
  definedAction: 'aa',
  subCount: 5,
  owner: { email: 'test@mail.no', telephone: '111 22 333', affiliation: 'aaaaaa' },
  subs: [],
  edit: false,
  approved: false
}
const problemNegativeSubCount: ProblemCardProps = {
  id: '12345',
  title: 'Test Challenge',
  vendor: 'Test System',
  status: Status.newProblem,
  specificProblem: 'Test Specific Problem',
  clearDataProduct: 'Test Clear Data Product',
  accessibleData: 'Test Accessible Data',
  definedAction: 'Test Defined Action',
  subCount: -5,
  owner: { email: 'test@mail.no', telephone: '111 22 333', affiliation: 'Test kommune' },
  subs: [],
  edit: false,
  approved: false
}
const problemInvalidEmail: ProblemCardProps = {
  id: '12345',
  title: 'Test Challenge',
  vendor: 'Test System',
  status: Status.newProblem,
  specificProblem: 'Test Specific Problem',
  clearDataProduct: 'Test Clear Data Product',
  accessibleData: 'Test Accessible Data',
  definedAction: 'Test Defined Action',
  subCount: 5,
  owner: { email: 'c:', telephone: '111 22 333', affiliation: 'Test kommune' },
  subs: [],
  edit: false,
  approved: false
}
const problemInvalidPhoneNumb: ProblemCardProps = {
  id: '12345',
  title: 'Test Challenge',
  vendor: 'Test System',
  status: Status.newProblem,
  specificProblem: 'Test Specific Problem',
  clearDataProduct: 'Test Clear Data Product',
  accessibleData: 'Test Accessible Data',
  definedAction: 'Test Defined Action',
  subCount: 5,
  owner: { email: 'test@ail.no', telephone: '11333', affiliation: 'Test kommune' },
  subs: [],
  edit: false,
  approved: false
}
const loggedInUser: ContextUser = {
  email: 'a@b.c',
  password: 'aaaaaaaaaaaaaaa',
  affiliation: 'TRONDHJÆM, BAYBEY',
  telephone: '111 22 333',
  isLoggedIn: true,
  isAdmin: true,
}

afterEach(() => {
  cleanup()
})

describe('Renders with no errors', () => {
  it('renders challenge card with correct data', () => {
    render(
      <MemoryRouter>
        <ProblemCard {...problemCorrectData} />
      </MemoryRouter>
    )
    expect(screen.getByText(problemCorrectData.title)).toBeInTheDocument()
    expect(screen.getByText(problemCorrectData.status)).toBeInTheDocument()
    expect(screen.getByText(problemCorrectData.specificProblem)).toBeInTheDocument()
    expect(screen.getByText(problemCorrectData.vendor)).toBeInTheDocument()
    expect(screen.getByText(problemCorrectData.subCount)).toBeInTheDocument()
    expect(screen.getByText(problemCorrectData.owner.affiliation)).toBeInTheDocument()
  })

  it('calls setChallenge on click', () => {
    const setProblemMock = jest.fn()
    render(
      <MemoryRouter>
        <ProblemContext.Provider
          value={{
            problem: problemCorrectData,
            setProblem: setProblemMock,
            user: loggedInUser,
            setUser: jest.fn(),
          }}
        >
          <ProblemCard {...problemCorrectData} />
        </ProblemContext.Provider>
      </MemoryRouter>
    )
    userEvent.click(screen.getByText(problemCorrectData.title))
    expect(setProblemMock).toHaveBeenCalledWith(problemCorrectData)
  })
})

describe('Weird cases of data in ProblemCardProps', () => {
  it('Title-field is an empty string', () => {
    render(
      <MemoryRouter>
        <ProblemContext.Provider
          value={{
            problem: problemEmptyTitle,
            setProblem: jest.fn(),
            user: loggedInUser,
            setUser: jest.fn(),
          }}
        >
          <ProblemCard {...problemEmptyTitle} />
        </ProblemContext.Provider>
      </MemoryRouter>
    )
    expect(screen.getByText('En feil oppstod: Error: Tittel-feltet er tomt'))
  })

  it('Subs-count is negative', () => {
    render(
      <MemoryRouter>
        <ProblemContext.Provider
          value={{
            problem: problemNegativeSubCount,
            setProblem: jest.fn(),
            user: loggedInUser,
            setUser: jest.fn(),
          }}
        >
          <ProblemCard {...problemNegativeSubCount} />
        </ProblemContext.Provider>
      </MemoryRouter>
    )
    expect(screen.getByText('En feil oppstod: Error: Mengden abonnenter er negativ'))
  })

  it('Owner with invalid email', () => {
    render(
      <MemoryRouter>
        <ProblemContext.Provider
          value={{
            problem: problemInvalidEmail,
            setProblem: jest.fn(),
            user: loggedInUser,
            setUser: jest.fn(),
          }}
        >
          <ProblemCard {...problemInvalidEmail} />
        </ProblemContext.Provider>
      </MemoryRouter>
    )
    expect(screen.getByText('En feil oppstod: Error: Ugyldig email'))
  })

  it('Owner with invalid phone number', () => {
    render(
      <MemoryRouter>
        <ProblemContext.Provider
          value={{
            problem: problemInvalidPhoneNumb,
            setProblem: jest.fn(),
            user: loggedInUser,
            setUser: jest.fn(),
          }}
        >
          <ProblemCard {...problemInvalidPhoneNumb} />
        </ProblemContext.Provider>
      </MemoryRouter>
    )
    expect(screen.getByText('En feil oppstod: Error: Ugyldig telefonnummer'))
  })
})

it('Matches snapshot', () => {
  const snapshot = renderer
    .create(
      <MemoryRouter>
        <ProblemContext.Provider
          value={{
            problem: problemInvalidPhoneNumb,
            setProblem: jest.fn(),
            user: loggedInUser,
            setUser: jest.fn(),
          }}
        >
          <ProblemCard {...problemInvalidPhoneNumb} />
        </ProblemContext.Provider>
      </MemoryRouter>
    )
    .toJSON()
  expect(snapshot).toMatchSnapshot()
})
