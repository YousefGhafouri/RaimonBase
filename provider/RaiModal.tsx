import { useModal, ModalStateI } from '@Base/provider/ModalProvider';
import React from 'react';

interface Props<T extends object>{
  modal:ModalStateI<T>
  closeModal:(inp?:any)=>void
}

function RenderModal <T extends object>({modal,closeModal}:Props<T>):React.ReactNode{
  if(typeof modal.ContentComponent === "function") return <modal.ContentComponent closeModal={closeModal}  {...modal.contentProps} />
  return modal.ContentComponent
  // fixme:do sth
  const childrenWithProps = React.Children.map(modal.ContentComponent, child => {
    // Checking isValidElement is the safe way and avoids a typescript error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        closeModal: closeModal,
        // @ts-ignore
        ...child.props,
      });
    }
    return child;
  });

  return <>{childrenWithProps}</>
  // return modal.ContentComponent
}

function RaiModal() {
  const modals = useModal((state) => state.modals);
  const closeModal = useModal((state) => state.closeModal);
    return modals.map((Modal) => (
      <RenderModal key={Modal.id} modal={Modal} closeModal={closeModal(Modal)} />
    ));
}

export default RaiModal;
