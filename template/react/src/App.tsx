
import React, { useState } from "react";

export default () => {
  const [count, setCount] = useState(0);

  return <>
      <span>App 3</span>
      <span onClick={() => setCount(count + 1)}>+</span>
      <span>{count}</span>
      <span onClick={() => setCount(count - 1)}>-</span>
  </>;
}
