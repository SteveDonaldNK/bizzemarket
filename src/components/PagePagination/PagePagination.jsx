import { Box, Pagination } from '@mui/material'
import React from 'react'

export default function PagePagination({count, handlePageChange, currentPage}) {

  return (
    <Box justifyContent="center" alignItems="center" display="flex" sx={{margin: "20px 0px"}}>
        <Pagination defaultPage={currentPage} count={count} onChange={handlePageChange}/>
    </Box>
  )
}
