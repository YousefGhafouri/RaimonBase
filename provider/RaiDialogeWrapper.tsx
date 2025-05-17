import RaiDialoge, { SlotDialogProps } from '@Base/components/base/RaiDialoge';
import React, { Children } from 'react';
import {useModal} from '@Base/provider/ModalProvider';

export type WrapperComponent = (props:{children:React.ReactNode} & Partial<SlotDialogProps>)=>React.ReactNode

function RaiDialogeWrapper() {
    const modals = useModal((state) => state.modals);
    const closeModal = useModal((state) => state.closeModal);

    return (
        <>
            {modals.map(
                (modalItem) => {
                    // @ts-ignore
                    const { ContentComponent, props, width, contentProps, id } = modalItem
                    const onClose = closeModal(modalItem)
                    return (
                      <ContentComponent
                            key={id}
                          {...contentProps}
                          closeModal={onClose}
                          Wrapper={(wrapperProps:{children:React.ReactNode} & Partial<SlotDialogProps>)=>(
                            <RaiDialoge open onClose={onClose} {...wrapperProps} />
                          )}
                      />
                    )
                }
            )}
        </>
    );
}

export default RaiDialogeWrapper;
