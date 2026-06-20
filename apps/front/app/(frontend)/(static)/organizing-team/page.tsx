import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import { shuffle } from '@mdm/utils'
import SectionContainer from '@/app/components/section-container'


type Organizer = {
  id: string
  name: string
  imageSrc: string
  portfolioSrc?: string
}

type CategorySection = {
  id: string
  name: string
  members: Organizer[]
}



type Row =
  | { type: 'full'; section: CategorySection }
  | { type: 'group'; sections: CategorySection[] }

const SMALL_CATEGORY_MAX = 2

const groupSectionsIntoRows = (sections: CategorySection[]): Row[] => {
  const rows: Row[] = []
  let smallRun: CategorySection[] = []

  const flush = () => {
    if (smallRun.length > 0) {
      rows.push({ type: 'group', sections: smallRun })
      smallRun = []
    }
  }

  for (const section of sections) {
    if (section.members.length <= SMALL_CATEGORY_MAX) {
      smallRun.push(section)
    } else {
      flush()
      rows.push({ type: 'full', section })
    }
  }
  flush()

  return rows
}

const Card = ({
  name,
  imageSrc,
  portfolioSrc,
}: {
  name: string
  imageSrc: string
  portfolioSrc?: string
}) => {
  const inner = (
    <div className="w-[10rem] border-b-4 border-[#F6A806] flex flex-col justify-between items-center space-y-2 rounded-md py-2">
      <div className="h-fit">
        {imageSrc ? (
          <Image src={imageSrc} alt={name} width={160} height={160} />
        ) : (
          <div className="w-[160px] h-[160px] bg-gray-100 rounded" />
        )}
      </div>

      <div className="text-sm text-center font-semibold">{name}</div>
    </div>
  )


  if (!portfolioSrc) {
    return inner
  }

  return (
    <Link
      href={portfolioSrc}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer transition-transform duration-200 hover:-translate-y-1"
    >
      {inner}
    </Link>
  )
}

const CategoryBlock = ({ section }: { section: CategorySection }) => (
  <div className="space-y-4">
    <h2 className="text-center text-3xl font-bold font-neco drop-shadow-sm">
      <span className="text-[#244B3A]">{section.name}</span>
    </h2>

    <div
      className={`flex flex-wrap gap-6 p-8 rounded-lg md:gap-x-12 ${
        section.members.length <= 2 ? 'justify-center' : 'justify-around'
      }`}
    >
      {section.members.map((person) => (
        <Card
          key={person.id}
          name={person.name}
          imageSrc={person.imageSrc}
          portfolioSrc={person.portfolioSrc}
        />
      ))}
    </div>
  </div>
)

export default async function OrganizingTeamPage() {
  const payload = await getPayload({ config })

  const [organizersResult, categoriesResult] = await Promise.all([
    payload.find({ collection: 'organizers', limit: 500, depth: 1 }),
    payload.find({
      collection: 'organizer-categories',
      limit: 200,
      sort: 'order',
    }),
  ])

  const organizers: (Organizer & { categoryId: string | null })[] =
    organizersResult.docs.map((doc) => {
      const photo =
        doc.photo && typeof doc.photo === 'object' ? doc.photo : null

      const filename = photo?.filename as string | undefined
      const imageSrc = filename
        ? `/images/payload/organizer-photos/${filename}`
        : ''

      const categoryId =
        doc.category && typeof doc.category === 'object'
          ? String(doc.category.id)
          : doc.category != null
            ? String(doc.category)
            : null

      return {
        id: String(doc.id),
        name: doc.fullName,
        portfolioSrc: doc.portfolioUrl || undefined,
        imageSrc,
        categoryId,
      }
    })

  // shuffling the members within each section to avoid implying any ranking
  const sections: CategorySection[] = categoriesResult.docs
    .map((category) => ({
      id: String(category.id),
      name: category.name as string,
      members: shuffle(
        organizers.filter((o) => o.categoryId === String(category.id)),
      ),
    }))
    .filter((section) => section.members.length > 0)

  const rows = groupSectionsIntoRows(sections)

  return (
    <SectionContainer className="pt-24 pb-20 z-0">
      <div className="space-y-12">
        {rows.length === 0 ? (
          <p className="text-center text-gray-500">
            L&apos;équipe sera bientôt dévoilée.
          </p>
        ) : (
          rows.map((row, i) =>
            row.type === 'full' ? (
              <CategoryBlock key={row.section.id} section={row.section} />
            ) : (
              <div
                key={`group-${i}`}
                className="flex flex-wrap justify-center gap-x-12 gap-y-8"
              >
                {row.sections.map((section) => (
                  <div
                    key={section.id}
                    className="flex-1 min-w-[16rem] max-w-md"
                  >
                    <CategoryBlock section={section} />
                  </div>
                ))}
              </div>
            ),
          )
        )}
      </div>
    </SectionContainer>
  )
}
