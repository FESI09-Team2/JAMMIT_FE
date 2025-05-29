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
      <button
        type="button"
        className="flex flex-col items-center justify-center"
        onClick={handleOpenModal}
      >
        <p className="text-base text-gray-100">이미지</p>
        <p className="text-base text-gray-100">이미지선택</p>
      </button>

      {isOpen && (
        <ModalImgEdit
          onSubmit={handleSubmitConfirm}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
