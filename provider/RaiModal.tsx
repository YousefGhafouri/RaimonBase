import { useModal } from '@Base/provider/ModalProvider';

function RaiModal() {
    const { modals, closeModal } = useModal((state) => ({
        modals: state.modals,
        closeModal: state.closeModal,
    }));

    return modals.map((Modal) => (
        <Modal.ContentComponent key={Modal.id} closeModal={closeModal(Modal)} {...Modal.contentProps} />
    ));
}

export default RaiModal;
