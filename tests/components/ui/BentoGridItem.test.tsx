import React from 'react';
import { render, screen } from '@testing-library/react';
import { BentoGridItem } from '@/components/ui/BentoGridItem';

describe('BentoGridItem Component', () => {
  it('renders children correctly', () => {
    render(<BentoGridItem>Test Content</BentoGridItem>);

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies glass-card class', () => {
    const { container } = render(<BentoGridItem>Test Content</BentoGridItem>);

    expect(container.firstChild).toHaveClass('glass-card');
  });

  it('applies additional className', () => {
    const { container } = render(
      <BentoGridItem className="custom-class">Test Content</BentoGridItem>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies correct colSpan classes', () => {
    const { container } = render(<BentoGridItem colSpan={2}>Test Content</BentoGridItem>);

    expect(container.firstChild).toHaveClass('sm:col-span-2');
  });

  it('applies correct rowSpan classes', () => {
    const { container } = render(<BentoGridItem rowSpan={2}>Test Content</BentoGridItem>);

    expect(container.firstChild).toHaveClass('md:row-span-2');
  });
});