const educationLevels = {
  'bac-plus-1': 'Bac +1',
  'bac-plus-2': 'Bac +2',
  'bac-plus-3': 'Bac +3',
  'bac-plus-4': 'Bac +4',
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
