import Box from '@mui/material/Box';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Modal,
    Typography,
} from '@mui/material';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

function ConfirMation({
    closeModal,
    onConfirm,
    content,
}: {
    closeModal: (inp?: any) => void;
    onConfirm?: (closeModal: () => void) => Promise<void> | void;
    content?: any;
}) {
    const confirmation = async () => {
        if (onConfirm) {
            await onConfirm(closeModal);
        }
    };
    return (
        <Dialog open onClose={closeModal}>
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                <ReportGmailerrorredIcon fontSize='large' />
                <Divider />
                {content ? (
                    content
                ) : (
                    <Typography>ایا اطمینان دارید ؟</Typography>
                )}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                ></Box>
            </DialogContent>
            <DialogActions sx={{flexDirection:'row-reverse',gap:1}} >
                <Button
                    variant="contained"
                    color="success"
                    onClick={confirmation}
                >
                    بله
                </Button>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={closeModal}
                >
                    خیر
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirMation;
