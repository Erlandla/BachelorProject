import React from 'react'

function ErrorPage() {
  return (
    <div className="text-center flex flex-col bg-background">
      <header className="h-[82.5vh] flex flex-col items-center justify-center">
        <h1 className="text-9xl font-bold">404</h1>
        <p>Page not found</p>
      </header>
    </div>
  )
}

export default ErrorPage
