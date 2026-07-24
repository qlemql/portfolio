'use client';

import { useEffect, useRef, useState } from 'react';

type UseScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
};

/**
 * Intersection Observer를 활용한 스크롤 기반 요소 가시성 감지 훅
 * 
 * @param options.threshold - 요소가 얼마나 보여야 트리거될지 (0~1, 기본값 0.1)
 * @param options.rootMargin - 뷰포트 마진 (기본값 "0px 0px -50px 0px")
 * @param options.triggerOnce - 한 번만 트리거할지 (기본값 true)
 * @returns { ref, isVisible } - 요소에 연결할 ref와 가시성 상태
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // prefers-reduced-motion 체크 - 모션 감소 선호 시 바로 보이게
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // matchMedia는 서버에 없어 렌더 중엔 못 읽음 — 마운트 후에만 확인 가능.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

