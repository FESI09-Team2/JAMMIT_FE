interface DropdownMenuListProps {
  menuOptions: string[];
  onSelect: (option: string) => void;
  /** Dropdownlist의 너비 */
  size?: 'sm' | 'md' | 'lg';
}

export default function DropdownMenuList({
  menuOptions,
  onSelect,
  size,
}: DropdownMenuListProps) {
  const sizeClass = {
    sm: 'w-[9rem]',
    md: 'w-[26rem]',
    lg: 'w-auto',
  }[size || 'lg'];

  return (
    // 384 -> 26rem, 110 -> 9rem
    <div
      className={`absolute ${sizeClass} gap-[0.625rem] rounded-lg border-1 border-[#505057] bg-[#34343A] text-gray-100`}
    >
      {menuOptions.map((option) => (
        <div
          key={option}
          onClick={() => onSelect(option)}
          className="cursor-pointer rounded-lg px-[1rem] py-[0.625rem] hover:bg-[#464F4E]"
        >
          <span>{option}</span>
        </div>
      ))}
    </div>
  );
}
