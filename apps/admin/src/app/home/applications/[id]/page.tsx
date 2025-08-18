"use client"

import { Label } from '@/components/shared/label'
import Separator from '@/components/shared/separator';
import { formatDate } from '@/lib/utils'
import { applicationsState } from '@/store/applicationsState';
import React, { ReactNode, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
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

const regionLabels = {
  'tanger-tetouan-al-houceima': "Tanger-Tétouan-Al Hoceïma",
  'oriental': "Oriental",
  'fes-meknes': "Fès-Meknès",
  'rabat-sale-kenitra': "Rabat-Salé-Kénitra",
  'beni-mellal-khenifra': "Béni Mellal-Khénifra",
  'casablanca-settat': "Casablanca-Settat",
  'marrakech-safi': "Marrakech-Safi",
  'draa-tafilalet': "Drâa-Tafilalet",
  'souss-massa': "Souss-Massa",
  'guelmim-oued-noun': "Guelmim-Oued Noun",
  'laayoune-sakia-el-hamra': "Laâyoune-Sakia El Hamra",
  'dakhla-oued-eddahab': "Dakhla-Oued Eddahab",
  'abroad': "Abroad",
} as any;

const relationshipWithGuardianLabels = {
  'father': 'Father',
  'mother': 'Mother',
  'guardian': 'Tutor',
  'other': 'Other'
} as any;

const educationLevelLabels = {
  "bac-plus-1": "Bac +1",
  "bac-plus-2": "Bac +2",
  "bac-plus-3": "Bac +3",
  "bac-plus-4": "Bac +4",
} as any;

const universityTypesLabels = {
  "cpge": "Classes préparatoires (CPGE)",
  "university": "University",
  "engineering-post-bac": "Engineering School post-Bac",
  "engineering-post-cpge": "Engineering School post-CPGE",
} as any;

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
  const [applications, _] = useRecoilState(applicationsState);
  const [application, setApplication] = useState<any>(undefined);
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
                <Field label='City of residence'>{renderText(application?.city)}</Field>
                <Field label='Region of residence'>{renderText(regionLabels[application?.region])}</Field>
                <Field label='Phone number'>{renderText(application?.phoneNumber)}</Field>
                <Separator className="my-6" />
                <Field label='Emergency Contact Full Name'>{renderText(application?.emergencyContactFullName)}</Field>
                <Field label='Emergency Contact Phone Number'>{renderText(application?.emergencyContactPhoneNumber)}</Field>
                <Field label='Emergency Contact Relationship'>{renderText(relationshipWithGuardianLabels[application?.emergencyContactRelationship])}</Field>
              </div>
            </TabsContent>
            
            {/* EDUCATION */}
            <TabsContent value="education">
              <div className='space-y-6'>
                <Field label='Education Level'>{renderText(educationLevelLabels[application?.educationLevel])}</Field>
                <Field label='University Type'>{renderText(universityTypesLabels[application?.universityType])}</Field>
                <Field label='University Name'>{renderText(application?.universityName)}</Field>
                <Field label='Field of study'>{renderText(application?.educationField)}</Field>               
              </div>
            </TabsContent>
              
            {/* COMPETTION */}
            <TabsContent value="competition">
              <div className='space-y-6'>
                <Field label='Have you taken part in competitions before (Olympiads, concour, etc.)?'>{renderText(booleanLabels[application?.hasPreviousExperiences])}</Field>
                <Field label='Please specify which ones and the result obtained'>{renderText(application?.previousExperiences)}</Field>

                <Separator />

                <Field label='Have you ever taken part in Math Maroc Competition (MMC)?'>{renderText(booleanLabels[application?.hasPreviousMathMarocParticipations])}</Field>
                <Field label='Please specify in which edition (2023 or 2024) and what was your ranking'>{renderText(application?.previousMathMarocParticipations)}</Field>

                <Separator />
                
                <Field label='Motivations'>{renderText(application?.motivations)}</Field>
                <Field label='Comments'>{renderText(application?.comments)}</Field>
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
