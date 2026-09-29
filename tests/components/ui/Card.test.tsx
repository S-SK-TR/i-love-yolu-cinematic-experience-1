import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '@/components/ui/Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(<Card>Test Content</Card>);

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies glass-card class', () => {
    const { container } = render(<Card>Test Content</Card>);

    expect(container.firstChild).toHaveClass('glass-card');
  });

  it('applies additional className', () => {
    const { container } = render(<Card className="custom-class">Test Content</Card>);

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has correct ARIA attributes', () => {
    render(<Card>Test Content</Card>);

    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('aria-label', 'Content card');
  });
});