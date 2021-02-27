import React, { ReactElement, useState } from 'react';

const Title = React.lazy(() => import('./components/Title'));

export default (): ReactElement => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Title />
      <span>App 3</span>
      <span onClick={() => setCount(count + 1)}>+</span>
      <span>{count}</span>
      <span onClick={() => setCount(count - 1)}>-</span>
    </>
  );
};
