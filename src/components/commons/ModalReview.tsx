import { Controller, useForm } from 'react-hook-form';
import ModalWrapper from './ModalWrapper';
import Button from './Button';
import TextArea from './Textarea';

interface ModalReviewProps {
  /** "리뷰등록" 버튼 클릭 시 실행할 콜백 */
  onSubmit: () => void;
  /** "x"버튼 또는 "취소" 버튼 클릭 시 실행할 콜백 */
  onCancel: () => void;
}

export default function ModalReview({ onCancel, onSubmit }: ModalReviewProps) {
  const { control } = useForm();

  return (
    <ModalWrapper title="리뷰쓰기" onClose={onCancel}>
      <form>
        <p>만족스러운 경험이었나요?</p>
        <div> 별점 컴포넌트 자리</div>

        {/* TODO: 멘트는 디자인 확정시 교체 예정 */}
        <p>어떤 사람인가요?</p>

        {/* TODO: 멘트는 디자인 확정시 교체 예정 */}
        <p>경험에 대해 자유롭게 남겨주세요.(선택)</p>
        <Controller
          name="review"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextArea
              placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <div className="flex justify-between pt-2">
          <Button variant="outline" size="small" onClick={onCancel}>
            outline
          </Button>
          <Button variant="outline" size="small" disabled onClick={onSubmit}>
            o - disabled
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
