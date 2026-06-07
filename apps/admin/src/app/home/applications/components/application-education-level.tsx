import { educationLevelLabels } from '@mdm/shared';

const ApplicationEducationLevel = ({
  educationLevel
}:{
  educationLevel: string
}) => {
  return (
    <div>
      {educationLevelLabels[educationLevel] ?? educationLevel}
    </div>
  )
}

export default ApplicationEducationLevel
