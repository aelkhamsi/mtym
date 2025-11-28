export type Status =
  | 'DRAFTED'
  | 'COMPLETED';

export const getStatusClassname = (status: Status, size: 'sm' | 'md') => {
  const baseClassname = size === 'md' 
    ? 'rounded-lg px-6 py-1'
    : 'rounded-lg px-2';

  let colorClassname;

  switch(status) {
    case 'DRAFTED':
      colorClassname = 'bg-gray-300 text-black text-center';
      break;
    case 'COMPLETED':
      colorClassname = 'bg-[#006644] text-white text-center';
      break;
  }

  return `${baseClassname} ${colorClassname}`;
}

const ApplicationStatus = ({
  status,
}:{
  status: Status,
}) => {
  return (
    <div className={getStatusClassname(status, 'md')}>
      {status}
    </div>
  )
}

export default ApplicationStatus
