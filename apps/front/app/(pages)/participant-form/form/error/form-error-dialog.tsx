
import { Dispatch, SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@mdm/ui"

const FormErrorDialog = ({
  showDialog,
  setShowDialog,
  error
}:{
  showDialog: boolean,
  setShowDialog: Dispatch<SetStateAction<boolean>>,
  error: {message: string}
}) => {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="my-2 text-red-700">La soumission de votre candidature a échouée</DialogTitle>
          <DialogDescription className="text-xs space-y-2">
            <div>
              Une erreur est survenue lors de la soumission de votre candidature. <br/>
              Message de l&apos;erreur: <span className="text-black">{error?.message}</span>
            </div>
            <div>
              Veuillez réessayer plus tard <span className="text-black">ou</span> contactez-nous sur l&apos;addresse email <span className="text-blue-500">math.maroc.mtym@gmail.com</span> en précisant votre nom, prénom et en joignant le message de l&apos;erreur çi-haut.
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default FormErrorDialog

