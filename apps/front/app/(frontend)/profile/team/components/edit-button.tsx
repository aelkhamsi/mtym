"use client"

import { PencilIcon, XIcon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent, 
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Input,
  LoadingDots,
} from "@mdm/ui"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mdm/ui"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createTeamSchema, createTeamDefaultValues } from "@/app/schemas/create-team.schema"
import { z } from "zod"
import { useAtomValue } from "jotai"
import { getTeamByQuadrigram, updateTeam } from "@/app/api/TeamApi"
import { useState } from "react"
import { teamAtom } from "@/app/store/teamAtom"
import { Team } from "@mdm/types"

type AccountFormValues = z.infer<typeof createTeamSchema>

const EditButton = ({
  className,
}:{
  className?: string
}) => {
  const [isFormLoading, setIsFormLoading] = useState(false)
  const team = useAtomValue(teamAtom) as Team
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: createTeamDefaultValues,
    mode: "onChange",
    values: team,
  })

  const onSubmit = async () => {
    setIsFormLoading(true)
    const {name, slogan, quadrigram, mentorFullname} = form?.getValues()

    const result = await getTeamByQuadrigram(quadrigram) as any

    if (!result || result?.id === team?.id) {
      await updateTeam(team?.id, {name, slogan, quadrigram, mentorFullname})
      window.location.reload()
      return
    }
 
    form?.setError("quadrigram", {
      type: "manual",
      message: "Ce quadrigramme existe déjà, veuillez en choisir un autre",
    });
    setIsFormLoading(false)
    return
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className={`border p-2 hover:cursor-pointer rounded-md ${className}`}>
          <PencilIcon />
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent>
        
        {/* HEADER */}
        <AlertDialogHeader>
          <AlertDialogCancel className="absolute top-2 right-2"><XIcon className="h-6"/></AlertDialogCancel>
          <AlertDialogTitle>Modifier les informations de l&apos;équipe</AlertDialogTitle>
        </AlertDialogHeader> 

        {/* FORM */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de l'équipe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slogan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slogan</FormLabel>
                  <FormControl>
                    <Input placeholder="Slogan de l'équipe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quadrigram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quadrigramme</FormLabel>
                  <FormControl>
                    <Input placeholder="Quadrigramme de l'équipe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mentorFullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mentor</FormLabel>
                  <FormControl>
                    <Input placeholder="Mentor de l'équipe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel>Fermer</AlertDialogCancel>
              <Button
                type="submit"
                disabled={!form?.formState?.isValid}
              >
                {isFormLoading
                  ? <LoadingDots color="#808080" />
                  : <span>Sauvegarder</span>
                }
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default EditButton
