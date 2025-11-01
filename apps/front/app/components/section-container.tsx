import { ReactNode } from "react"

const SectionContainer = ({
  className,
  children,
}:{
  className?: string
  children?: ReactNode,
}) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className='w-full px-4 lg:w-3/4 lg:px-0'>
        {children}
      </div>
    </div>
  )
}

export default SectionContainer
