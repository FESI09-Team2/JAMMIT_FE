import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';

describe('Input 컴포넌트', () => {
  const defaultProps = {
    type: 'text' as const,
    placeholder: '테스트 입력',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    name: 'testInput',
    error: undefined,
  };

  test('placeholder가 올바르게 설정된다', () => {
    render(<Input {...defaultProps} placeholder="테스트 입력" />);
    const input = screen.getByPlaceholderText(
      '테스트 입력',
    ) as HTMLInputElement;
    expect(input.placeholder).toBe('테스트 입력');
  });

  test('text 타입이 렌더링', () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByPlaceholderText(
      '테스트 입력',
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('text');
  });

  test('입력값 변경 시 onChange가 호출', () => {
    const onChange = jest.fn();
    render(<Input {...defaultProps} onChange={onChange} />);
    const input = screen.getByPlaceholderText('테스트 입력');
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('blur 이벤트 시 onBlur가 호출', () => {
    const onBlur = jest.fn();
    render(<Input {...defaultProps} onBlur={onBlur} />);
    const input = screen.getByPlaceholderText('테스트 입력');
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test('error 메시지가 있으면 화면에 표시', () => {
    render(<Input {...defaultProps} error="에러 발생" />);
    expect(screen.getByText('에러 발생')).toBeInTheDocument();
  });
});
