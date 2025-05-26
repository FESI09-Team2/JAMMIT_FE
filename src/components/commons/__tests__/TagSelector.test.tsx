import { fireEvent, render, screen } from '@testing-library/react';
import TagSelector from '../TagSelector';

jest.mock('@/assets/icons/ic_plus.svg', () => {
  function MockProfileIcon() {
    return <svg data-testid="mock-plus-icon" />;
  }
  return MockProfileIcon;
});
jest.mock('@/assets/icons/ic_check.svg', () => {
  function MockProfileIcon() {
    return <svg data-testid="mock-check-icon" />;
  }
  return MockProfileIcon;
});

const mockTags = ['보컬', '기타', '드럼'];
describe('TagSelector', () => {
  test('모든 태그 버튼이 렌더링된다.', () => {
    render(<TagSelector tags={mockTags} />);
    expect(screen.getByText('보컬')).toBeInTheDocument();
    expect(screen.getByText('기타')).toBeInTheDocument();
    expect(screen.getByText('드럼')).toBeInTheDocument();
  });

  test('클릭하면 선택되고, 다시 클릭하면 해제된다.', () => {
    render(<TagSelector tags={mockTags} />);
    const guitarTagButton = screen.getByText('기타');
    expect(guitarTagButton.className).toContain('border-transparent');
    expect(guitarTagButton.className).not.toContain('border-[#9747FF]');

    fireEvent.click(guitarTagButton);
    expect(guitarTagButton.className).toContain('border-[#9747FF]');
    expect(guitarTagButton.className).not.toContain('border-transparent');

    fireEvent.click(guitarTagButton);
    expect(guitarTagButton.className).toContain('border-transparent');
    expect(guitarTagButton.className).not.toContain('border-[#9747FF]');
  });

  test('onChange가 호출된다.', () => {
    const handleChange = jest.fn();
    render(<TagSelector tags={mockTags} onChange={handleChange} />);
    fireEvent.click(screen.getByText('드럼'));
    expect(handleChange).toHaveBeenCalledWith(['드럼']);
    fireEvent.click(screen.getByText('드럼'));
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  test('여러개의 태그가 잘 선택된다.', () => {
    const handleChange = jest.fn();
    render(<TagSelector tags={mockTags} onChange={handleChange} />);
    const vocalButton = screen.getByText('보컬');
    const guitarButton = screen.getByText('기타');
    const drumButton = screen.getByText('드럼');

    fireEvent.click(vocalButton);
    expect(handleChange).toHaveBeenLastCalledWith(['보컬']);

    fireEvent.click(guitarButton);
    expect(handleChange).toHaveBeenLastCalledWith(['보컬', '기타']);

    fireEvent.click(drumButton);
    expect(handleChange).toHaveBeenLastCalledWith(['보컬', '기타', '드럼']);

    fireEvent.click(guitarButton);
    expect(handleChange).toHaveBeenLastCalledWith(['보컬', '드럼']);
  });
});
