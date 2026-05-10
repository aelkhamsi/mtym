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
import { Button, Input, Separator } from "@mdm/ui"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@mdm/ui"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@mdm/ui"
import { cn } from '@mdm/utils'
import { Team } from '@mdm/types'

const RequiredAsterisk = () => <span className="text-red-500"> * </span>;

export const JoinTeamForm = ({
  form,
  teams,
  delta,
}:{
  form: UseFormReturn<any>,
  teams: Team[],
  delta: number
}) => {
  const teamsOptions = teams
    ?.filter(team => team?.users?.length)
    ?.map(team => ({
      label: team?.name,
      value: team?.id.toString(),
      leader: `${team?.leader?.firstName} ${team?.leader?.lastName}`
    }))

  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 className='text-base font-semibold leading-7 text-[#0284C7]'>
        Rejoindre une équipe existante
      </h2>

      <p className='mt-1 text-sm leading-6 text-gray-600'>
        Choisissez l&apos;équipe de vous voulez rejoindre, et le code d&apos;accès fourni par le lead de cette team.
        <Separator className='mt-4 bg-[#0284C7]'/>
      </p>

      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between'>
        {/* Education Level */}
        <FormField
          control={form.control}
          name="teamId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Équipes <RequiredAsterisk /></FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? teamsOptions?.find(
                            (team) => team.value === field.value
                          )?.label
                        : "Selectionnez une équipe"
                      }
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-full md:w-[20rem] lg:w-[30rem] p-0">
                  <Command>
                    <CommandInput placeholder="Search team..." />
                    <CommandList>
                      <CommandEmpty>Aucun résultat</CommandEmpty>
                      <CommandGroup>
                        {teamsOptions?.map((team) => (
                          <CommandItem
                            value={team.label}
                            key={team.value}
                            onSelect={() => {
                              form.setValue("teamId", team.value)
                            }}
                          > 
                            <div>
                              <div className='flex'>
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    team.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {team.label}
                              </div>

                              <div className='ml-6'> <span className='text-gray-500'>Créateur de l&apos;équipe: </span>{team.leader}</div>
                            </div>
                            
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormDescription>
                Vous trouverez içi toutes les équipes créées
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Access Code */}
        <FormField
          control={form.control}
          name="accessCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code d&apos;accès <RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input placeholder="Entrez votre code d&apos;accès" {...field} />
              </FormControl>
              <FormDescription>
                Vous recevrez un code d&apos;accès de la part du créateur de l&apos;équipe pour vous permettre d&apos;accéder à cette équipe.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  )
}