// components/SlotDialog.tsx

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  IconButton,
  useTheme,
  Typography,
  Slide,
  SlideProps,
  DialogProps
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(
  props: SlideProps,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export type SlotDialogProps = Omit<DialogProps, 'children'|'slotProps'|'slots'> & {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  slots?: {
    Header?: React.ElementType;
    Content?: React.ElementType;
    Footer?: React.ElementType;
    CloseButton?: React.ElementType;
    root?: DialogProps['slots'];
  };
  slotProps?: {
    Header?: React.ComponentProps<any>;
    Content?: React.ComponentProps<any>;
    Footer?: React.ComponentProps<any>;
    CloseButton?: React.ComponentProps<any>;
    root?: DialogProps['slotProps'];
  };
  actions?: React.ReactNode;
  children?: React.ReactNode;
};

const RaiDialoge: React.FC<SlotDialogProps> = ({
  open,
  onClose,
  title,
  slots = {},
  slotProps = {transition:Transition},
  actions,
  children,
  ...dialogProps
}) => {
  const theme = useTheme();

  const Header = slots.Header || Box;
  const Content = slots.Content || DialogContent;
  const Footer = slots.Footer || DialogActions;
  const CloseButton = slots.CloseButton || IconButton;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      {...dialogProps}
      slots={slots.root}
      slotProps={slotProps.root}
    >
      <Header
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          px: 2,
          py: 1,
        }}
        {...slotProps?.Header}
      >
        <Typography variant="h6">{title}</Typography>
        <CloseButton
          onClick={onClose}
          sx={{ color: theme.palette.primary.contrastText }}
          {...slotProps?.CloseButton}
        >
          <CloseIcon />
        </CloseButton>
      </Header>

      <Content dividers={!!actions} {...slotProps.Content}>{children}</Content>

      {actions && (
        <Footer sx={{flexDirection:'row-reverse',gap:2}}  {...slotProps?.Footer}>
          {actions}
        </Footer>
      )}
    </Dialog>
  );
};

export default RaiDialoge