import TextureBg from "@/app/components/texture-bg"
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
    key: 'um6p_cc',
    label: 'UM6P CC',
    imageHref: '/um6p_cc.png',
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
    key: 'oncf',
    label: 'ONCF',
    imageHref: '/oncf.svg',
    imageHeight: '90px',
  },
  {
    key: 'ram',
    label: 'RAM',
    imageHref: '/ram.svg',
    imageHeight: '110px',
  },
]

export default function PartnersPage() {
  return (
    <TextureBg className="bg-[#fff9f3]">
      <div className="w-full max-w-sm md:max-w-7xl px-5 xl:px-0 mt-10 mb-20">
        <div className="space-y-6">
          <div>
            {/* ORGANISATEUR */}
            <div>
              <h1 
                className="animate-fade-up opacity-0 text-center text-3xl font-bold drop-shadow-sm"
                style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
              >
                <span className='font-neco'>Organizer</span>
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
                    <div><span className='mb-8 bg-gradient-to-br from-sky-500 to-[#272162] text-transparent bg-clip-text font-semibold'>Math&Maroc</span> is a non-profit organization established in 2016 by young Moroccans eager to give back to the community.</div>
                    <div><span className="font-bold">Our mission</span> is to promote mathematics and science in Morocco, inspire and guide youth towards excellence, and contribute to the development of our country.</div>
                  </div>
                </PartnerCard>
              </div>
            </div>
          </div>

          <div className="flex justify-around flex-wrap">
            {/* PARTENAIRE OFFICIEL */}
            <div>
              <h1 
                className="animate-fade-up opacity-0 text-center text-3xl font-bold drop-shadow-sm"
                style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
              >
                <span className='font-neco'>Official Partner</span>
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
                    <div><span className='mb-8 bg-gradient-to-br from-stone-500 to-[#FC5C00] text-transparent bg-clip-text font-semibold'>Adria Business and Technology</span> is an expert in the development and integration of software for financial institutions.</div>
                    <div>It is the <span className="font-semibold">official partner</span> of <span className='mb-8 bg-gradient-to-br from-sky-500 to-[#272162] text-transparent bg-clip-text font-semibold'>Math&Maroc</span>, enabling the majority of our events to come to life.</div>
                  </div>
                </PartnerCard>
              </div>
            </div>

            {/* En partenariat avec */}
            <div>
              <h1 
                className="animate-fade-up opacity-0 text-center text-3xl font-bold drop-shadow-sm"
                style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
              >
                <span className='font-neco'>Host</span>
              </h1>

              <div
                className="flex justify-around flex-wrap gap-6 p-8 rounded-lg animate-fade-up opacity-0"
                style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
              >
                <PartnerCard
                  key={hosts[0].key}
                  imageSrc={hosts[0].imageHref}
                  imageHeight={hosts[0].imageHeight}
                >
                  <div className="text-sm">
                    <div>The <span className="text-slate-800 font-semibold">UM6P College of Computing</span>, located at <span className='text-[#FF4925] font-semibold'>Mohammed VI Polytechnic University (UM6P)</span> in Benguerir,  establishes itself as a leading institution in Computer Science education and research, offering world-class university education led by esteemed professors, while promoting innovation in Computer Science.</div>
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
                <span className='font-neco'>Sponsors</span>
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
                  <div className="text-sm"><span className='mb-8 bg-gradient-to-br from-[#7cb9ff] to-[#3691FB] text-transparent bg-clip-text font-semibold'>Evalmee</span> is a remote examination platform that is simple, secure, and educational. Its goal is to support teachers and students towards comprehensive and caring education.</div>
                </PartnerCard>

                <PartnerCard
                  key={sponsors[1].key}
                  imageSrc={sponsors[1].imageHref}
                  imageHeight={sponsors[1].imageHeight}
                >
                  <div className="text-sm">
                    <span className='mb-8 text-[#f47216] font-semibold'>ONCF Partenaire Transport (Office National des Chemins de Fer)</span> is Morocco&apos;s national railway company.<br/>
                    As a key player in transportation and infrastructure, ONCF supports educational and scientific initiatives that contribute to the country&apos;s development.
                  </div>
                </PartnerCard>

                <PartnerCard
                  key={sponsors[2].key}
                  imageSrc={sponsors[2].imageHref}
                  imageHeight={sponsors[2].imageHeight}
                >
                  <div className="text-sm">
                    <span className='mb-8 text-[#c20831] font-semibold'>Royal Air Maroc (RAM)</span> is the national airline of Morocco.<br/>
                    As a leading African carrier, RAM supports educational and cultural initiatives that promote knowledge, innovation, and international collaboration.
                  </div>
                </PartnerCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TextureBg>
  )
}