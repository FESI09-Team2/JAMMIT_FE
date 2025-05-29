import Dropdown from '@/components/commons/Dropdown';
import Button from '@/components/commons/Button';
import NumberInput from './NumberInput';
import { SESSION_TAGS, SESSION_KEY_MAP } from '@/constants/tags';
import { JamFormData } from '@/types/jam';
import ArrowDown from '@/assets/icons/ic_arrowdown.svg';

export default function SessionSelector({
  session,
  sortOption,
  setSortOption,
  onChange,
}: {
  session: JamFormData['session'];
  sortOption: string;
  setSortOption: (val: string) => void;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-[0.5rem]">
      <p className="text-lg font-semibold">모집 세션</p>
      <div className="flex justify-between">
        <div className="flex gap-[0.75rem]">
          <Dropdown
            onSelect={setSortOption}
            menuOptions={SESSION_TAGS}
            surfixIcon={<ArrowDown />}
            size="md"
            value={sortOption}
          />
          <NumberInput
            count={session[SESSION_KEY_MAP[sortOption]] || 0}
            onChange={onChange}
          />
        </div>
        <div className="flex gap-[0.75rem]">
          <Button variant="outline" size="small">
            추가
          </Button>
          <Button variant="outline" size="small">
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
