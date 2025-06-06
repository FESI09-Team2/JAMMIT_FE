import ModalWrapper from './ModalWrapper';
import Button from '../Button';

interface ModalInteractionProps {
  /** message: 모달에 표시할 메시지 */
  message: string;
  /** "확인" 버튼 클릭 시 실행할 콜백 */
  onConfirm: () => void;
  /** "x"버튼 또는 "취소" 버튼 클릭 시 실행할 콜백 */
  onClose: () => void;
  /** "취소" 버튼을 보여줄지 여부 (기본값: false) */
  isShowCancel?: boolean;
}

export default function ModalInteraction({
  message,
  onConfirm,
  onClose,
  isShowCancel = false,
}: ModalInteractionProps) {
  return (
    <ModalWrapper
      onClose={onClose}
      className="relative h-[13.25rem] w-[28.125rem] rounded-lg bg-[#242429] p-[1.5rem] text-gray-100"
    >
      <p className="mt-[3rem] text-center text-base font-medium whitespace-pre-line">
        {message}
      </p>
      <div className="mt-[1.5rem] flex justify-center gap-3">
        {isShowCancel && (
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
