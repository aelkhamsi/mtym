const arrayFields = ['foodAllergy', 'nonFoodAllergy']

export const parseFormData = (participantDetails: any) => {
  const newObject = {} as any;
  Object.keys(participantDetails).forEach((key) => {
    newObject[key] = arrayFields.includes(key)
      ? JSON.parse(participantDetails[key])
      : participantDetails[key]===null ? "" : participantDetails[key]
  });
  return newObject;
}

export const stringifyFormData = (participantDetails: any) => {
  const newObject = {} as any;
  Object.keys(participantDetails).forEach((key) => {
    newObject[key] = arrayFields.includes(key)
      ? JSON.stringify(participantDetails[key])
      : participantDetails[key]
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