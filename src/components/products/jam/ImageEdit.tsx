import Image from 'next/image';
import { useCallback, useState } from 'react';
import ModalImgEdit from './ModalImgEdit';
import { StaticImageData } from 'next/image';

export default function ImageEdit() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(
    null,
  );

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleSubmit = useCallback((image: StaticImageData) => {
    setSelectedImage(image);
    setIsOpen(false);
  }, []);

  return (
    <div className="relative mx-auto flex h-[22rem] w-full max-w-[1344px] items-center justify-center overflow-hidden rounded-[0.5rem] bg-[#393A41]">
      {selectedImage ? (
        <>
          <Image src={selectedImage} alt="선택된 이미지" fill />
        </>
      ) : (
        <button
          type="button"
          className="flex flex-col items-center justify-center"
          onClick={handleOpenModal}
        >
          <p className="text-base text-gray-100">이미지</p>
          <p className="text-base text-gray-100">이미지선택</p>
        </button>
      )}
      {isOpen && (
        <ModalImgEdit
          onSubmit={handleSubmit}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
