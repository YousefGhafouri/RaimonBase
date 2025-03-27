import { Button, Fade, Modal, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useModal from '@Raimon_Base/hooks/Modal';

function ShModal() {
    const { modals, closeModal } = useModal((state) => ({
        modals: state.modals,
        closeModal: state.closeModal,
    }));

    return (
        <>
            {modals.map(({ ContentComponent, props, contentProps, id }) => (
                <Modal
                    key={id}
                    sx={{
                        mx: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClose={closeModal}
                    open
                    {...props}
                >
                    <Fade in>
                        <Paper
                            sx={{
                                padding: 1,
                                overflowY: 'auto',
                                position: 'relative',
                                width: '800px',
                                maxHeight: '70vh',
                            }}
                            elevation={1}
                        >
                            <Button
                                sx={{
                                    padding: 1,
                                    position: 'absolute',
                                    right: 0,
                                    top: 5,
                                    zIndex: 999999,
                                }}
                                onClick={closeModal}
                            >
                                <CloseIcon />
                            </Button>
                            <ContentComponent
                                {...contentProps}
                                closeModal={closeModal}
                            />
                        </Paper>
                    </Fade>
                </Modal>
            ))}
        </>
    );
}

export default ShModal;
