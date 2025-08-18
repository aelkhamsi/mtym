import { ReactNode } from "react"

const PartnerCard = ({
  key,
  imageSrc,
  imageHeight,
  children,
}:{
  key: string,
  imageSrc: string,
  imageHeight: string,
  children: ReactNode,
}) => {
  return (
    <div
      className="w-[16rem] md:h-[16rem] md:w-[34rem] bg-white shadow-lg border-b-4 border-red-500 md:flex justify-center items-center rounded-md"
      key={key}
    > 
      <div className="h-[8rem] w-[16rem] md:h-fit md:w-[18rem] flex justify-center items-center">
        <img
          src={imageSrc}
          style={{height: imageHeight, width: 'auto'}}
        />
      </div>

      <div className="h-fit w-[16rem] p-4 md:w-[20rem] flex flex-col space-y-2">
        {children}
      </div>
    </div>
  )
}

export default PartnerCard
