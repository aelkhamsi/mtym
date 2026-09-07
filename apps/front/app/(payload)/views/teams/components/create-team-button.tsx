"use client"

import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Check, Crown, Plus } from "lucide-react"
import { cn } from "@mdm/utils"
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  LoadingDots,
  RadioGroup,
  RadioGroupItem,
  toast,
} from "@mdm/ui"
import { createTeamAsAdmin, getTeamByQuadrigram } from "@/app/api/TeamApi"
import {
  createTeamAdminDefaultValues,
  createTeamAdminSchema,
} from "@/app/schemas/create-team-admin.schema"
import { getEligibleUsersForTeamCreation } from "@/app/api/UsersApi"

type CreateTeamFormValues = z.infer<typeof createTeamAdminSchema>

/* The button is disabled for less than a blink on a fast API, which reads as
 * "nothing happened". Keeping the loader up for a full second makes the
 * creation feel acknowledged. */
const MIN_LOADER_DURATION = 1000

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const getUserLabel = (user: any) =>
  `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || `User ${user?.id}`

const CreateTeamButton = ({
  onCreated,
}:{
  onCreated: (team: any) => void,
}) => {
  const [eligibleUsers, setEligibleUsers] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<CreateTeamFormValues>({
    resolver: zodResolver(createTeamAdminSchema),
    defaultValues: createTeamAdminDefaultValues,
    mode: "onChange",
  })

  const memberIds = form.watch("memberIds") ?? []
  const leaderId = form.watch("leaderId")
  const selectedMembers = useMemo(
    () => eligibleUsers?.filter((user: any) => memberIds.includes(Number(user?.id))),
    [eligibleUsers, memberIds],
  )

  const toggleMember = (userId: number) => {
    const isSelected = memberIds.includes(userId)
    const nextMemberIds = isSelected
      ? memberIds.filter((id: number) => id !== userId)
      : [...memberIds, userId]

    form.setValue("memberIds", nextMemberIds, {shouldValidate: true, shouldDirty: true})

    /* A creator who is no longer a member would keep the form invalid with the
     * error pointing at a row that is not on screen anymore. */
    if (isSelected && leaderId === userId) {
      form.setValue("leaderId", undefined as unknown as number, {shouldValidate: true})
    }
    /* The first member picked is the most likely creator, and it saves a click
     * on the common path. */
    if (!isSelected && nextMemberIds.length === 1) {
      form.setValue("leaderId", userId, {shouldValidate: true})
    }
  }

  const closeAndReset = () => {
    setIsOpen(false)
    form.reset(createTeamAdminDefaultValues)
  }

  const onSubmit = async (formData: CreateTeamFormValues) => {
    setIsLoading(true)
    const startedAt = Date.now()

    const keepLoaderVisible = async () => {
      const elapsed = Date.now() - startedAt
      if (elapsed < MIN_LOADER_DURATION) await wait(MIN_LOADER_DURATION - elapsed)
    }

    /* The API rejects a duplicate too, but checking here turns a generic error
     * toast into a message on the field that has to change. */
    const existingTeam = await getTeamByQuadrigram(formData.quadrigram) as any
    if (existingTeam?.id) {
      await keepLoaderVisible()
      form.setError("quadrigram", {
        type: "manual",
        message: "This quadrigram is already taken, please choose another one",
      })
      setIsLoading(false)
      return
    }

    const response = await createTeamAsAdmin({
      name: formData.name,
      slogan: formData.slogan,
      quadrigram: formData.quadrigram,
      memberIds: formData.memberIds,
      leaderId: formData.leaderId,
    }) as any

    await keepLoaderVisible()
    setIsLoading(false)

    if (!response?.id) {
      const message = Array.isArray(response?.message)
        ? response.message.join(', ')
        : response?.message

      toast({
        title: "Team creation failed",
        description: message ?? "The team could not be created. Please try again later.",
        variant: "destructive",
      })
      return
    }

    onCreated(response)
    closeAndReset()

    toast({
      title: "Team created",
      description: `${response.name} (${response.quadrigram}) has been created with success`,
    })
  }

  useEffect(() => {
    if (!isOpen) return

    async function loadEligibleUsers() {
      setIsLoading(true);
      const users = await getEligibleUsersForTeamCreation();
      setEligibleUsers(users);
      setIsLoading(false);
    }

    loadEligibleUsers();
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        /* Closing mid-request would leave the creation running with nothing to
         * report back to. */
        if (isLoading) return
        if (!open) closeAndReset()
        else setIsOpen(true)
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Plus className="mr-2 h-4 w-4" />
          Create team
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white max-h-[90vh] overflow-y-auto sm:max-w-[32rem]">
        <DialogHeader>
          <DialogTitle>Create a team</DialogTitle>
          <DialogDescription className="text-xs">
            The team is created on behalf of its members, one of whom is its lead.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Team name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quadrigram"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Quadrigram</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ABCD"
                      maxLength={4}
                      className="uppercase"
                      {...field}
                      onChange={(event: any) => field.onChange(event.target.value.toUpperCase())}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Exactly 4 letters (A–Z), no digits, and not already used by another team.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slogan"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Slogan</FormLabel>
                  <FormControl>
                    <Input placeholder="Team slogan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="memberIds"
              render={() => (
                <FormItem>
                  <FormLabel>Members ({memberIds.length}/5)</FormLabel>
                  <FormControl>
                    <Command className="rounded-md border">
                      <CommandInput placeholder="Search a member..." />
                      <CommandList className="max-h-[12rem]">
                        <CommandEmpty className="py-4 text-center text-xs text-gray-500">
                          No member available.
                        </CommandEmpty>
                        <CommandGroup>
                          {eligibleUsers?.map((user: any) => {
                            const userId = Number(user?.id)
                            const isSelected = memberIds.includes(userId)

                            return (
                              <CommandItem
                                key={userId}
                                value={`${getUserLabel(user)} ${user?.email} ${userId}`}
                                /* The cap is the rule, so the extra member is
                                 * refused instead of silently dropping one. */
                                disabled={!isSelected && memberIds.length >= 5}
                                onSelect={() => toggleMember(userId)}
                                className="gap-2"
                              >
                                <span
                                  className={cn(
                                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary pointer-events-none",
                                    isSelected && "bg-primary text-primary-foreground",
                                  )}
                                >
                                  {isSelected && <Check className="h-3 w-3" />}
                                </span>
                                <span className="text-sm">{getUserLabel(user)}</span>
                                <span className="text-xs text-gray-400">{user?.email}</span>
                              </CommandItem>
                            )
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </FormControl>
                  <FormDescription className="text-xs">
                    Between 3 and 5 members.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="leaderId"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Lead</FormLabel>
                  <FormControl>
                    {selectedMembers?.length ? (
                      <RadioGroup
                        /* Empty string, not undefined: the group has to stay
                         * controlled across "no lead yet" -> "lead". */
                        value={field.value !== undefined ? String(field.value) : ""}
                        onValueChange={(value: string) => field.onChange(Number(value))}
                        className="space-y-1"
                      >
                        {selectedMembers?.map((user: any) => (
                          <label
                            key={user?.id}
                            className="flex items-center gap-2 text-sm hover:cursor-pointer"
                          >
                            <RadioGroupItem value={String(user?.id)} />
                            {getUserLabel(user)}
                            <span className="text-xs text-gray-400">{user?.email}</span>
                            {Number(user?.id) === Number(field.value) && (
                              <Crown className="h-4 w-4 text-amber-500" />
                            )}
                          </label>
                        ))}
                      </RadioGroup>
                    ) : (
                      <p className="text-xs text-gray-400">
                        Pick the members first, then designate their lead.
                      </p>
                    )}
                  </FormControl>
                  <FormDescription className="text-xs">
                    The lead gets extra rights on some features.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={closeAndReset}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || !form.formState.isValid}>
                {isLoading
                  ? <LoadingDots color="#808080" />
                  : <span>Create</span>
                }
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTeamButton
