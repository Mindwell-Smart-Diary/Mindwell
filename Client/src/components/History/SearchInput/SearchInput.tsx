import { IconButton, InputBase, Paper } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";

export const SearchInput = (props: { setValue: (val: string) => void }) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            props.setValue(value)
        }, 500)

        return () => clearTimeout(timer)
    }, [props, value])

    return (
        <Paper
            component="form"
            sx={{ my: 2, p: '4px', display: 'flex', borderRadius: 5, alignItems: 'center', width: '100%', boxShadow: 'none' }}
        >
            <InputBase
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
                sx={{
                    ml: 2, flex: 1, textOverflow: 'ellipsis', input: {
                        "&::placeholder": {
                            opacity: 0.7,
                        }
                    }
                }}
                placeholder="Which memory would you like to recall?"
                inputProps={{
                    'aria-label': 'Which memory would you like to recall?',
                    style: {
                        textOverflow: 'ellipsis'
                    }
                }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>)
}