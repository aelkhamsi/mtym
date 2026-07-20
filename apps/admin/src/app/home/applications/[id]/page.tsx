"use client"

import { Label } from '@/components/shared/label'
import Separator from '@/components/shared/separator';
import { formatDate } from '@/lib/utils'
import React, { ReactNode, useEffect, useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shared/tabs";
import { useParams, useRouter } from 'next/navigation';
import { ExpandingArrow } from '@/components/shared/icons';
import ApplicationStatus from '../components/application-status';
import FilesTable from './files-table';
import { useAtomValue } from 'jotai';
import { applicationsAtom } from '@/store/applicationsAtom';
import {
  cityLabelMap,
  educationFieldLabelMap,
  educationLevelLabelMap,
  guardianLabelMap,
  previousParticipationLabelMap,
  regionLabelMap,
  yesNoLabelMap,
} from '@mdm/shared';

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

export default function ApplicationDetailsPage() {
  const applications = useAtomValue(applicationsAtom)
  const [application, setApplication] = useState<any>(undefined);
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id);
  const router = useRouter();

  useEffect(() => {
    if (applications) {
      const searchResult = applications.find((application: any) => application?.id === id)
      setApplication(searchResult)
    }
  }, [applications])

  return (
    <>
      {application
        ? (
          <Tabs defaultValue="personal-informations" className='space-y-8'>
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
                Application of <span className='bg-gradient-to-br from-sky-800 to-[#272162] inline-block text-transparent bg-clip-text'>{application?.firstName} {application?.lastName}</span>
              </div>

              <ApplicationStatus applicationId={application?.id} status={application?.status?.status} />
            </div>

            <TabsList className="flex justify-start space-x-8 h-[4rem] bg-slate-200 text-black">
              <TabsTrigger value="personal-informations" className='text-base h-full'>Personal Informations</TabsTrigger>
              <TabsTrigger value="education" className='text-base h-full'>Education</TabsTrigger>
              <TabsTrigger value="competition" className='text-base h-full'>Motivation</TabsTrigger>
              <TabsTrigger value="uploads" className='text-base h-full'>Uploads</TabsTrigger>
            </TabsList>
            <Separator className="my-6" />

            {/* PERSONAL INFORMARIONS */}
            <TabsContent value="personal-informations">
              <div className='space-y-6'>
                <Field label='First name'>{renderText(application?.firstName)}</Field>
                <Field label='Last name'>{renderText(application?.lastName)}</Field>
                <Field label='Date of birth'>{renderText(formatDate(application?.dateOfBirth))}</Field>
                <Field label='CNIE number'>{renderText(application?.identityCardNumber)}</Field>
                <Field label='City of residence'>{renderText(cityLabelMap[application?.city])}</Field>
                <Field label='Region of residence'>{renderText(regionLabelMap[application?.region])}</Field>
                <Field label='Phone number'>{renderText(application?.phoneNumber)}</Field>
                <Field label='Allergies or Medication'>{renderText(application?.allergyOrMedication)}</Field>
                <hr/>
                <Field label='Guardian Full Name'>{renderText(application?.guardianFullName)}</Field>
                <Field label='Guardian Phone Number'>{renderText(application?.guardianPhoneNumber)}</Field>
                <Field label='Relationship with Guardian'>{renderText(guardianLabelMap[application?.relationshipWithGuardian])}</Field>
              </div>
            </TabsContent>
            
            {/* EDUCATION */}
            <TabsContent value="education">
              <div className='space-y-6'>
                <Field label='Education Level'>{renderText(educationLevelLabelMap[application?.educationLevel])}</Field>
                <Field label='University Type'>{renderText(educationFieldLabelMap[application?.educationField])}</Field>
                <Field label='Highschool Name'>{renderText(application?.highschool)}</Field>
                <Field label='Highschool City'>{renderText(cityLabelMap[application?.highschoolCity])}</Field>
                <Field label='Highschool Region'>{renderText(regionLabelMap[application?.highschoolRegion])}</Field>
                <Field label='Is highschool far from home?'>{renderText(yesNoLabelMap[application?.isHighschoolFarFromHome])}</Field>
              </div>
            </TabsContent>
              
            {/* COMPETTION */}
            <TabsContent value="competition">
              <div className='space-y-6'>
                <Field label='Avez-vous déjà participé à des compétitions auparavant ? (Olympiades, concours, etc.)?'>{renderText(previousParticipationLabelMap[application?.hasPreviousExperiences])}</Field>
                <Field label='Veuillez préciser lesquels et le résultat obtenu.'>{renderText(application?.previousExperiences)}</Field>

                <Separator />

                <Field label='Avez-vous participé à MTYM en Mai 2024 ou en Décembre 2024 ?'>{renderText(previousParticipationLabelMap[application?.hasPreviousMTYMParticipations])}</Field>
                <Field label='Veuillez préciser le nom de votre équipe'>{renderText(application?.previousMTYMParticipations)}</Field>

                <Separator />
                
                <Field label='Motivations'>{renderText(application?.motivations)}</Field>
                <Field label='Commentaires'>{renderText(application?.comments)}</Field>
              </div>
            </TabsContent>
            
            {/* UPLOADS */}
            <TabsContent value="uploads">
              <div className='md:flex space-y-4 md:space-x-4 md:space-y-0 mt-8'>
                <FilesTable application={application} />
              </div>
            </TabsContent>
          </Tabs>
        )
        : <></>
      }
    </>
  )
}
