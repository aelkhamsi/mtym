import { educationLevelLabelMap } from '@mdm/shared';

const ApplicationEducationLevel = ({
  educationLevel
}:{
  educationLevel: string
}) => {
  return (
    <div>
      {educationLevelLabelMap[educationLevel] ?? educationLevel}
    </div>
  )
}

export default ApplicationEducationLevel
