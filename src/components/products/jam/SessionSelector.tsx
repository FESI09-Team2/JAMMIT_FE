import Dropdown from '@/components/commons/Dropdown';
import Button from '@/components/commons/Button';
import NumberInput from './NumberInput';
import { SESSION_TAGS, SESSION_KEY_MAP } from '@/constants/tags';
import ArrowDown from '@/assets/icons/ic_arrowdown.svg';

interface SessionSelectorProps {
  session: Record<string, number>;
  sortOption: string;
  setSortOption: (val: string) => void;
  onChange: (value: number) => void;
  disableDelete?: boolean;
  onDelete?: () => void;
  onAdd?: () => void;
}

export default function SessionSelector({
  session,
  sortOption,
  setSortOption,
  onChange,
  disableDelete,
  onDelete,
  onAdd,
}: SessionSelectorProps) {
  return (
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
        <Button variant="outline" size="small" onClick={onAdd}>
          추가
        </Button>
        <Button
          variant="outline"
          size="small"
          onClick={onDelete}
          disabled={disableDelete}
        >
          삭제
        </Button>
      </div>
    </div>
  );
}
