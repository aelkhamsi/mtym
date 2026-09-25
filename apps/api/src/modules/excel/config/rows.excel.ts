import { educationLevelLabelMap, educationFieldLabelMap, regionLabelMap, cityLabelMap, guardianLabelMap, yesNoLabelMap, previousParticipationLabelMap } from '@mdm/shared';

export const applicationsRowFactory = (
  applications: any[],
  configService,
  adminNames: Map<string, string>,
) => {
  const endpoint = configService.get('s3.endpoint');
  const bucketName = configService.get('s3.name');

  return applications.map((application: any) => {
    const team = application?.user?.team;
    const intermediateReports = team?.reports?.filter((report) => report.reportType === 'INTERMEDIATE') ?? [];
    const finalReports = team?.reports?.filter((report) => report.reportType === 'FINAL') ?? [];
    const finalReportLink = (problemNumber: number) => {
      const fileUrl = finalReports.find((report) => report.problemNumber === problemNumber)?.fileUrl;
      return {
        text: fileUrl ? 'link' : ' ',
        hyperlink: fileUrl ? `${endpoint}/${bucketName}/${fileUrl}` : '',
      };
    };

    return {
    id: application?.id,
    firstName: application?.user?.firstName,
    lastName: application?.user?.lastName,
    email: application?.user?.email,
    dateOfBirth: new Date(application?.dateOfBirth),
    identityCardNumber: application?.identityCardNumber,
    city: cityLabelMap[application?.city],
    updatedCity: cityLabelMap[application?.review?.updatedCity],
    region: regionLabelMap[application?.region],
    phoneNumber: application?.phoneNumber,
    allergyOrMedication: application?.allergyOrMedication,
    guardianFullName: application?.guardianFullName,
    guardianPhoneNumber: application?.guardianPhoneNumber,
    relationshipWithGuardian: guardianLabelMap[application?.relationshipWithGuardian],

    educationLevel: educationLevelLabelMap[application?.educationLevel],
    educationField: educationFieldLabelMap[application?.educationField],
    highschool: application?.highschool,
    highschoolCity: cityLabelMap[application?.highschoolCity],
    highschoolRegion: regionLabelMap[application?.highschoolRegion],
    isHighschoolFarFromHome: yesNoLabelMap[application?.isHighschoolFarFromHome],

    hasPreviousExperiences: previousParticipationLabelMap[application?.hasPreviousExperiences],
    previousExperiences: application?.previousExperiences,
    hasPreviousMTYMParticipations: previousParticipationLabelMap[application?.hasPreviousMTYMParticipations],
    previousMTYMParticipations: application?.previousMTYMParticipations,
    motivations: application?.motivations,
    comments: application?.comments,

    fileCnie: {
      text: application?.fileCnieUrl ? 'link' : ' ',
      hyperlink: application?.fileCnieUrl ? `${endpoint}/${bucketName}/${application.fileCnieUrl}` : '',
    },
    filePhoto: {
      text: application?.filePhotoUrl ? 'link' : ' ',
      hyperlink: application?.filePhotoUrl ? `${endpoint}/${bucketName}/${application.filePhotoUrl}` : '',
    },
    fileGrades: {
      text: application?.fileGradesUrl ? 'link' : ' ',
      hyperlink: application?.fileGradesUrl ? `${endpoint}/${bucketName}/${application.fileGradesUrl}` : '',
    },

    status: application?.status?.status,
    reviewer: application?.review?.reviewerId
      ? adminNames.get(String(application.review.reviewerId)) ?? 'Unknown admin'
      : 'Unassigned',

    teamId: application?.user?.team?.id,
    teamName: application?.user?.team?.name,
    teamQuadrigram: application?.user?.team?.quadrigram,
    teamStatus: application?.user?.team?.status,
    teamInterimReportsNumber: team ? intermediateReports.length : undefined,
    teamInterimReportsDecision: application?.user?.team?.review?.intermediateReportDecision,
    teamQualifCenter: application?.user?.team?.qualifCenter,
    teamFinalReportsNumber: team ? finalReports.length : undefined,
    finalReportProblem1: finalReportLink(1),
    finalReportProblem2: finalReportLink(2),
    finalReportProblem3: finalReportLink(3),
    finalReportProblem4: finalReportLink(4),
    defensePreference1: team?.finalReportRanking?.[0],
    defensePreference2: team?.finalReportRanking?.[1],
    defensePreference3: team?.finalReportRanking?.[2],
    defensePreference4: team?.finalReportRanking?.[3],
    parentalAuthorization: {
      text: application?.parentalAuthorizationUrl ? 'link' : ' ',
      hyperlink: application?.parentalAuthorizationUrl ? `${endpoint}/${bucketName}/${application.parentalAuthorizationUrl}` : '',
    },
    };
  });
};

export const participantDetailsRowFactory = (participantDetails: any[], users: any[], configService) => {
  const endpoint = configService.get('s3.endpoint');
  const bucketName = configService.get('s3.name');

  return participantDetails.map((details: any) => {
    const firstRoommate = users.find(user => user.id === +details?.firstRoommateId)
    const secondRoommate = users.find(user => user.id === +details?.secondRoommateId)

    return {
      id: details?.id,
      userId: details?.user?.id,
      firstName: details?.user?.firstName,
      lastName: details?.user?.lastName,

      gender: details?.gender,
      guardianFullName: details?.guardianFullName,
      guardianPhoneNumber: details?.guardianPhoneNumber,

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
      cityOfResidence: cityLabelMap[details?.cityOfResidence],

      haveTalent: details?.haveTalent,
      talentDescription: details?.talentDescription,
      workshops: details?.workshops,

      filePhoto: {
        text: details?.filePhotoUrl ? 'link' : ' ',
        hyperlink: details?.filePhotoUrl ? `${endpoint}/${bucketName}/${details.filePhotoUrl}` : '',
      },
      fileParentalAuthorization: {
        text: details?.fileParentalAuthorizationUrl ? 'link' : ' ',
        hyperlink: details?.fileParentalAuthorizationUrl ? `${endpoint}/${bucketName}/${details.fileParentalAuthorizationUrl}` : '',
      },

      status: details?.status,
    }
  });
};
