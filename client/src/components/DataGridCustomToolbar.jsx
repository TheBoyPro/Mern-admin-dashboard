import React from 'react'
import { Search, search }from '@mui/icons-material'
import { IconButton, TextField, InputAdornment } from '@mui/material'
import { GridToolbarContainer, GridToolbarDensitySelector, GridToolbarColumnsButton, GridToolbarExport } from '@mui/x-data-grid'
import FlexBetween from './FlexBetween'

function DataGridCustomToolbar({searchInput, setSearchInput, setSearch}) {
  return (
    <GridToolbarContainer>
        <FlexBetween width='100%'>
            <FlexBetween>
                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </FlexBetween>
            <TextField  
            label='search...'
            sx={{mb:'0.5rem', width:'15rem'}}
            onChange={(e) => {setSearchInput(e.target.value)}}
            value={searchInput}
            InputProps={{
                endAdornment:(
                    <InputAdornment>
                    <IconButton onClick={() => {
                        setSearch(searchInput)
                        setSearchInput('')
                    }}>
                        <Search />
                    </IconButton>
                    </InputAdornment>
                )
            }}
            />
        </FlexBetween>
    </GridToolbarContainer>
  )
}

export default DataGridCustomToolbar