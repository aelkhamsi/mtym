import { z } from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mdm/ui"
import { camelCaseToText } from '@mdm/utils'
import { Label } from '@mdm/ui'
import { motion } from 'framer-motion'
import { Team } from '@mdm/types'

export const SummaryCard = ({
  formData, 
  formType,
  teams,
  delta,
}:{
  formData: z.infer<any>,
  formType: string,
  teams: Team[],
  delta: number,
}) => {
  const formKeys = Object.keys(formData);
  const teamName = teams?.find(team => team?.id === +formData?.teamId)?.name;

  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Récapitulatif</CardTitle>
          <CardDescription>{formType === 'create' ? "Création d'équipe" : 'Rejoindre une équipe'}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 justify-between'>
            {formKeys.map((key) =>
              <div key={key}>
                <Label>{key === 'teamId' ? "Nom de l'équipe" : camelCaseToText(key)}</Label>
                <div className='text-lg'>{key === 'teamId' ? teamName : formData[key]}</div>
                <span className='text-gray-500'>{!formData[key] && '(non défini)'}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
    
  )
}
