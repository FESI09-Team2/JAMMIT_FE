import { memo, ReactNode } from 'react';
import CancelIcon from '@/assets/icons/ic_x.svg';

interface ModalWrapperProps {
  title?: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

function ModalWrapper({
  title,
  children,
  onClose,
  className,
}: ModalWrapperProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={className}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <CancelIcon />
        </button>
        {title && <h2 className="mb-4 text-lg font-semibold">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export default memo(ModalWrapper);
