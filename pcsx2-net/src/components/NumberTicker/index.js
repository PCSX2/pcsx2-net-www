import React, { useState, useEffect, useRef } from 'react';

export function NumberTicker({ number, numberFunc }) {
  const [currVal, setCurrVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);

  let interval;
  const currValTracker = useRef(0);

  useEffect(() => {
    if (currVal >= maxVal) {
      clearInterval(interval);
    } else {
      currValTracker.current = currVal;
    }
  }, [currVal])

  useEffect(async () => {
    // Figure out the max value (either provided directly or via the function)
    if (numberFunc) {
      const num = await numberFunc();
      // TODO - handle error
      setMaxVal(num);
      const startingVal = Math.max(0, Math.round(num - (num * 0.025)));
      console.log(startingVal);
      setCurrVal(startingVal);
    } else {
      setMaxVal(number);
    }
    // Update the number at a set interval
    interval = setInterval(() => {
      setCurrVal(currValTracker.current + 1);
    }, 25);
  }, []);



  return <span>{currVal}</span>;

}
