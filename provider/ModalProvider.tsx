'use client';
import { WrapperComponent } from '@Base/provider/RaiDialogeWrapper';
import React from 'react';
import { create } from 'zustand';

interface IModal<T extends object> {
    ContentComponent: React.FC<
        Omit<T, 'closeModal'> & { closeModal: (inp: any) => void, Wrapper:WrapperComponent }
    >;
    contentProps: T;
    id?: number | string;
    resolve?: (value: unknown) => void;
    reject?: (value: unknown) => void;
}

export interface ModalStateI<T extends object> extends IModal<T> {
    id: number;
}

interface State {
    modals: Array<ModalStateI<any>>;
}

interface Actions {
    openModal: <T extends object>(inp: IModal<T>) => void;
    openAsyncModal: <U extends unknown,T extends object>(inp: IModal<T>) => Promise<U|undefined>;
    closeModal: <T extends object>(inp: IModal<T>) => (inp?: unknown) => void;
}

const modalStore = create<State & Actions>((setState, getState) => ({
    modals: [],
    openModal: <T extends object>(modal: IModal<T>) => {
        const { modals } = getState();
        const last = modals.length;
        const id = last ? modals[last - 1]?.id + 1 : 0;
        const newModal = { ...modal, id };
        setState({
            modals: [...modals, newModal],
        });
    },
    openAsyncModal: <T extends object>(modal: IModal<T>) => {
        return new Promise((resolve, reject) => {
            const { modals } = getState();
            const last = modals.length;
            const id = last ? modals[last - 1]?.id + 1 : 0;
            const newModal = { ...modal, id,resolve,reject };
            setState({
                modals: [...modals, newModal],
            });
        });
    },
    closeModal: <T extends object>(modal: IModal<T>) => {
        return (data) => {
            const { modals } = getState();
            modal?.resolve?.(data);
            setState({
                modals: modals.filter((item) => item.id != modal.id),
            });
        };
    },
}));

const ModalContext = React.createContext<typeof modalStore | null>(null);
ModalContext.displayName = 'modal';
interface Props {
    children: React.ReactNode;
}

const ModalProvider: React.FC<Props> = ({ children }) => {
    return (
        <ModalContext.Provider value={modalStore}>
            {children}
        </ModalContext.Provider>
    );
};

export type UseModal = {
    (): State & Actions;
    <U = unknown>(selector: (state: State & Actions) => U): U;
};

// @ts-ignore
export const useModal: UseModal = (selector) => {
    const modal = React.useContext(ModalContext);
    if (modal == null)
        throw new Error('Missing ModalContext.Provider in the tree');
    return modal(selector);
};


export default ModalProvider;



export type FCModalParams<T extends (...args: any) => any>  = Omit<Parameters<T>[0],"closeModal">