import React, { ReactNode } from 'react'

const ConferenceCard = ({
  fullName,
  pictureUrl,
  children,
}:{
  fullName: string,
  pictureUrl: string,
  children: ReactNode
}) => {
  return (
    <div className="flex flex-col w-full px-4 space-y-4 md:flex-row xl:w-1/2">
      <div className='flex justify-center'>
        <img
          src={pictureUrl}
          width={300}
        />
      </div>
      
      <div className='flex flex-col ml-4 md:ml-10'>
        <div className='text-2xl font-semibold'>{fullName}</div>
        {children}        
      </div>
    </div>
  )
}

const ConferencesSection = ({
  className
}:{
  className?: string
}) => {
  return (
    <div
      className="rounded-lg animate-fade-up opacity-0"
      style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
    >
      <div className={`flex flex-row flex-wrap gap-y-4 py-4 w-full ${className}`}>
        <ConferenceCard
          fullName='Omar MOUCHTAKI'
          pictureUrl='/conferences/omar_mouchtaki.jpeg'
        >
          <ul className="list-disc font-light">
            <li>Assistant Professor, NYU Stern – Operations, Technology & Statistics</li>
            <li>Graduate of École Polytechnique</li>
            <li>Ph.D. in Operations Research, Columbia University</li>
            <li>Co-founder of Math&Maroc</li>
            <li><span className='font-medium'>Research: </span> Data-driven decision-making, pricing, inventory, assortment</li>
          </ul>
        </ConferenceCard>

        <ConferenceCard
          fullName='Mohammed ABOUZAID'
          pictureUrl='/conferences/mohammed_abouzaid.jpg'
        >
          <ul className="list-disc font-light">
            <li>Professor of Mathematics – Stanford University</li>
            <li>Specialist in Symplectic Geometry & Topology</li>
            <li>Invited Speaker – International Congress of Mathematicians (2014)</li>
            <li>New Horizons in Mathematics Prize (2017)</li>
            <li>Former Clay Research Fellow</li>
          </ul>
        </ConferenceCard>

        <ConferenceCard
          fullName='Nader MASMOUDI'
          pictureUrl='/conferences/nader_masmoudi.jpg'
        >
          <ul className="list-disc font-light">
            <li>Professor of Mathematics – NYU Courant Institute & NYU Abu Dhabi</li>
            <li>First Arab & African Gold Medalist at the IMO (1992)</li>
            <li>ENS Ulm Graduate</li>
            <li>Invited Speaker – International Congress of Mathematicians (2018)</li>
            <li>Specialist in nonlinear PDEs & fluid dynamics</li>
          </ul>
        </ConferenceCard>
      </div>
    </div>
  )
}

export default ConferencesSection
