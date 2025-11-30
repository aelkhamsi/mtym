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
import { cityLabels, foodAllergyLabels, illnessOrDisabilityLabels, nonFoodAllergyLabels, workshopLabels } from './select-options';
import { usersAtom } from '@/store/usersAtom';

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

const renderList = (valuesList: string, labels: Record<string, string>, className?: string) => {
  return (
    <ul className={`list-disc pl-4 ${className}`}> 
      {JSON.parse(valuesList ?? '[]')?.map((value: string, index: number) => 
        <li key={index}> {labels[value] ?? value} </li>
      )}
    </ul>
  )
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
  const users = useAtomValue(usersAtom)
  const participantsDetails = useAtomValue(participantDetailsAtom)
  const [participantDetails, setParticipantDetails] = useState<any>(undefined);
  const [firstRoommate, setFirstRoommate] = useState<any>(undefined);
  const [secondRoommate, setSecondRoommate] = useState<any>(undefined);
  const id = parseInt(params.id);
  const router = useRouter();
  const getUserById = (id: number) => {
    return users.find((user: any) => user.id === id)
  }

  useEffect(() => {
    if (participantsDetails) {
      const searchParticipantDetails = participantsDetails.find((details: any) => details?.id === id)
      setParticipantDetails(searchParticipantDetails)
      setFirstRoommate(getUserById(+searchParticipantDetails?.firstRoommateId))
      setSecondRoommate(getUserById(+searchParticipantDetails?.secondRoommateId))
    }
  }, [participantsDetails])

  return (
    <>
      {participantsDetails
        ? (
          <Tabs defaultValue="medical-information" className='space-y-8'>
            <div 
              className='font-semibold flex cursor-pointer'
              onClick={() => router.back()}
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
                <Field label='Allergies Alimentaires'>{renderList(participantDetails?.foodAllergy, foodAllergyLabels)}</Field>
                <Field label='Allergies non Alimentaires'>{renderList(participantDetails?.nonFoodAllergy, nonFoodAllergyLabels)}</Field>
                <Field label='En cas de réaction allergique, des précautions sont-elles nécessaires (procédure, médicament spécifiques...) ?'>{renderText(participantDetails?.allergyPrecaution)}</Field>
                <Separator />
                <Field label='Souffrez-vous d’une maladie chronique ou d’un handicap ?'>{renderList(participantDetails?.illnessOrDisability, illnessOrDisabilityLabels)}</Field>
                <Field label="Avez-vous besoin d'un aménagement ou d'une attention particulière pendant le tournoi ?">{renderText(participantDetails?.specialAccommodations)}</Field>
                <Field label="Suivez-vous actuellement un traitement médical ?">{renderText(participantDetails?.isOnMedication)}</Field>

                <Field label="Veuillez préciser les médicaments que vous prenez, et à quel moment de la journée">{renderText(participantDetails?.medication)}</Field>
                <Field label="Avez-vous besoin d'une assistance pour la prise de médicament ?">{renderText(participantDetails?.needAssistance)}</Field>
                <Field label="Avez-vous déjà été hospitalisé ?">{renderText(participantDetails?.hasBeenHospitalized)}</Field>
                <Field label="Quelles étaient les raisons de votre hospitalisation ?">{renderText(participantDetails?.hospitalizationReasons)}</Field>
              </div>
            </TabsContent>
            
            {/* Logistics */}
            <TabsContent value="logistics">
              <div className='space-y-6'>
                <Field label='Souhaites-tu partager ta chambre avec quelqu’un en particulier ?'>{renderText(participantDetails?.haveRoommatePreference)}</Field>
                <Field label='1er co-chambre'>{firstRoommate ? `${firstRoommate?.firstName} ${firstRoommate?.lastName}` : <span className='text-gray-400'>(empty)</span>}</Field>
                <Field label='2iem co-chambre'>{secondRoommate ? `${secondRoommate?.firstName} ${secondRoommate?.lastName}` : <span className='text-gray-400'>(empty)</span>}</Field>
                <Separator />
                <Field label="As-tu besoin d'une navette pour l'aller ?">{renderText(participantDetails?.needDepartureShuttle)}</Field>
                <Field label="As-tu besoin d'une navette pour le retour ?">{renderText(participantDetails?.needArrivalShuttle)}</Field>
                <Field label='Ville de résidence'>{cityLabels[participantDetails?.cityOfResidence]}</Field>
              </div>
            </TabsContent>
              
            {/* Activities & Workshops */}
            <TabsContent value="activities-workshops">
              <div className='space-y-6'>
                <Field label='Souhaites-tu présenter un talent sur scène lors du Talent Show ?'>{renderText(participantDetails?.haveTalent)}</Field>
                <Field label='Décrivez-nous votre talent, et si vous avez besoin de matériel (musique, micro, etc)'>{renderText(participantDetails?.talentDescription)}</Field>
                <Separator />
                <Field label='Workshops'>{renderList(participantDetails?.workshops, workshopLabels, 'list-decimal')}</Field>
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
