import { educationLevels, regionLabels, educationFields } from '../labels';

export const rowFactory = (applications: any[], configService) => {
  const awsBucketName = configService.get('AWS_BUCKET_NAME');
  const awsBucketRegion = configService.get('AWS_BUCKET_REGION');
  console.log('team', applications[0].user?.team);

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

    educationLevel: educationLevels.find(
      (level) => level.value == application?.educationLevel,
    )?.label,
    educationField: educationFields.find(
      (level) => level.value == application?.educationField,
    )?.label,
    universityType: application?.highschool,

    averageGrade: application?.averageGrade,
    mathAverageGrade: application?.mathAverageGrade,
    ranking: application?.ranking,
    mathRanking: application?.mathRanking,
    numberOfStudentsInClass: application?.numberOfStudentsInClass,

    hasPreviousExperiences: application?.hasPreviousExperiences,
    previousExperiences: application?.previousExperiences,
    hasPreviousMTYMParticipations: application?.hasPreviousMTYMParticipations,
    previousMTYMParticipations: application?.previousMTYMParticipations,
    motivations: application?.motivations,
    comments: application?.comments,

    fileGrades: {
      text: application?.fileGradesUrl ? 'link' : ' ',
      hyperlink: `https://${awsBucketName}.s3.${awsBucketRegion}.amazonaws.com/${application?.fileGradesUrl}`,
    },
    fileRegulationsUrl: {
      text: application?.fileRegulationsUrl ? 'link' : ' ',
      hyperlink: `https://${awsBucketName}.s3.${awsBucketRegion}.amazonaws.com/${application?.fileRegulationsUrl}`,
    },
    fileCnieUrl: {
      text: application?.fileCnieUrl ? 'link' : ' ',
      hyperlink: `https://${awsBucketName}.s3.${awsBucketRegion}.amazonaws.com/${application?.fileCnieUrl}`,
    },

    status: application?.status?.status,

    teamId: application?.user?.team?.id,
    teamName: application?.user?.team?.name,
    teamQuadrigram: application?.user?.team?.quadrigram,
  }));
};
