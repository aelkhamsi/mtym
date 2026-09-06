import { cityLabelMap, educationFieldLabelMap, educationLevelLabelMap, guardianLabelMap, previousParticipationLabelMap, regionLabelMap, yesNoLabelMap } from "@mdm/shared"
import { formatDate } from "@mdm/utils"
import { ReactNode } from "react"
import FilePreviewButton from "../../components/file/file-preview-button"

export type Field = {
  label: string
  value: ReactNode
}

export type ApplicationSections = {
  personal: Field[]
  education: Field[]
  motivation: Field[]
  documents: Field[]
}

export function getApplicationSections(
  application?: any,
): ApplicationSections {
  if (!application) {
    return {
      personal: [],
      education: [],
      motivation: [],
      documents: [],
    }
  }

  return {
    personal: [
      { label: "First Name", value: application.firstName },
      { label: "Last Name", value: application.lastName },
      { label: "Date of Birth", value: formatDate(application.dateOfBirth) },
      { label: "Identity Card Number", value: application.identityCardNumber },
      { label: "City", value: cityLabelMap[application.city] },
      { label: "Region", value: regionLabelMap[application.region] },
      { label: "Phone Number", value: application.phoneNumber },
      { label: "Allergy / Medication", value: application.allergyOrMedication },
      { label: "Guardian Full Name", value: application.guardianFullName },
      { label: "Guardian Phone Number", value: application.guardianPhoneNumber },
      { label: "Relationship with Guardian", value: guardianLabelMap[application.relationshipWithGuardian] },
    ],

    education: [
      { label: "Education Level", value: educationLevelLabelMap[application.educationLevel] },
      { label: "Education Field", value: educationFieldLabelMap[application.educationField] },
      { label: "High School Name", value: application.highschool },
      { label: "High School City", value: cityLabelMap[application.highschoolCity] },
      { label: "High School Region", value: regionLabelMap[application.highschoolRegion] },
      { label: "High School Far From Home", value: yesNoLabelMap[application.isHighschoolFarFromHome] },
    ],

    motivation: [
      { label: "Has participated in competitions before", value: previousParticipationLabelMap[application.hasPreviousExperiences] },
      { label: "Previous Competitions", value: application.previousExperiences },
      { label: "Has participated in MTYM 2024", value: previousParticipationLabelMap[application.hasPreviousMTYMParticipations] },
      { label: "Previous MTYM Team", value: application.previousMTYMParticipations },
      { label: "Motivations", value: application.motivations },
      { label: "Comments", value: application.comments },
    ],

    documents: [
      { label: 'CNIE', value: application?.fileCnieUrl ? <FilePreviewButton filename={application.fileCnieUrl} /> : null },
      { label: 'Photo', value: application?.filePhotoUrl ? <FilePreviewButton filename={application.filePhotoUrl} /> : null },
      { label: 'Grades', value: application?.fileGradesUrl ? <FilePreviewButton filename={application.fileGradesUrl} /> : null },
    ]
  }
}