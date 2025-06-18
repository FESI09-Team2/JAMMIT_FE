import ShimmerSkeleton from '@/components/commons/ShimmerSkeleton';

export default function MemberTabSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1344px] pt-[24px]">
      <ShimmerSkeleton className="pc:rounded-[8px] relative h-[352px] w-full" />
      <ShimmerSkeleton className="pc:w-[964px] relative mt-[64px] h-[332px] w-full rounded-[8px]" />
    </div>
  );
}
