import './style.css';
import React, { useState, Suspense, ReactElement } from 'react';

const Placeholder = () =>
  React.createElement('div', {
    className: 'placeholder',
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: `__placeholder__` }
  });

const Title = React.lazy(() => import('./components/Title'));

export default (): ReactElement => {
  const [count, setCount] = useState(0);

  return (
    <>
      <span>App 1</span>
      <span onClick={() => setCount(count + 1)}>+</span>
      <span>{count}</span>
      <span onClick={() => setCount(count - 1)}>-</span>
      <Placeholder></Placeholder>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Title />
      </Suspense>
    </>
  );
};
