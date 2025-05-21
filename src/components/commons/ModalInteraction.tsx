import ModalWrapper from './ModalWrapper';
import Button from './Button';

interface InteractionModalProps {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  showCancel?: boolean;
}

export default function InteractionModal({
  message,
  onConfirm,
  onClose,
  showCancel = false,
}: InteractionModalProps) {
  return (
    <ModalWrapper
      onClose={onClose}
      className="relative w-full bg-white p-6 text-black"
    >
      <p className="text-center">{message}</p>
      <div className="mt-6 flex justify-center gap-3">
        {showCancel && (
          <Button variant="outline" size="small" onClick={onClose}>
            취소
          </Button>
        )}
        <Button variant="solid" size="small" onClick={onConfirm}>
          확인
        </Button>
      </div>
    </ModalWrapper>
  );
}
