const educationLevels = {
  "tronc-commun": "Tronc commun",
  "1bac": "1ère année Bac",
  "2bac": "2ème année Bac",
} as any;

const ApplicationEducationLevel = ({
  educationLevel
}:{
  educationLevel: string
}) => {
  return (
    <div>
      {educationLevels[educationLevel]}
    </div>
  )
}

export default ApplicationEducationLevel
