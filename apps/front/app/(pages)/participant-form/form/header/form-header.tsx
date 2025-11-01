import { Button } from '@mdm/ui'
import { EventHandler, MouseEvent } from 'react'

const FormHeader = ({
  onClickSave
}:{
  onClickSave: EventHandler<MouseEvent>,
}) => {
  return ( 
    <div className="flex justify-between">
      <div className="space-y-0.5">
        <h2 className="text-xl font-bold tracking-tight">Candidature</h2>
        <div className="text-muted-foreground text-sm">
          Suivez les étapes ci-dessous pour compléter votre candidature.
        </div>
      </div>

      <div>
        <Button onClick={onClickSave}>Sauvegarder & Terminer plus tard</Button>
      </div>
    </div>
  )
}

export default FormHeader
