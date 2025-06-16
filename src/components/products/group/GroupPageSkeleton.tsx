import ShimmerSkeleton from '@/components/commons/ShimmerSkeleton';

export default function GroupPageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[84rem] pt-[1.5rem]">
      <ShimmerSkeleton className="pc:rounded-[0.5rem] relative h-[22rem] w-full" />

      <div className="pc:flex-row pc:px-0 pc:gap-0 mx-auto flex w-full max-w-[84rem] flex-col justify-between gap-[14px] px-5 pb-[3.875rem]">
        <div className="pl-[40px]">
          <ShimmerSkeleton className="mt-[104px] h-[38px] w-[350px] rounded-[8px]" />
          <ShimmerSkeleton className="mt-[18px] h-[24px] w-[50px] rounded-[8px]" />
          <ShimmerSkeleton className="mt-[40px] h-[24px] w-[298px] rounded-[8px]" />
          <div className="pc:flex-row pc:gap-[25px] mt-[20px] flex flex-col gap-[20px]">
            <ShimmerSkeleton className="h-[24px] w-[298px] rounded-[8px]" />
            <ShimmerSkeleton className="h-[24px] w-[298px] rounded-[8px]" />
          </div>
          <div className="pc:flex-row mt-[40px] flex flex-col gap-[25px]">
            <ShimmerSkeleton className="h-[120px] w-[298px] rounded-[8px]" />
            <ShimmerSkeleton className="pc:w-[519px] h-[120px] w-full rounded-[8px]" />
          </div>
          <ShimmerSkeleton className="mt-[40px] h-[120px] w-full rounded-[8px]" />
        </div>
      </div>
    </div>
  );
}
