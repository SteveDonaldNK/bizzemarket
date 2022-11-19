import { Box, Pagination } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'

export default function PagePagination({count, handlePageChange}) {
    // const [pagination, setPagination] = useState({
    //     count: 0,
    //     from: 0,
    //     to: pageSize
    // })

  return (
    <Box justifyContent="center" alignItems="center" display="flex" sx={{margin: "20px 0px"}}>
        <Pagination count={count} onChange={handlePageChange}/>
    </Box>
  )
}
