"use client"

import { Label } from '@/components/shared/label'
import Separator from '@/components/shared/separator';
import React, { ReactNode, useEffect, useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shared/tabs";
import { useRouter } from 'next/navigation';
import { ExpandingArrow } from '@/components/shared/icons';
import ApplicationStatus from '../components/application-status';
import FilesTable from './files-table';
import { useAtomValue } from 'jotai';
import { participantDetailsAtom } from '@/store/participantDetailsAtom';

const booleanLabels = {
  "yes": "Oui",
  "no": "Non",
  "not-selected": "J'ai postulé, mais je n'ai pas été sélectionné."
} as any;

const renderText = (value: any) => {
  return value
    ? value
    : <span className='text-gray-400'>(empty)</span>
}

const Field = ({
  label,
  children,
}: {
  label: string,
  children: ReactNode,
}) => {
  return <div>
    <Label className='text-[#272162] font-semibold'>{label}</Label>
    <p>{children}</p>
  </div>
}

export default function ApplicationDetailsPage({ params }: { params: { id: string } }) {
  const participantsDetails = useAtomValue(participantDetailsAtom)
  const [participantDetails, setParticipantDetails] = useState<any>(undefined);
  const id = parseInt(params.id);
  const router = useRouter();

  useEffect(() => {
    if (participantsDetails) {
      const searchParticipantDetails = participantsDetails.find((details: any) => details?.id === id)
      setParticipantDetails(searchParticipantDetails)
    }
  }, [participantsDetails])

  return (
    <>
      {participantsDetails
        ? (
          <Tabs defaultValue="medical-information" className='space-y-8'>
            <div 
              className='font-semibold flex cursor-pointer'
              onClick={() => router.push('/home/applications')}
            >
              <ExpandingArrow className='rotate-180 mr-2'/> {"  "} Back
            </div>

            <div 
              className='font-semibold text-2xl flex justify-between'
            >
              <div>
                Participant Details of <span className='bg-gradient-to-br from-sky-800 to-[#272162] inline-block text-transparent bg-clip-text'>{participantDetails?.user?.firstName} {participantDetails?.user?.lastName}</span>
              </div>

              <ApplicationStatus status={participantDetails?.status} />
            </div>

            <TabsList className="flex justify-start space-x-8 h-[4rem] bg-slate-200 text-black">
              <TabsTrigger value="medical-information" className='text-base h-full'>Medical Information</TabsTrigger>
              <TabsTrigger value="logistics" className='text-base h-full'>Logistics</TabsTrigger>
              <TabsTrigger value="activities-workshops" className='text-base h-full'>Activities & Workshops</TabsTrigger>
              <TabsTrigger value="uploads" className='text-base h-full'>Uploads</TabsTrigger>
            </TabsList>
            <Separator className="my-6" />

            {/* PERSONAL INFORMARIONS */}
            <TabsContent value="medical-information">
              <div className='space-y-6'>
                <Field label='Genre'>{renderText(participantDetails?.gender)}</Field>
                <Separator />
                <Field label='Allergies Alimentaires'>{renderText(participantDetails?.foodAllergy)}</Field>
                <Field label='Allergies non Alimentaires'>{renderText(participantDetails?.nonFoodAllergy)}</Field>
                <Field label='En cas de réaction allergique, des précautions sont-elles nécessaires (procédure, médicament spécifiques...) ?'>{renderText(participantDetails?.allergyPrecaution)}</Field>
                <Separator />
                <Field label='Souffrez-vous d’une maladie chronique ou d’un handicap ?'>{renderText(participantDetails?.illnessOrDisability)}</Field>
                <Field label="Avez-vous besoin d'un aménagement ou d'une attention particulière pendant le tournoi ?">{renderText(participantDetails?.specialAccommodations)}</Field>
                <Field label="Suivez-vous actuellement un traitement médical ?">{renderText(participantDetails?.isOnMedication)}</Field>

                <Field label="Veuillez préciser les médicaments que vous prenez, et à quel moment de la journée">{renderText(participantDetails?.medication)}</Field>
                <Field label="Avez-vous besoin d'une assistance pour la prise de médicament ?">{renderText(participantDetails?.needAssistance)}</Field>
                <Field label="Avez-vous déjà été hospitalisé ?">{renderText(participantDetails?.hasBeenHospitalized)}</Field>
                <Field label="Quelles étaient les raisons de votre hospitalisation ?">{renderText(participantDetails?.hospitalizationReasons)}</Field>
              </div>
            </TabsContent>
            
            {/* EDUCATION */}
            <TabsContent value="logistics">
              <div className='space-y-6'>
                <Field label='Souhaites-tu partager ta chambre avec quelqu’un en particulier ?'>{renderText(participantDetails?.haveRoommatePreference)}</Field>
                <Field label='1er co-chambre'>{renderText(participantDetails?.firstRoommateId)}</Field>
                <Field label='2iem co-chambre'>{renderText(participantDetails?.secondRoommateId)}</Field>
                <Separator />
                <Field label="As-tu besoin d'une navette pour l'aller ?">{renderText(participantDetails?.needDepartureShuttle)}</Field>
                <Field label="As-tu besoin d'une navette pour le retour ?">{renderText(participantDetails?.needArrivalShuttle)}</Field>
                <Field label='Ville de résidence'>{renderText(participantDetails?.cityOfResidence)}</Field>
              </div>
            </TabsContent>
              
            {/* COMPETTION */}
            <TabsContent value="activities-workshops">
              <div className='space-y-6'>
                <Field label='Souhaites-tu présenter un talent sur scène lors du Talent Show ?'>{renderText(participantDetails?.haveTalent)}</Field>
                <Field label='Décrivez-nous votre talent, et si vous avez besoin de matériel (musique, micro, etc)'>{renderText(participantDetails?.talentDescription)}</Field>
                <Separator />
                <Field label='Workshops'>{renderText(participantDetails?.workshops)}</Field>
              </div>
            </TabsContent>
            
            {/* UPLOADS */}
            <TabsContent value="uploads">
              <div className='md:flex space-y-4 md:space-x-4 md:space-y-0 mt-8'>
                <FilesTable participantDetails={participantDetails} />
              </div>
            </TabsContent>
          </Tabs>
        )
        : <></>
      }
    </>
  )
}
