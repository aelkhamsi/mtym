import { Button } from '@mdm/ui';
import { motion } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react';

export const CreateOrJoinTeamStep = ({
  delta,
  setFormType
}:{
  delta: number,
  setFormType: Dispatch<SetStateAction<string>>,
}) => {
  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className='flex flex-col items-center space-y-8 md:flex-row md:space-y-0 md:justify-center mt-20 md:mt-28'>
        {/* Create a team */}
        <Button
          className='text-lg md:w-1/4 py-10 px-12'
          onClick={() => setFormType('create')}
        >
          Créer une nouvelle équipe
        </Button>

        {/* Or Separator */}
        <div className="relative w-full flex items-center justify-center md:w-1/4">
          <div className="absolute inset-0 flex items-center md:px-6">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-muted-foreground">
              Ou
            </span>
          </div>
        </div>

        {/* Join a team */}
        <Button 
          variant='outline' 
          className='text-lg md:w-1/4 py-10 px-12'
          onClick={() => setFormType('join')}
        >
          Rejoindre une équipe existante
        </Button>
      </div>
    </motion.div>
  )
}