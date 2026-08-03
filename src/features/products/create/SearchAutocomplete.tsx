import { useState } from "react";
import { Autocomplete, TextField, CircularProgress, Box } from "@mui/material";

interface Option {
    id: string;
    name: string;
}

interface FormAutocompleteProps {
    name: string;
    label: string;
    useQueryHook: (searchTerm: string) => { data?: Option[]; isLoading: boolean };
    error?: string;
    defaultValue?: Option | null;
}

export function FormAutocomplete({
    name,
    label,
    useQueryHook,
    error,
    defaultValue = null,
}: FormAutocompleteProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedValue, setSelectedValue] = useState<Option | null>(defaultValue);

    const { data: options = [], isLoading } = useQueryHook(searchTerm);

    return (
        <Box>
            <input type="hidden" name={name} value={selectedValue?.id || ""} />

            <Autocomplete
                value={selectedValue}
                options={options}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onInputChange={(_, newInputValue) => setSearchTerm(newInputValue)}
                onChange={(_, newValue) => setSelectedValue(newValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        error={!!error}
                        helperText={error}
                        slotProps={{
                            ...params.slotProps,
                            input: {
                                ...params.slotProps?.input,
                                endAdornment: (
                                    <>
                                        {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.slotProps?.input?.endAdornment}
                                    </>
                                ),
                            },
                        }}
                    />
                )}
            />
        </Box>
    );
}
