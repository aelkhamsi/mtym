"use client"

import { useState } from "react"
import { MTYM_PROBLEM_COUNT } from "@mdm/shared"
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, toast } from "@mdm/ui"
import { useAtom, useAtomValue } from "jotai"
import { updateFinalReportRanking } from "@/app/api/TeamApi"
import { teamAtom } from "@/app/store/teamAtom"
import { userAtom } from "@/app/store/userAtom"

const defaultRanking = Array.from({ length: MTYM_PROBLEM_COUNT }, (_, index) => index + 1)

function RankingEditor({ teamId, initialRanking, canEdit }: {
  teamId: number
  initialRanking: number[] | null | undefined
  canEdit: boolean
}) {
  const [, setTeam] = useAtom(teamAtom)
  const [ranking, setRanking] = useState(initialRanking ?? defaultRanking)
  const [saving, setSaving] = useState(false)
  const orderChanged = ranking.some((problem, index) => problem !== (initialRanking ?? defaultRanking)[index])
  const needsSaving = !initialRanking || orderChanged

  const move = (index: number, direction: -1 | 1) => {
    const next = [...ranking]
    const target = index + direction
    const problem = next[index]
    next[index] = next[target]
    next[target] = problem
    setRanking(next)
  }

  const save = async () => {
    setSaving(true)
    try {
      const result = await updateFinalReportRanking(teamId, ranking) as { finalReportRanking?: number[] }
      if (!result.finalReportRanking) throw new Error()
      setTeam((team) => team ? { ...team, finalReportRanking: ranking } : team)
      toast({ title: "Préférences enregistrées" })
    } catch {
      toast({ title: "Enregistrement impossible", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences de défense</CardTitle>
        <CardDescription>Classez les quatre problèmes du plus souhaité au moins souhaité pour la défense.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!initialRanking && !canEdit && <p className="text-sm text-muted-foreground">Votre équipe n&apos;a pas encore classé les problèmes.</p>}
        {(canEdit || initialRanking) && (
          <div aria-live="polite" className="text-sm">
            {orderChanged ? (
              <>
                <p className="font-medium text-amber-700">Modifications non enregistrées</p>
                {initialRanking && <p className="text-muted-foreground">Classement enregistré : {initialRanking.map((problem) => `Problème ${problem}`).join(" → ")}</p>}
              </>
            ) : initialRanking ? (
              <p className="text-green-700">Classement enregistré</p>
            ) : (
              <p className="text-muted-foreground">Aucun classement enregistré. L&apos;ordre affiché est celui par défaut.</p>
            )}
          </div>
        )}
        {(canEdit || initialRanking) && ranking.map((problemNumber, index) => (
          <div key={problemNumber} className="flex items-center justify-between gap-3 rounded-md border p-3">
            <span>{index + 1}. Problème {problemNumber}</span>
            {canEdit && (
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" disabled={index === 0 || saving} onClick={() => move(index, -1)} aria-label={`Monter le problème ${problemNumber}`}>↑</Button>
                <Button type="button" variant="outline" size="sm" disabled={index === ranking.length - 1 || saving} onClick={() => move(index, 1)} aria-label={`Descendre le problème ${problemNumber}`}>↓</Button>
              </div>
            )}
          </div>
        ))}
        {canEdit && (
          <div className="flex flex-wrap gap-2">
            <Button type="button" disabled={saving || !needsSaving} onClick={save}>{saving ? "Enregistrement…" : "Enregistrer les préférences"}</Button>
            {orderChanged && <Button type="button" variant="outline" disabled={saving} onClick={() => setRanking(initialRanking ?? defaultRanking)}>Annuler les modifications</Button>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function FinalReportRankingSection() {
  const team = useAtomValue(teamAtom)
  const user = useAtomValue(userAtom)
  if (team?.review?.intermediateReportDecision !== "PASS") return null

  return <RankingEditor teamId={team.id} initialRanking={team.finalReportRanking} canEdit={team.leader?.id === user?.id} />
}
