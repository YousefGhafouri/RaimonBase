import { DemoStoreState } from './type';
import { createDemoStore } from './store';
import { useContext, useRef } from 'react';
import { StoreApi, useStore } from 'zustand';
import { createContext } from 'react';
import useMulti from '@Base/hooks/multiStateZustand';

const DemoStoreContext = createContext<StoreApi<DemoStoreState> | null>(null);
DemoStoreContext.displayName = 'DemoStore';

const DemoStoreProvider: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    //#region hooks
    // const [demoStore] = useState<StoreApi<DemoStoreState>>(()=>createDemoStore())
    // that is exactly like
    const demoStore = useRef<StoreApi<DemoStoreState>>(createDemoStore());
    // end of comment
    //#endregion
    return (
        <DemoStoreContext.Provider value={demoStore.current}>
            {children}
        </DemoStoreContext.Provider>
    );
};

export function useDemoStore<const K extends readonly (keyof DemoStoreState)[]>(
    ...items: K
): Pick<DemoStoreState, K[number]> {
    const store  = useContext(DemoStoreContext);
    if (store  === null)
        throw new Error('Missing DemoStoreContext.Provider in the tree');
    return useMulti(store , ...items);
}

export default DemoStoreProvider;
