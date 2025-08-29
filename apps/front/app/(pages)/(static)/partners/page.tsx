import PartnerCard from "./partner-card"

const organizers = [
  {
    key: 'math-and-maroc',
    label: 'Math&Maroc',
    imageHref: '/mm.png',
    imageHeight: '60px',
  },
]

const partners = [
  {
    key: 'adria',
    label: 'Adria ',
    imageHref: '/adria_official_partner.png',
    imageHeight: '90px',
  }
]

const hosts = [
  {
    key: 'aui',
    label: 'AUI',
    imageHref: '/aui.png',
    imageHeight: '120px',
  }
]

const sponsors = [
  {
    key: 'evalmee',
    label: 'EVALMEE',
    imageHref: '/evalmee.png',
    imageHeight: '45px',
  },
  {
    key: 'ram',
    label: 'RAM',
    imageHref: '/ram.svg',
    imageHeight: '110px',
  },
  {
    key: 'afretec_network',
    label: 'Afretek Network',
    imageHref: '/afretec_network.jpeg',
    imageHeight: '160px',
  },
  {
    key: 'sidi_ali',
    label: 'Sidi Ali',
    imageHref: '/sidi_ali.png',
    imageHeight: '140px',
  },
]

export default function PartnersPage() {
  return (
    <div className="w-full max-w-sm md:max-w-7xl px-5 xl:px-0 my-28 mb-20">
      <div className="space-y-6">
        <div>
          {/* ORGANISATEUR */}
          <div>
            <h1 
              className="animate-fade-up opacity-0 text-center text-3xl font-bold drop-shadow-sm"
              style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
            >
              <span className='font-neco text-[#244B3A]'>Organisateur</span>
            </h1>

            <div
              className="flex justify-around flex-wrap gap-6 p-8 rounded-lg animate-fade-up opacity-0"
              style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
            >
              <PartnerCard
                key={organizers[0].key}
                imageSrc={organizers[0].imageHref}
                imageHeight={organizers[0].imageHeight}
              >
                <div className="text-sm space-y-2">
                  <div><span className='mb-8 bg-gradient-to-br from-sky-500 to-[#272162] text-transparent bg-clip-text font-semibold'>Math&Maroc</span> est une association à but non lucratif créée en 2016 par de jeunes Marocains souhaitant redonner à la collectivité.</div>
                  <div><span className="font-bold">Notre mission</span> est de promouvoir les mathématiques et les sciences au Maroc, et ainsi guider les jeunes vers l&apos;excellence.</div>
                  <div><span className='mb-8 bg-gradient-to-br from-sky-500 to-[#272162] text-transparent bg-clip-text font-semibold'>Math&Maroc</span> organise <span className="font-bold">MTYM</span> depuis sa première édition en mai 2024.</div>
                </div>
              </PartnerCard>
            </div>
          </div>
        </div>

        <div className="flex justify-around flex-wrap">
          {/* En partenariat avec */}
          <div>
            <h1 
              className="animate-fade-up opacity-0 text-center text-3xl font-bold drop-shadow-sm"
              style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
            >
              <span className='font-neco text-[#244B3A]'>Co-organisateur</span>
            </h1>

            <div
              className="flex justify-around flex-wrap gap-6 p-6 rounded-lg animate-fade-up opacity-0"
              style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
            >
              <PartnerCard
                key={hosts[0].key}
                imageSrc={hosts[0].imageHref}
                imageHeight={hosts[0].imageHeight}
              >
                <div className="text-sm">
                  <div><span className='mb-8 bg-gradient-to-br from-[#1d9145] to-[#166432] text-transparent bg-clip-text font-semibold'>Université Al Akhawayn (AUI)</span> est une institution d&apos;élite au Maroc, reconnue pour son excellence académique. Elle forme des leaders ouverts sur le monde, dans un cadre multiculturel et moderne.</div>
                  <div><span className='mb-8 bg-gradient-to-br from-[#1d9145] to-[#166432] text-transparent bg-clip-text font-semibold'>AUI</span> co-organise cette 3ème édition de <span className="font-bold">MTYM</span> avec <span className='mb-8 bg-gradient-to-br from-sky-500 to-[#272162] text-transparent bg-clip-text font-semibold'>Math&Maroc</span></div>
                </div>
              </PartnerCard>
            </div>
          </div>

          {/* PARTENAIRE OFFICIEL */}
          <div>
            <h1 
              className="animate-fade-up opacity-0 text-center text-3xl font-bold drop-shadow-sm"
              style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
            >
              <span className='font-neco text-[#244B3A]'>Partenaire officiel</span>
            </h1>

            <div 
              className="flex justify-around flex-wrap gap-6 p-8 rounded-lg animate-fade-up opacity-0"
              style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
            >
              <PartnerCard
                key={partners[0].key}
                imageSrc={partners[0].imageHref}
                imageHeight={partners[0].imageHeight}
              >
                <div className="text-sm space-y-2">
                  <div><span className='mb-8 bg-gradient-to-br from-stone-500 to-[#FC5C00] text-transparent bg-clip-text font-semibold'>Adria Business and Technology</span> est un expert dans l&apos;édition et l&apos;intégration des logiciels destinés aux institutions financières.</div>
                  <div>Il s&apos;agit du <span className="font-semibold">partenaire officiel</span> de <span className='mb-8 bg-gradient-to-br from-sky-500 to-[#272162] text-transparent bg-clip-text font-semibold'>Math&Maroc</span>, qui a permis à la majorité de nos événements de voir le jour.</div>
                </div>
              </PartnerCard>
            </div>
          </div>
        </div>

        <div>
          {/* SPONSORS */}
          <div>
            <h1 
              className="animate-fade-up opacity-0 text-center text-3xl font-bold drop-shadow-sm"
              style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
            >
              <span className='font-neco text-[#244B3A]'>Sponsors</span>
            </h1>

            <div
              className="flex justify-around flex-wrap gap-6 p-8 rounded-lg animate-fade-up opacity-0"
              style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
            >
              <PartnerCard
                key={sponsors[0].key}
                imageSrc={sponsors[0].imageHref}
                imageHeight={sponsors[0].imageHeight}
              >
                <div className="text-sm"><span className='mb-8 bg-gradient-to-br from-[#7cb9ff] to-[#3691FB] text-transparent bg-clip-text font-semibold'>Evalmee</span> est une plateforme d&apos;évaluation en ligne offrant des outils précis et personnalisés pour dévoiler et perfectionner les compétences. Découvrez une approche dynamique pour révéler le potentiel caché et atteindre l&apos;excellence professionnelle.</div>
              </PartnerCard>

              <PartnerCard
                key={sponsors[1].key}
                imageSrc={sponsors[1].imageHref}
                imageHeight={sponsors[1].imageHeight}
              >
                <div className="text-sm">
                  <div>La <span className='mb-8 bg-gradient-to-br from-[#f9597c] to-[#c3022d] text-transparent bg-clip-text font-semibold'>Royal Air Maroc</span>, compagnie aérienne nationale du Maroc, est une référence en matière d&apos;excellence et de service. Alliant modernité et tradition, elle relie le Maroc au monde tout en offrant une expérience de voyage unique et authentique.</div>
                </div>
              </PartnerCard>

              <PartnerCard
                key={sponsors[2].key}
                imageSrc={sponsors[2].imageHref}
                imageHeight={sponsors[2].imageHeight}
              >
                <div className="text-sm"><span className='mb-8 text-[#084981] font-semibold'>Afretec</span> est un réseau panafricain d&apos;universités technologiques, mené par Carnegie Mellon University Africa, pour accélérer la transformation numérique du continent. Il favorise l&apos;enseignement, la recherche et l&apos;entrepreneuriat inclusifs en ingénierie et technologie.</div>
              </PartnerCard>

              <PartnerCard
                key={sponsors[3].key}
                imageSrc={sponsors[3].imageHref}
                imageHeight={sponsors[3].imageHeight}
              >
                <div className="text-sm"><span className='mb-8 text-[#084981] font-semibold'>Sidi Ali</span> est une entreprise engagée à offrir une eau minérale naturelle d'une pureté exceptionnelle, puisée au cœur des montagnes marocaines. <br/>Elle s&apos;impose comme un leader emblématique alliant qualité, tradition et innovation.</div>
              </PartnerCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}