import CloseIcon from '@mui/icons-material/Close';
import { Button, Fade, Modal, ModalProps, Paper } from '@mui/material';

function RaiModal({children,...props}:ModalProps) {
    const {onClose:closeModal} = props
    return (
        <Modal
            sx={{
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
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
                    {children}
                </Paper>
            </Fade>
        </Modal>
    );
}

export default RaiModal;
