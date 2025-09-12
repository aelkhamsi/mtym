const Stats = ({
  valueAllApplications,
  valuePendingApplications,
  valueBac1,
  valueBac2,
  valueTC,
  valueAllTeams,
  valueCompleteTeams,
  valueIncompleteTeams,
  className
}:{
  valueAllApplications: number,
  valuePendingApplications: number,
  valueBac1: number,
  valueBac2: number,
  valueTC: number,
  valueAllTeams: number,
  valueCompleteTeams: number,
  valueIncompleteTeams: number,
  className?: string
}) => {
  return (
    <>
      <div className={`text-xl font-medium rounded-xl p-4 w-fit space-y-1 ${className}`}>
        <div>Applications</div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-gray-300 text-black">All</div>
          <div className={'text-zinc-100'}>{valueAllApplications}</div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-[#FFE380] text-black">SUBMITTED</div>
          <div className={'text-zinc-100'}>{valuePendingApplications}</div>
        </div>
      </div>

      <div className={`text-xl font-medium rounded-xl p-4 w-fit space-y-1 ${className}`}>
        <div>Submitted Applications by Level</div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-gray-300 text-black">Tronc commun</div>
          <div className={'text-zinc-100'}>{valueTC}</div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-gray-300 text-black">Bac +1</div>
          <div className={'text-zinc-100'}>{valueBac1}</div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-gray-300 text-black">Bac +2</div>
          <div className={'text-zinc-100'}>{valueBac2}</div>
        </div>
      </div>

      <div className={`text-xl font-medium rounded-xl p-4 w-fit space-y-1 ${className}`}>
        <div>Teams</div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-gray-300 text-black">All</div>
          <div className={'text-zinc-100'}>{valueAllTeams}</div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-[#FFE380] text-black">Complete</div>
          <div className={'text-zinc-100'}>{valueCompleteTeams}</div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="rounded-lg px-2 py-1 bg-red-200 text-black">Incomplete</div>
          <div className={'text-zinc-100'}>{valueIncompleteTeams}</div>
        </div>
      </div>
    </>
    
  )
}

export default Stats
