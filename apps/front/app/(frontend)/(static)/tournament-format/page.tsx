import CtaSection from "@/app/components/cta/cta-section"
import SectionContainer from "@/app/components/section-container";
import Image from 'next/image'

export default function SelectionPage() {
  return (
    <SectionContainer className='pt-24 pb-20 z-0'>
      
      <div className="space-y-6">
        <h1 className="text-center text-4xl text-[#244B3A] font-bold font-neco">
          Format du tournoi
        </h1>

        <p className="text-center">
          Le MTYM se déroule en deux grandes étapes : une <span className="font-semibold">phase de qualification</span> ouverte à tous·tes, suivie d&apos;une <span className="font-semibold">phase finale</span> nationale qui réunit les meilleures équipes sélectionnées sur la base du mérite.
        </p>

        <div
          className="flex flex-col w-full md:flex-row md:justify-between md:space-x-8"
        >
          <div className="w-full space-y-4 p-4">
            <p className='font-bold text-sm text-[#F6A806]'>Phase de qualification</p>
            <h1 className='font-bold text-3xl'>Tournois régionaux</h1>
            
            <p>La phase de qualification commence dès l&apos;inscription et se poursuit jusqu&apos;en octobre 2026 avec les tournois régionaux.</p>
            <p>Les participant·es, regroupé·es en équipes de 3 à 5 membres, travaillent sur des problèmes de recherche publiés le <span className="font-semibold">30 juin 2026</span>. Ces problèmes demandent de la réflexion, de l&apos;exploration et une vraie démarche scientifique.</p>
            <p>Les équipes soumettent un rapport intermédiaire avant le <span className="font-semibold">7 septembre 2026</span>. Ce document permet une première évaluation du travail réalisé et sert de base à la sélection pour les tournois régionaux.</p>
            <p>Les équipes retenues sont ensuite invitées à participer aux tournois régionaux organisés dans leur zone géographique.</p>

            <p><span className="font-semibold">Les tournois régionaux</span> se déroulent en <span className="font-semibold">octobre 2026</span> dans 9 villes à travers le Maroc. Chaque tournoi est organisé sur une journée, avec un accueil le matin et des débats scientifiques tout au long de la journée.</p>
            <p>Chaque équipe reçoit une convocation par email précisant son centre de participation.</p>
          </div>

          <div className="w-full space-y-4 p-4">
            <p className='font-bold text-sm text-[#F6A806]'>&#8203;</p>
            <h1 className='font-bold text-3xl'>&#8203;</h1>
            
            <p><span className="font-semibold">Les villes hôtes</span> qui acceuilleront les tournois régionaux sont:</p>


            <ul className="ml-4 list-disc">
              <li>Fès (Université Privée de Fès)</li>
              <li>Oujda (Fondation Omar Ibn Abdelaziz)</li>
              <li>Casablanca (lieu à confirmer)</li>
              <li>Rabat (UM6P)</li>
              <li>Benguerir (UM6P)</li>
              <li>Martil (Lymed)</li>
              <li>Errachidia (lieu à confirmer)</li>
              <li>Agadir (Lycée Annayir)</li>
              <li>Laâyoune (UM6P)</li>
            </ul>

            <Image alt='tournament cities' src='/images/tournament/tournament_cities.png' width={300} height={300} />

          </div>
        </div>
        
        <div
          className="flex flex-col w-full md:flex-row md:justify-between md:space-x-8"
        >
          <div className="w-full space-y-4 p-4">
            <p className='font-bold text-sm text-[#F6A806]'>Phase finale</p>
            <h1 className='font-bold text-3xl'>Tournoi national</h1>
            
            <p>Le Tournoi National MTYM se déroule en décembre 2026 sur 4 à 5 jours (lieu à confirmer).</p>
            <p>À l&apos;issue des tournois régionaux, environ 35 équipes sont sélectionnées par le Comité Scientifique sur la base de la qualité de leur travail et de leurs performances.</p>
            <p>La phase finale rassemble les meilleures équipes du pays pour une série de débats scientifiques de haut niveau.</p>
            <p>Chaque équipe participe à deux rounds, en présentant, défendant et discutant ses solutions devant un·e jury et les autres participant·es.</p>
          </div>

          <div className="w-full space-y-4 p-4">
            <p className='font-bold text-sm text-[#F6A806]'>&#8203;</p>
            <h1 className='font-bold text-3xl'>&#8203;</h1>
            
            <p>En parallèle de la compétition, les participant·es profitent d&apos;un programme riche :</p>

            <ul className="ml-4 list-disc">
              <li>Ateliers en mathématiques, informatique et intelligence artificielle</li>
              <li>Sessions d&apos;orientation académique et scientifique</li>
              <li>Échanges avec des étudiants et chercheurs</li>
              <li>Activités ludiques et conviviales</li>
            </ul>

            <p>L&apos;objectif est de créer une expérience à la fois exigeante, formatrice et humaine.</p>
          </div>
        </div>

        <div className="flex justify-center">
          <CtaSection/>
        </div>
      </div>
    </SectionContainer>
  )
}
