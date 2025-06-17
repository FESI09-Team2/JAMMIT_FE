import ShimmerSkeleton from '@/components/commons/ShimmerSkeleton';

export default function GroupPageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1344px] pt-[24px]">
      <ShimmerSkeleton className="pc:rounded-[8px] relative h-[352px] w-full" />

      <div className="pc:flex-row pc:px-0 pc:gap-0 mx-auto flex w-full max-w-[1344px] flex-col justify-between gap-[0.875rem] px-5 pb-[62px]">
        <div className="pl-[2.5rem]">
          <ShimmerSkeleton className="mt-[6.5rem] h-[2.375rem] w-[21.875rem] rounded-[0.5rem]" />
          <ShimmerSkeleton className="mt-[1.125rem] h-[1.5rem] w-[3.125rem] rounded-[0.5rem]" />
          <ShimmerSkeleton className="mt-[2.5rem] h-[1.5rem] w-[18.625rem] rounded-[0.5rem]" />
          <div className="pc:flex-row pc:gap-[1.5625rem] mt-[1.25rem] flex flex-col gap-[1.25rem]">
            <ShimmerSkeleton className="h-[1.5rem] w-[18.625rem] rounded-[0.5rem]" />
            <ShimmerSkeleton className="h-[1.5rem] w-[18.625rem] rounded-[0.5rem]" />
          </div>
          <div className="pc:flex-row mt-[2.5rem] flex flex-col gap-[1.5625rem]">
            <ShimmerSkeleton className="h-[7.5rem] w-[18.625rem] rounded-[0.5rem]" />
            <ShimmerSkeleton className="pc:w-[32.4375rem] h-[7.5rem] w-full rounded-[0.5rem]" />
          </div>
          <ShimmerSkeleton className="mt-[2.5rem] h-[7.5rem] w-full rounded-[0.5rem]" />
        </div>
      </div>
    </div>
  );
}
