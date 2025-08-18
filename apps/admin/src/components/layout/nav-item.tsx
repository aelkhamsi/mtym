'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavItem({
  href,
  className,
  children
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={clsx(
        className,
        'flex items-center gap-3 rounded-lg px-3 py-2 w-full transition-all hover:bg-gray-200',
        {
          'bg-gray-200': pathname === href
        }
      )}
    >
      {children}
    </Link>
  );
}
