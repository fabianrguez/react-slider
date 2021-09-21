import { useEffect, useState } from 'react';

export default function useSlider({ initialValue = 0, totalItems, isDotNavigation = false, ref }) {
  const [progress, setProgress] = useState(initialValue);
  useEffect(() => {
    const { scrollWidth: contentScrollWidth, clientWidth: contentWidth, scrollLeft } = ref.current.firstChild;
    !isDotNavigation && setProgress((100 / contentScrollWidth) * (scrollLeft + contentWidth));
  }, [ref, isDotNavigation]);

  const updateProgress = (e) => {
    const { scrollWidth, scrollLeft, clientWidth } = e.target;
    if (isDotNavigation) {
      const scrollPercentage = (100 / scrollWidth) * (scrollLeft + clientWidth);
      setProgress(Math.floor(scrollPercentage / (totalItems / 100) / 1000));
    } else {
      setProgress((100 / scrollWidth) * (scrollLeft + clientWidth));
    }
  }

  const handleButton = (e) => {
    console.log(e)
    const isPrev = e.target.classList.contains('prev');

    const { clientWidth } = ref.current.firstChild;
    isPrev
      ? ref.current.firstChild.scrollLeft -= clientWidth
      : ref.current.firstChild.scrollLeft += clientWidth;
  }

  return {
    progress,
    updateProgress,
    handleButton
  }
}