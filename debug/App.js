import './style.css';
import React, { useState, Suspense } from 'react';

const Placeholder = (props) =>
  React.createElement('div', {
    className: 'placeholder',
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: `{{placeholder${props.placeHolderId}}}` }
  });

const Title = React.lazy(() => import('./components/Title'));

export default () => {
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
