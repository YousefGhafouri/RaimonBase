import { useModal } from '@Base/provider/ModalProvider';

function RaiModal() {
    const modals = useModal((state) => state.modals);
    const closeModal = useModal((state) => state.closeModal);
    return modals.map((Modal) => (
        <Modal.ContentComponent key={Modal.id} closeModal={closeModal(Modal)} {...Modal.contentProps} />
    ));
}

export default RaiModal;
