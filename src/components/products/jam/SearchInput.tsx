import SearchIcon from '@/assets/icons/ic_search.svg';

export default function SearchInput() {
  return (
    <div className="flex flex-col gap-[0.5rem]">
      <label className="block text-sm text-gray-100">모임 장소</label>
      <div className="relative w-[27.9375rem] text-gray-400">
        <input
          placeholder="장소명을 검색하세요."
          className="h-[2.75rem] w-full rounded-lg border-0 bg-[#34343A] px-[1rem] py-[0.625rem]"
        />
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2"
          onClick={() => console.log('검색 아이콘 클릭됨')}
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}
