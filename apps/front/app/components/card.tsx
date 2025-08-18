import { CustomPlusIcon } from '@mdm/ui';
import { ReactNode } from 'react';
import Link from 'next/link'
const Card = ({
  children,
  href,
  color='white',
  className,
  bgImageUrl,
}: {
  children: ReactNode;
  href?: string;
  color?: 'white' | 'black';
  className?: string,
  bgImageUrl?: string,
}) => {
  return (
    
    <Link 
      href={href || '#'} 
      className={`border group/canvas-card flex items-center justify-center border-${color}/[0.2] w-full p-4 relative h-[10rem] relative ${href ? 'hover:cursor-pointer' : ''} ${className}`}
      scroll={true}
    >
      <CustomPlusIcon className={`absolute h-6 w-6 -top-3 -left-3 text-${color}`} />
      <CustomPlusIcon className={`absolute h-6 w-6 -bottom-3 -left-3 text-${color}`} />
      <CustomPlusIcon className={`absolute h-6 w-6 -top-3 -right-3 text-${color}`} />
      <CustomPlusIcon className={`absolute h-6 w-6 -bottom-3 -right-3 text-${color}`} />

      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 opacity-0 hover:opacity-100`}
        style={{ backgroundImage: `url(${bgImageUrl})` }}
      >
      </div>

      <h2 className={`relative z-20 text-${color} text-xl group-hover/canvas-card:opacity-100 relative z-10 mt-4 font-bold group-hover/canvas-card:text-${color} group-hover/canvas-card:-translate-y-2 transition duration-200`}>
        {children}
      </h2>
    </Link>
  );
};

export { Card }