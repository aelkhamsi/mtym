import { getTeamByQuadrigram } from "@/app/api/TeamApi";
import { UseFormSetError } from "react-hook-form";

type Step = {
  id: string,
  name: string,
  getValidationFields: (formState?: any) => string[],
  asyncValidation?: (fieldValues?: any, setError?: UseFormSetError<any>) => Promise<boolean>,
}


const createTeamFields = ['name', 'slogan', 'quadrigram', 'mentorFullName'];
const joinTeamFields = ['teamId', 'accessCode'];

export const steps: Step[] = [
  {
    id: 'Étape 1',
    name: "Options d'équipe",
    getValidationFields: () => [],
  },
  {
    id: 'Étape 2',
    name: 'Créer / Rejoindre une Équipe',
    getValidationFields: (formType?: string) => {
      switch(formType) {
        case 'create':
          return createTeamFields
        case 'join':
          return joinTeamFields
        default:
          return []
      }
    },
    asyncValidation: async (fieldsState?: any, setError?: UseFormSetError<any>) => {
      const quadrigram = fieldsState?.quadrigram
      if (!quadrigram) return false
      const output = await getTeamByQuadrigram(quadrigram) as any

      if (!output?.id) return true
      if (setError) {
        setError("quadrigram", {
          type: "manual",
          message: "Ce quadrigramme existe déjà, veuillez en choisir un autre",
        });
      }
      return false
    },
  },
  {
    id: 'Étape 3',
    name: 'Récapitulatif',
    getValidationFields: () => [],
  },
];
