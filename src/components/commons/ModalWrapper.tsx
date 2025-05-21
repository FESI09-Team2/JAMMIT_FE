import { memo, ReactNode, useRef } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
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
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div ref={modalRef} className={className}>
        <button onClick={onClose} className="absolute top-4 right-4">
          <CancelIcon />
        </button>
        {title && <h2 className="mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export default memo(ModalWrapper);
