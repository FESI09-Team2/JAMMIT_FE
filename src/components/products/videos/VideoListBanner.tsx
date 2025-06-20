import Image from 'next/image';

export default function VideoListBanner() {
  return (
    <div className="pc:h-[15.625rem] pc:rounded-[0.5rem] flex h-[12.4375rem] w-full items-center justify-between bg-[#2d2d2d] pl-[5.8125rem]">
      <div>
        <p className="text-[1.375rem] font-semibold text-[rgb(218,163,255)]">
          함께하면 더 쟀으니까, 재밋 🤘
        </p>
        <p className="text-[2rem] font-semibold">
          지금 가장 핫한 이 영상은 보고 재밋하니?
        </p>
        <button className="mt-[1.5625rem] h-[2.25rem] rounded-[3.125rem] bg-white/10 px-[0.875rem] text-center text-[1rem] font-semibold text-white/60">
          이번 주 인기글 바로가기
        </button>
      </div>
      <div className="h-[12.5rem] w-[40.625rem]">
        <Image
          src="/images/main/img_video_banner.avif"
          alt="비디오 게시판 베너 이미지"
          width={650}
          height={200}
        />
      </div>
    </div>
  );
}
