import Image from 'next/image'
import Link from 'next/link'

const OrganizerLogo = ({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width: number
  height: number
}) => (
  <Link
    href="/partners"
    title={alt}
className="flex items-center justify-center h-9 px-1 grayscale brightness-150 opacity-60 hover:grayscale-0 hover:brightness-100 hover:opacity-100 transition-[opacity,filter] duration-200"  >
    <Image src={src} alt={alt} width={width} height={height} className="max-h-full w-auto" />
  </Link>
)

type PartnerGroup = {
  label: string
  logos: { src: string; alt: string; width: number }[]
}

const groups: PartnerGroup[] = [
  {
    label: 'Organized by',
    logos: [{ src: '/images/logos/mm_light.png', alt: 'Math&Maroc', width: 100 }],
  },
  {
    label: 'Official partner',
    logos: [{ src: '/images/logos/adria.png', alt: 'Adria', width: 100 }],
  },
  {
    label: 'Partners',
    logos: [
      { src: '/images/logos/CDG.png', alt: 'CDG', width: 100 },
      { src: '/images/logos/cdg_capital.webp', alt: 'CDG Capital', width: 140 },
    ],
  },
]

const Dot = () => (
  <span className="text-white/20 select-none text-lg leading-none max-sm:hidden">·</span>
)

const HeroSectionOrganizers = () => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-4">
    {groups.map((group, i) => (
      
        
        <div key={group.label} className="flex items-center gap-3">
          {i > 0 && <Dot key={`dot-${i}`} />}
          <span className="text-[11px] uppercase tracking-wider text-[#F6A806]/50 whitespace-nowrap">
            {group.label}
          </span>

          <div className="flex items-center gap-3">
            {group.logos.map((logo) => (
              <OrganizerLogo
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={0}
              />
            ))}
          </div>
        </div>
      
    ))}
  </div>
)

export default HeroSectionOrganizers