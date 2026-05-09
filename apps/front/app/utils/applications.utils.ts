type Transformer = (value: any) => any;

const parseTransformers: Record<string, Transformer> = {
  dateOfBirth: (value) => value ? new Date(value) : null,
  foodAllergy: (value) => JSON.parse(value),
  nonFoodAllergy: (value) => JSON.parse(value),
};

const formatTransformers: Record<string, Transformer> = {
  dateOfBirth: (value) => value && !isNaN(new Date(value).getTime()) ? new Date(value) : null,
  activityChoices: (value) => JSON.stringify(value),
  standMembers: (value) => JSON.stringify(value),
};

const EXCLUDED_FIELDS = ['status', 'fileCnie', 'fileSchoolCertificate', 'fileGrades', 'fileRegulations', 'termsAgreement'];

// API response → Frontend state
export const parseApplication = (application: any) => {
  return Object.keys(application).reduce((acc, key) => {
    if (parseTransformers[key]) {
      acc[key] = parseTransformers[key](application[key])
    } else {
      acc[key] = application[key] ?? ''
    }
    return acc;
  }, {} as any);
};

// Frontend state → API payload
export const formatApplication = (application: any) => {
  const { ...rest } = Object.fromEntries(
    Object.entries(application).filter(([key]) => !EXCLUDED_FIELDS.includes(key))
  );

  return Object.keys(rest).reduce((acc, key) => {
    if (formatTransformers[key]) {
      acc[key] = formatTransformers[key](rest[key])
    } else {
      acc[key] = rest[key]
    }
    return acc;
  }, {} as any);
};