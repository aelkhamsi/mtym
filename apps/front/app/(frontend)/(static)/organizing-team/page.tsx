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

const Card = ({
  name,
  imageSrc,
  portfolioSrc,
}: {
  name: string
  imageSrc: string
  portfolioSrc?: string
}) => {
  return (
    <Link href={portfolioSrc || '#'} target={portfolioSrc ? '_blank' : undefined}>
      <div className="w-[10rem] border-b-4 border-[#F6A806] flex flex-col justify-between items-center space-y-2 rounded-md py-2">
        <div className="h-fit">
          <Image src={imageSrc} alt={name} width={160} height={160} />
        </div>

        <div className="text-sm text-center font-semibold">{name}</div>
      </div>
    </Link>
  )
}

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
      const imageSrc =
        (photo?.sizes?.card?.url as string | undefined) ??
        (photo?.url as string | undefined) ??
        ''

      const categoryId =
        doc.category && typeof doc.category === 'object'
          ? String(doc.category.id)
          : doc.category != null
            ? String(doc.category)
            : null

      return {
        id: String(doc.id),
        name: doc.fullName,
        portfolioSrc: doc.linkedinUrl || doc.websiteUrl || undefined,
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

  return (
    <SectionContainer className="pt-24 pb-20 z-0">
      <div className="space-y-12">
        {sections.map((section) => (
          <div key={section.id} className="space-y-4">
            <h1 className="text-center text-3xl font-bold font-neco drop-shadow-sm">
              <span className="text-[#244B3A]">{section.name}</span>
            </h1>

            <div className="flex justify-around flex-wrap gap-6 p-8 rounded-lg md:gap-x-12">
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
        ))}
      </div>
    </SectionContainer>
  )
}
