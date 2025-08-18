const Stats = ({
  valueAll,
  valuePending,
  valueBac1,
  valueBac2,
  valueBac3,
  valueBac4,
  className
}:{
  valueAll: number,
  valuePending: number,
  valueBac1: number,
  valueBac2: number,
  valueBac3: number,
  valueBac4: number,
  className?: string
}) => {
  return (
    <>
      <div className={`text-xl font-medium rounded-xl p-4 w-fit space-y-1 ${className}`}>
        <div>Applications</div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-gray-300 text-black">All</div>
          <div className={'text-zinc-100'}>{valueAll}</div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-[#FFE380] text-black">PENDING</div>
          <div className={'text-zinc-100'}>{valuePending}</div>
        </div>
      </div>

      <div className={`text-xl font-medium rounded-xl p-4 w-fit space-y-1 ${className}`}>
        <div>Submitted Applications by Level</div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-gray-300 text-black">Bac +1</div>
          <div className={'text-zinc-100'}>{valueBac1}</div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-gray-300 text-black">Bac +2</div>
          <div className={'text-zinc-100'}>{valueBac2}</div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-gray-300 text-black">Bac +3</div>
          <div className={'text-zinc-100'}>{valueBac3}</div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-gray-300 text-black">Bac +4</div>
          <div className={'text-zinc-100'}>{valueBac4}</div>
        </div>
      </div>
    </>
    
  )
}

export default Stats
