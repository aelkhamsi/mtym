import { motion } from 'framer-motion'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mdm/ui"
import { Input, Separator } from "@mdm/ui"

const RequiredAsterisk = () => <span className="text-red-500"> * </span>;

export const CreateTeamForm = ({
  form,
  delta,
}:{
  form: UseFormReturn<any>,
  delta: number
}) => {
  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 className='text-base font-semibold leading-7 text-[#0284C7]'>
        Créer une nouvelle équipe
      </h2>

      <p className='mt-1 text-sm leading-6 text-gray-600'>
        Fournissez des informations à propos de votre équipe
        <Separator className='mt-4 bg-[#0284C7]'/>
      </p>

      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between'>
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de l&apos;équipe<RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'équipe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slogan */}
        <FormField
          control={form.control}
          name="slogan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slogan <RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input placeholder="Slogan de l'équipe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Quadrigram */}
        <FormField
          control={form.control}
          name="quadrigram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quadrigramme <RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input placeholder="Quadrigramme de l'équipe" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Code de 4 lettres représentant votre équipe (ex. The Moroccan Pi-oneers → MARP)
              </FormDescription>
            </FormItem>
          )}
        />

        {/* Mentor Full Name*/}
        <FormField
          control={form.control}
          name="mentorFullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom et Nom de votre mentor</FormLabel>
              <FormControl>
                <Input placeholder="Nom complet du mentor" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Si votre équipe a un mentor (enseignant, chercheur, etc.), veuillez indiquer son nom complet ci-dessus.
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  )
}