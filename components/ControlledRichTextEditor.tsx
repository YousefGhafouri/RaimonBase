import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import { IAllProps } from "@tinymce/tinymce-react";
import RaiRichTextEditor from "Raimon_Base/components/RaiRichTextEditor";
import { Controller } from "react-hook-form";

interface Props extends IAllProps{
  editor_ref:React.MutableRefObject<undefined>
  name: string;
  label?: string;
  control: any;
  slotProps?:{
    textField:TextFieldProps
  }
}

function ControlledRichTextEditor({editor_ref,name,control,label,slotProps,...props}:Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        // formState
      }) => (
        <Box>
          {label ? (
            <TextField focused={false} InputLabelProps={{shrink:false}} inputProps={{readOnly: true,}} value='' label={label} helperText={error?.message} error={error} {...slotProps?.textField} />
          ) : error ? (
            <Typography sx={{ color: "red", fontSize: "12px", mt: 1 }}>
              {error?.message}
            </Typography>
          ) : null}
          <RaiRichTextEditor value={value} 
            onChange={(_, value) => onChange(value)} editor_ref={editor_ref} {...props} />
        </Box>
      )}
    />
  )
}

export default ControlledRichTextEditor