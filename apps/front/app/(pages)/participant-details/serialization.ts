export const sanitizeApplication = (application: any) => {
  const newObject = {} as any;
  Object.keys(application).forEach((key) => {
    newObject[key] = (key === 'dateOfBirth')
      ? new Date(application[key])
      : key === 'activityChoices' || key === 'standMembers'
        ? JSON.parse(application[key])
        : application[key]===null ? "" : application[key]
  });
  return newObject;
}

export const excludeFileFields = ({
  status,
  fileCnie,
  fileSchoolCertificate,
  fileGrades,
  fileRegulations,
  termsAgreement,
  ...keep
}: any) => keep

export const serializeApplication = (application: any) => {
  const newObject = {} as any;
  Object.keys(application).forEach((key) => {
    newObject[key] = (key === 'activityChoices' || key === 'standMembers')
      ? JSON.stringify(application[key])
      : application[key]
  });
  return newObject;
}