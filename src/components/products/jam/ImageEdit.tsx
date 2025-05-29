import { useCallback, useState } from 'react';
import ModalImgEdit from './ModalImgEdit';

export default function ImageEdit() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleSubmitConfirm = useCallback(() => {
    alert('완료버튼누름');
    setIsOpen(false);
  }, []);

  return (
    <div className="flex h-[22rem] w-full flex-col items-center justify-center overflow-hidden rounded-[0.5rem] bg-[#393A41]">
      {/*이미지 선택+그림과 클릭시 모달이 띄어지고, 모달에서 이미지 선택하면 선택된 이미지로 미리보기되게 만들거임*/}
      <button
        type="button"
        className="flex flex-col items-center justify-center"
        onClick={handleOpenModal}
      >
        <p className="text-base text-gray-100">이미지</p>
        <p className="text-base text-gray-100">이미지선택</p>
      </button>

      {isOpen && <ModalImgEdit onConfirm={handleSubmitConfirm} />}
    </div>
  );
}
