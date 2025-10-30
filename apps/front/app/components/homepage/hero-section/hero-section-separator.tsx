const HeroSectionSeparator = () => {
  return (
    <div className="w-[80rem] relative">
      <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-[#F6A806] to-transparent h-[2px] lg:w-3/4 blur-sm" />
      <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-[#F6A806] to-transparent h-px lg:w-3/4" />
      <div className="absolute inset-x-80 top-0 bg-gradient-to-r from-transparent via-[#F6A806] to-transparent h-[5px] lg:w-2/4 blur-sm" />
      <div className="absolute inset-x-80 top-0 bg-gradient-to-r from-transparent via-[#F6A806] to-transparent h-px lg:w-2/4" />
    </div>
  )
}

export default HeroSectionSeparator
