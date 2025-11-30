import { educationLevels, regionLabels, educationFields, cityLabels } from '../labels';

export const applicationsRowFactory = (applications: any[], configService) => {
  const awsBucketName = configService.get('s3.name');
  const awsBucketRegion = configService.get('s3.region');

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

export const participantDetailsRowFactory = (participantDetails: any[], users: any[], configService) => {
  const awsBucketName = configService.get('s3.name');
  const awsBucketRegion = configService.get('s3.region');

  return participantDetails.map((details: any) => {
    const firstRoommate = users.find(user => user.id === +details?.firstRoommateId)
    const secondRoommate = users.find(user => user.id === +details?.secondRoommateId)

    return {
      id: details?.id,
      userId: details?.user?.id,
      firstName: details?.user?.firstName,
      lastName: details?.user?.lastName,

      gender: details?.gender,

      foodAllergy: details?.foodAllergy,
      nonFoodAllergy: details?.nonFoodAllergy,
      allergyPrecaution: details?.allergyPrecaution,

      illnessOrDisability: details?.illnessOrDisability,
      isOnMedication: details?.isOnMedication,
      medication: details?.medication,
      needAssistance: details?.needAssistance,
      specialAccommodations: details?.specialAccommodations,
      hasBeenHospitalized: details?.hasBeenHospitalized,
      hospitalizationReasons: details?.hospitalizationReasons,

      haveRoommatePreference: details?.haveRoommatePreference,
      firstRoommate: firstRoommate ? `${firstRoommate?.firstName} ${firstRoommate?.lastName}` : '',
      secondRoommate: secondRoommate ? `${secondRoommate?.firstName} ${secondRoommate?.lastName}` : '',

      needDepartureShuttle: details?.needDepartureShuttle,
      needArrivalShuttle: details?.needArrivalShuttle,
      cityOfResidence: cityLabels[details?.cityOfResidence],

      haveTalent: details?.haveTalent,
      talentDescription: details?.talentDescription,
      workshops: details?.workshops,

      filePhoto: {
        text: details?.filePhotoUrl ? 'link' : ' ',
        hyperlink: `https://${awsBucketName}.s3.${awsBucketRegion}.amazonaws.com/${details?.filePhotoUrl}`,
      },
      fileParentalAuthorization: {
        text: details?.fileParentalAuthorizationUrl ? 'link' : ' ',
        hyperlink: `https://${awsBucketName}.s3.${awsBucketRegion}.amazonaws.com/${details?.fileParentalAuthorizationUrl}`,
      },

      status: details?.status,
    }
  });
};

