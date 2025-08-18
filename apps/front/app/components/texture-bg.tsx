import { ReactNode } from "react"

const TextureBg = ({
  children,
  className,
}:{
  children: ReactNode,
  className?: string,
}) => {
  return (
    <div className="w-full bg-[url(/bright-squares.png)] bg-center bg-repeat z-10">
      <div className={`w-full flex flex-col justify-center items-center py-6 pt-24 z-0 ${className}`}>
          {children}
      </div>
    </div>
  )
}

export default TextureBg
