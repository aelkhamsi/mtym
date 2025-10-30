import CtaButton from './cta-button'
import FaqButton from './faq-button'
import RegulationButton from './regulation-button'
import '../pattern.css'
import ProblemsButton from './problems-button'

const CtaSection = ({
  className
}:{
  className?: string
}) => {
  return (
    <div className={`pattern text-center w-full lg:w-1/2 p-10 space-y-8 text-white custom-shadow ${className}`}>
      <div className='space-y-2'>
        <h2 className='font-bold font-neco text-3xl'>Rejoignez l&apos;aventure</h2>
        <p className="text-base">Explorer, Élaborer, Collaborer</p>
      </div>
      
      <div className='flex flex-col items-center justify-center space-y-2 lg:flex-row lg:space-y-0 lg:space-x-4'>
        {/* <CtaButton /> */}
        <ProblemsButton />
        <RegulationButton />
        <FaqButton />
      </div>
    </div>
  )
}

export default CtaSection
