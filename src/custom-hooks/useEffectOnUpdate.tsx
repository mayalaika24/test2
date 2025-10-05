import { useEffect, useRef } from 'react';

const useEffectOnUpdate = (
  callback: VoidFunction,
  dependencies: Array<any>
) => {
  const isFirstRender = useRef(true);
  const initialDependencies = useRef(dependencies);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const hasChanged = dependencies.some(
      (dep: any, i: number) => dep !== initialDependencies.current[i]
    );

    if (hasChanged) {
      callback();
    }
  }, dependencies);
};

export default useEffectOnUpdate;
