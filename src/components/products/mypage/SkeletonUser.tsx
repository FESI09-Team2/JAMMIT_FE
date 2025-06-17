import ShimmerSkeleton from '@/components/commons/ShimmerSkeleton';

export default function SkeletonUser() {
  return (
    <div className="flex h-[15.625rem] w-full items-center justify-center gap-[3.3125rem] bg-[#36114E]">
      <div>
        <ShimmerSkeleton className="h-[8rem] w-[8rem] overflow-hidden rounded-full" />
      </div>
      <div className="flex flex-col text-gray-100">
        <div className="flex items-center gap-[0.625rem]">
          <ShimmerSkeleton className="h-[2.4rem] w-[8rem] rounded-md" />
          <ShimmerSkeleton className="h-[1.125rem] w-[1.125rem] rounded-full" />
        </div>
        <div className="mt-4 flex items-center gap-[0.5rem] text-sm font-medium">
          <ShimmerSkeleton className="h-[2rem] w-[5rem] rounded-lg bg-[#34343A]" />
          <ShimmerSkeleton className="h-[2rem] w-[3rem] rounded-lg bg-[#34343A]" />
          <div className="h-[1.25rem] w-[0.0938rem] bg-gray-500" />
          <ShimmerSkeleton className="h-[1.5rem] w-[4rem] rounded-md" />
          <ShimmerSkeleton className="h-[2rem] w-[3rem] rounded-lg bg-[#34343A]" />
          <ShimmerSkeleton className="h-[2rem] w-[3rem] rounded-lg bg-[#34343A]" />
          <div className="h-[1.25rem] w-[0.0938rem] bg-gray-500" />
          <ShimmerSkeleton className="h-[1.5rem] w-[4rem] rounded-md" />
          <ShimmerSkeleton className="h-[1.5rem] w-[3rem] rounded-md" />
        </div>
      </div>
    </div>
  );
}
