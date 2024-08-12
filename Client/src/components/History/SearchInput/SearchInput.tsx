import { IconButton, InputBase, Paper } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

export const SearchInput = () => {
    return (<Paper
        component="form"
        sx={{ my: 2, p: '4px', display: 'flex', borderRadius: 5, alignItems: 'center', width: '100%' }}
    >
        <InputBase
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