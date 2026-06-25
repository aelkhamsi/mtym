import Image from 'next/image'
import { ColoredRichText } from '@/app/components/rich-text/colored-rich-text'

const PartnerCard = ({
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  description,
}: {
  imageSrc: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  description: any
}) => {
  return (
    <div className="flex flex-col items-stretch bg-white shadow-lg border-b-4 border-[#F6A806] rounded-md">
      <div className="shrink-0 h-[10rem] w-full p-4 flex justify-center items-center">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className="max-h-[8rem] w-auto max-w-full object-contain"
          style={{ height: 'auto' }}
        />
      </div>

      <div className="w-full p-4 flex flex-col justify-center">
        <ColoredRichText
          data={description}
          className="prose prose-sm max-w-none text-gray-800 [&_p]:my-0 [&>*+*]:mt-2 [&_strong]:text-inherit [&_em]:text-inherit [&_code]:text-inherit"
        />
      </div>
    </div>
  )
}

export default PartnerCard
