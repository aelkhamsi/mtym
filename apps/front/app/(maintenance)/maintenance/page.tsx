import React from 'react'

const MaintenancePage = () => {
  return (
    <section className="min-h-screen grid place-items-center">
      <div className="container mx-auto">
        <div className="text-center">
          <h1
            className="my-6 max-w-xl mx-auto font-bold text-3xl [text-wrap:_balance]"
          >
            We&apos;re currently undergoing maintenance to improve your
            experience.
          </h1>
          <p
            className="text-foreground max-w-xl mx-auto [text-wrap:_balance]"
          >
            Please bear with us while we make these enhancements. We&apos;ll be
            back shortly. Thank you for your patience!
          </p>
        </div>
      </div>
    </section>
  )
}

export default MaintenancePage
