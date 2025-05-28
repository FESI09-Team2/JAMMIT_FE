interface DropdownMenuListProps {
  menuOptions: string[];
  onSelect: (option: string) => void;
}

export default function DropdownMenuList({
  menuOptions,
  onSelect,
}: DropdownMenuListProps) {
  return (
    <div className="absolute w-[26rem] gap-[0.625rem] rounded-lg border-1 border-[#505057] bg-[#34343A] text-gray-100">
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
