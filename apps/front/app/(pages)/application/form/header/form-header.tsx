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
        <h2 className="text-xl font-bold tracking-tight">Application</h2>
        <div className="text-muted-foreground text-sm">
          Follow the steps below to complete your application
        </div>
      </div>

      <div>
        <Button onClick={onClickSave}>Save & Finish later</Button>
      </div>
    </div>
  )
}

export default FormHeader
