import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';

export function useAnimateNumber({ from, to }) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        setValue(Math.round(value));
      }
    });
    return () => controls.stop();
  }, [from, to]);

  return value
}
