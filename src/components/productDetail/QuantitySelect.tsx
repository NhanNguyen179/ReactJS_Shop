import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@mui/material";

type quantityProps = {
  onChange: (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void;
  value: string;
  firstValue: string;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Quantityselect({
  onChange,
  value,
  firstValue,
}: quantityProps) {
  return (
    <FormControl variant="outlined" fullWidth>
      <Select
        value={value ? value : 1}
        onChange={onChange}
        inputProps={{
          name: "quantity",
        }}
        MenuProps={MenuProps}
        fullWidth
        defaultValue={1}
      >
        {[...Array(firstValue)].map((_, i) => (
          <MenuItem key={i} value={i + 1}>
            {i + 1}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
