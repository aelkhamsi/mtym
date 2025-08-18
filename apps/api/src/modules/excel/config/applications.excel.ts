import { educationLevels, regionLabels, universityTypes } from '../labels';

export const rowFactory = (applications: any[], configService) => {
  const awsBucketName = configService.get('AWS_BUCKET_NAME');
  const awsBucketRegion = configService.get('AWS_BUCKET_REGION');

  return applications.map((application: any) => ({
    id: application?.id,
    firstName: application?.user?.firstName,
    lastName: application?.user?.lastName,
    email: application?.user?.email,
    dateOfBirth: new Date(application?.dateOfBirth),
    identityCardNumber: application?.identityCardNumber,
    city: application?.city,
    region: regionLabels[application?.region],
    phoneNumber: application?.phoneNumber,
    emergencyContactFullName: application?.emergencyContactFullName,
    emergencyContactPhoneNumber: application?.emergencyContactPhoneNumber,
    emergencyContactRelationship: application?.emergencyContactRelationship,

    educationLevel: educationLevels.find(
      (level) => level.value == application?.educationLevel,
    )?.label,
    universityType: universityTypes.find(
      (type) => type.value == application?.universityType,
    )?.label,
    educationField: application?.educationField,
    universityName: application?.universityName,

    hasPreviousMathMarocParticipations:
      application?.hasPreviousMathMarocParticipations,
    previousMathMarocParticipations:
      application?.previousMathMarocParticipations,
    hasPreviousExperiences: application?.hasPreviousExperiences,
    previousExperiences: application?.previousExperiences,
    motivations: application?.motivations,
    comments: application?.comments,

    fileCnie: {
      text: application?.fileCnieUrl ? 'link' : ' ',
      hyperlink: `https://${awsBucketName}.s3.${awsBucketRegion}.amazonaws.com/${application?.fileCnieUrl}`,
    },
    fileSchoolCertificateUrl: {
      text: application?.fileSchoolCertificateUrl ? 'link' : ' ',
      hyperlink: `https://${awsBucketName}.s3.${awsBucketRegion}.amazonaws.com/${application?.fileSchoolCertificateUrl}`,
    },
    fileGrades: {
      text: application?.fileGradesUrl ? 'link' : ' ',
      hyperlink: `https://${awsBucketName}.s3.${awsBucketRegion}.amazonaws.com/${application?.fileGradesUrl}`,
    },
    fileRegulationsUrl: {
      text: application?.fileRegulationsUrl ? 'link' : ' ',
      hyperlink: `https://${awsBucketName}.s3.${awsBucketRegion}.amazonaws.com/${application?.fileRegulationsUrl}`,
    },

    status: application?.status?.status,
  }));
};
