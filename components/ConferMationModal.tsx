import Box from '@mui/material/Box';
import { Button, Divider, Typography } from '@mui/material';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

function ConfirMation({
    closeModal,
    onConfirm,
    content,
}: {
    closeModal: () => void;
    onConfirm?: (closeModal: () => void) => Promise<void> | void;
    content?: any;
}) {
    const confirmation = async () => {
        if (onConfirm) {
            await onConfirm(closeModal);
        }
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
            }}
        >
            <ReportGmailerrorredIcon />
            <Divider />
            {content ? content : <Typography>ایا اطمینان دارید ؟</Typography>}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
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
            </Box>
        </Box>
    );
}

export default ConfirMation;
