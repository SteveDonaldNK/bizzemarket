import React from 'react'
import {Card, CardContent, Container, Typography} from '@mui/material'
import { CardsData } from '../../params'
import Chart from 'react-apexcharts'

export default function Stats({series, data}) {
  return (
    <div className='stat-container'>
      <h1>Aperçu</h1>
      <div className='cards'>
        {CardsData.map((card, key) => (
          <Card elevation={2} key={key}>
            <CardContent className='card-content' p={0}>
              <Typography className='title'>{card.title}</Typography>
              <div className='valueContainer'><span className='value'>{card.value}</span><span className='stats'>+3.35%</span></div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Container sx={{ boxShadow: 2, borderRadius: 2, background: "#FFF", height: "55%", width: "100%",p: "20px 10px", margin: "40px 0 !important"}}>
        <Chart series={series.series} type='area' options={data.options} />
      </Container>
    </div>
  )
}
