"use client";
import { darken, lighten, styled } from "@mui/material";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import Chip, { ChipTypeMap } from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.light, 0.85),
  ...theme.applyStyles("dark", {
    backgroundColor: darken(theme.palette.primary.main, 0.8),
  }),
}));

const GroupItems = styled("ul")({
  padding: 0,
});

export interface IRaiAutoCompleteProps<T>
  extends Omit<
    AutocompleteProps<
      T,
      boolean | undefined,
      boolean | undefined,
      boolean | undefined,
      ChipTypeMap["defaultComponent"]
    >,
    "renderInput" | "slotProps"
  > {
  loading?: boolean;
  label: string;
  itemValue?: keyof T | "value";
  itemLabel?: keyof T | "label";
  slotProps?: AutocompleteProps<
    T,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined,
    ChipTypeMap["defaultComponent"]
  >["slotProps"] & { textField?: TextFieldProps };
}

export default function RaiAutocomplete<
  T
>({
  label,
  loading,
  itemValue = "value",
  itemLabel = "label",
  size = "small",
  slotProps: {
    textField: resetTextField,
    ...restOfSlots
  } = {},
  ...reset
}: IRaiAutoCompleteProps<T>) {
  return (
    <Autocomplete
      fullWidth
      noOptionsText="موردی موجود  نیست"
      loadingText="در حال بارگزاری..."
      loading={loading}
      size={size}
      slotProps={restOfSlots}
      {...reset}
      getOptionLabel={(option) => {
        if (reset.options.some((op) => typeof op !== "string")) {
          return (
            ((option as NonNullable<T>)?.[itemLabel as keyof T]?.toString() ||
              reset.options
                .find((item) => item[itemValue as keyof T] === option)
                ?.[itemLabel as keyof T]?.toString()) ??
            "-"
          );
        }
        return (option as string) ?? "-";
      }}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      disableCloseOnSelect={reset.multiple}
      filterSelectedOptions
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          const { key, ...tagProps } = getTagProps({
            index,
          });
          return (
            <Chip
              size={size}
              key={key}
              label={
                reset.options.some((op) => typeof op !== "string")
                  ? (option as NonNullable<T>)?.[
                      itemLabel as keyof T
                    ]?.toString() ||
                    reset.options
                      .find((item) => item[itemValue as keyof T] === option)
                      ?.[itemLabel as keyof T]?.toString() ||
                    "-"
                  : (option as string) || "-"
              }
              {...tagProps}
            />
          );
        })
      }
      renderInput={(params) => {
        return (
          <TextField
            {...resetTextField}
            {...params}
            label={label}
            InputProps={{
              ...resetTextField?.InputProps,
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="primary" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        );
      }}
    />
  );
}
