import { StoreApi, useStore } from 'zustand';


const useMulti = <T extends object, K extends keyof T>(
  store: StoreApi<T>,
  ...items: K[]
): Pick<T, K> => {
  return useStore(store, (state) => {
      return items.reduce(
          (carry, item) => ({
              ...carry,
              [item]: state[item],
          }),
          {}
      ) as Pick<T, K>;
  });
};
export default useMulti