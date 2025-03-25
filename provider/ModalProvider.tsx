"use client";
import React, { useState } from "react";

interface IModal<T extends object> {
  ContentComponent: React.FC<
    Omit<T, "closeModal"> & { closeModal: (inp: any) => void }
  >;
  contentProps: T;
  id?: number | string;
  resolve?: (value: unknown) => void;
  reject?: (value: unknown) => void;
}
interface ModalStateI<T extends object> extends IModal<T> {
  id:number
}
type openModal = {
  openModal: <T extends object>(inp: IModal<T>) => void;
  openAsyncModal: <T extends object>(
    inp: IModal<T>
  ) => Promise<unknown>;
};
const ModalContext = React.createContext<openModal>(null);
ModalContext.displayName = "modal";
interface Props {
  children: React.ReactNode;
}

const ModalProvider: React.FC<Props> = ({ children }) => {
  const [modals, setModals] = useState<Array<ModalStateI<any>>>(
    []
  );
  const openModal = <T extends object>(modal: IModal<T>) => {
    setModals((prev) => {
      const last = prev.length;
      const id = last ? prev[last - 1]?.id + 1 : 0;
      const newModal = { ...modal, id };
      return [...prev, newModal];
    });
  };
  const openAsyncModal = <T extends object>(modal: IModal<T>) => {
    return new Promise((resolve, reject) => {
      setModals((prev) => {
        const last = prev.length;
        const id = last ? prev[last - 1]?.id + 1 : 0;
        const newModal = { ...modal, id, resolve, reject };
        return [...prev, newModal];
      });
    });
  };
  return (
    <ModalContext.Provider value={{ openModal, openAsyncModal }}>
      {modals.map((Modal, index) => (
        <Modal.ContentComponent
          key={Modal.id}
          closeModal={(data) => {
            Modal.resolve(data);
            setModals((prev) => prev.filter((item) => item.id != Modal.id));
          }}
          {...Modal.contentProps}
        />
      ))}
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const modal = React.useContext(ModalContext);
  if (modal == null)
    throw new Error("Missing ModalContext.Provider in the tree");
  return modal;
};
export default ModalProvider;
