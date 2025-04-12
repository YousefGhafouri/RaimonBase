import RaiRichTextEditor from "@Base/components/base/RaiRichTextEditor";
import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import { IAllProps } from "@tinymce/tinymce-react";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Props<U extends FieldValues> extends IAllProps{
  editor_ref:React.MutableRefObject<undefined>
  control: Control<U, any>;
  registerName: Path<U>;
  label?: string;
  slotProps?:{
    textField:TextFieldProps
  }
}

function RaiControlledRichTextEditor<U extends FieldValues>({editor_ref,registerName,control,label,slotProps,...props}:Props<U>) {
  return (
    <Controller
      name={registerName}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        // formState
      }) => (
        <Box>
          {label ? (
            <TextField focused={false} InputLabelProps={{shrink:false}} inputProps={{readOnly: true,}} value='' label={label} helperText={error?.message} error={!!error} {...slotProps?.textField} />
          ) : error ? (
            <Typography sx={{ color: "red", fontSize: "12px", mt: 1 }}>
              {error?.message}
            </Typography>
          ) : null}
          <RaiRichTextEditor value={value} 
            onEditorChange={(value, editor) => onChange(value)} editor_ref={editor_ref} {...props} />
        </Box>
      )}
    />
  )
}

export default RaiControlledRichTextEditor