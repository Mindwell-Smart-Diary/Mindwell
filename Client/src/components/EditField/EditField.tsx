import React, { useState } from "react";
import {
    TextField,
    IconButton,
    Box,
    Typography,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { getHebrewDate } from "@/utilities/DateUtils";

interface EditFieldProps {
    label: string;
    value: any;
    options?: any[];
    isDate?: boolean;
    isPassword?: boolean;
    onSave: (newValue: string) => void;
}

const EditField: React.FC<EditFieldProps> = ({
    label,
    value,
    options,
    onSave,
    isDate,
    isPassword,
}) => {
    const [editMode, setEditMode] = useState(false);
    const [editedValue, setEditedValue] = useState<any>();

    const handleSave = () => {
        onSave(editedValue);
        setEditMode(false);
        editedValue();
    };

    const handleCancle = () => {
        setEditMode(false);
        editedValue();
    };

    return (
        <>
            <Typography variant="subtitle1" fontWeight="bold">
                {label}:
            </Typography>
            <Box display="flex" alignItems="center" width="100%">
                {editMode ? (
                    <>
                        {isDate ? (
                            <TextField
                                sx={{
                                    "& input": {
                                        height: 15,
                                    },
                                }}
                                InputProps={{
                                    inputProps: { style: { textAlign: "left" } },
                                }}
                                fullWidth
                                type="date"
                                variant="standard"
                                value={editedValue}
                                onChange={(e) => setEditedValue(e.target.value)}
                            />
                        ) : options ? (
                            <FormControl fullWidth>
                                <RadioGroup
                                    value={editedValue ?? value}
                                    onChange={(e) => setEditedValue(e.target.value)}
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    {options.map((g) => (
                                        <FormControlLabel
                                            key={g}
                                            value={g}
                                            control={<Radio />}
                                            label={g}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        ) : (
                            <TextField
                                type={isPassword ? "password" : ""}
                                variant="standard"
                                value={editedValue}
                                onChange={(e) => setEditedValue(e.target.value)}
                                fullWidth
                            />
                        )}
                        <IconButton color="primary" onClick={handleSave}>
                            <SaveIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={handleCancle}>
                            <ClearIcon />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <Typography variant="subtitle1">
                            {isDate ? getHebrewDate(value, false) : value}
                        </Typography>
                        <IconButton onClick={() => setEditMode(true)}>
                            <EditIcon />
                        </IconButton>
                    </>
                )}
            </Box>
        </>
    );
};

export default EditField;