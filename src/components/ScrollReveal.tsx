'use client';

import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** 애니메이션 방향: 'up' | 'down' | 'left' | 'right' | 'none' */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** 애니메이션 지연 시간 (ms) */
  delay?: number;
  /** 애니메이션 지속 시간 (ms) */
  duration?: number;
  /** 요소가 얼마나 보여야 트리거될지 (0~1) */
  threshold?: number;
  /** 한 번만 애니메이션할지 */
  once?: boolean;
};

/**
 * 스크롤 시 요소가 뷰포트에 진입하면 페이드인 + 슬라이드 애니메이션을 적용하는 래퍼 컴포넌트
 * 
 * @example
 * <ScrollReveal direction="up" delay={100}>
 *   <div>내용</div>
 * </ScrollReveal>
 */
export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 500,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold,
    triggerOnce: once,
  });

  // 방향에 따른 초기 transform 값
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(24px)';
      case 'down':
        return 'translateY(-24px)';
      case 'left':
        return 'translateX(24px)';
      case 'right':
        return 'translateX(-24px)';
      case 'none':
        return 'none';
      default:
        return 'translateY(24px)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : getInitialTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

