import { useState, useEffect } from 'react';

export function useCountUp(end, duration = 400) {
  const [value, setValue] = useState(end);

  useEffect(() => {
    let startTimestamp = null;
    const startValue = value;
    
    // If we're already at the end value, don't animate
    if (startValue === end) return;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setValue(startValue + (end - startValue) * easeProgress);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration]); // Intentionally omitting `value` so it animates from CURRENT value

  return value;
}
