import React, { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';
import { Text } from '@chakra-ui/react';

export function Counter({ from, to }) {
  const ref = useRef();

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        ref.current.textContent = Math.round(value);
      }
    });
    return () => controls.stop();
  }, [from, to]);

  return <Text fontSize='5xl' fontWeight='semibold' ref={ref} />;
}
