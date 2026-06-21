import { getPayload } from 'payload'
import config from '@payload-config'
import SectionContainer from '@/app/components/section-container'
import PartnerCard from './partner-card'

export const dynamic = 'force-dynamic'

type Partner = {
  id: string
  name: string
  imageSrc: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  description: any
  order: number
  categoryId: string | null
}

type CategorySection = {
  id: string
  name: string
  partners: Partner[]
}

export default async function PartnersPage() {
  const payload = await getPayload({ config })

  const [partnersResult, categoriesResult] = await Promise.all([
    payload.find({ collection: 'partners', limit: 500, depth: 1 }),
    payload.find({
      collection: 'partner-categories',
      limit: 200,
      sort: 'order',
    }),
  ])

  const partners: Partner[] = partnersResult.docs.map((doc) => {
    const logo = doc.logo && typeof doc.logo === 'object' ? doc.logo : null
    const card = logo?.sizes?.card
    const imageSrc =
      (card?.url as string | undefined) ??
      (logo?.url as string | undefined) ??
      ''
    const imageWidth =
      (card?.width as number | undefined) ??
      (logo?.width as number | undefined) ??
      600
    const imageHeight =
      (card?.height as number | undefined) ??
      (logo?.height as number | undefined) ??
      400

    const categoryId =
      doc.category && typeof doc.category === 'object'
        ? String(doc.category.id)
        : doc.category != null
          ? String(doc.category)
          : null

    return {
      id: String(doc.id),
      name: doc.name,
      imageSrc,
      imageAlt: (logo?.alt as string | undefined) || doc.name,
      imageWidth,
      imageHeight,
      description: doc.description,
      order: typeof doc.order === 'number' ? doc.order : 0,
      categoryId,
    }
  })

  const sections: CategorySection[] = categoriesResult.docs
    .map((category) => ({
      id: String(category.id),
      name: category.name as string,
      partners: partners
        .filter((p) => p.categoryId === String(category.id))
        .sort((a, b) => a.order - b.order),
    }))
    .filter((section) => section.partners.length > 0)

  return (
    <SectionContainer className="pt-24 pb-20 z-0">
      <div className="space-y-6">
        {sections.length === 0 ? (
          <p className="text-center text-gray-500">
            Nos partenaires seront bientôt annoncés.
          </p>
        ) : (
          sections.map((section) => (
            <div key={section.id}>
              <h2
                className="animate-fade-up opacity-0 text-center text-3xl font-bold drop-shadow-sm"
                style={{ animationDelay: '0.30s', animationFillMode: 'forwards' }}
              >
                <span className="font-neco text-[#244B3A]">{section.name}</span>
              </h2>

              <div
                className="flex justify-around flex-wrap gap-6 p-8 rounded-lg animate-fade-up opacity-0"
                style={{ animationDelay: '0.30s', animationFillMode: 'forwards' }}
              >
                {section.partners.map((partner) => (
                  <PartnerCard
                    key={partner.id}
                    imageSrc={partner.imageSrc}
                    imageAlt={partner.imageAlt}
                    imageWidth={partner.imageWidth}
                    imageHeight={partner.imageHeight}
                    description={partner.description}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </SectionContainer>
  )
}
