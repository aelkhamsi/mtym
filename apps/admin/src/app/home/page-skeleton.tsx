import { Skeleton } from '@/components/shared/skeleton';

const PageSkeleton = () => {
  return (
    <div className="flex flex-col space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-6 w-[80px] bg-gray-300" />
          <Skeleton className="h-10 w-[200px] md:w-[650px] bg-gray-300" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-[80px] bg-gray-300" />
          <Skeleton className="h-10 w-[200px] md:w-[650px] bg-gray-300" />
        </div>
    </div>
  );
}

export default PageSkeleton;
