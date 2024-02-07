import { MoreVert } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Paper, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";



export function DashboardCard1(props){

    const {title,filterTitle,filterValue,compareTitle,compareValue} = props;
  
    ChartJS.register(ArcElement, Tooltip, Legend);

    var data = {
      labels: [
        "Food & Drinks","Housing","Party"
      ],
      datasets: [{
        data: [300, 500, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
  
  
    return <>
        <Box className="dashboard-box"> 
        <Paper elevation={10} className="dashboard-card">
              <Box sx={{display:'inline-flex',alignItems:'center',width:'100%',justifyContent:'space-between'}}>
                  <Typography variant="h6" >{title}</Typography>
                  <IconButton sx={{justifySelf:'right'}}>
                    <MoreVert/>
                  </IconButton>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                <Box sx={{display:'flex',flexDirection:"column"}}>
                    <Typography variant="body2" sx={{color:'grey'}}>{filterTitle}</Typography>
                    <Typography variant="body2">
                      {filterValue}
                    </Typography>
                </Box>
                <Box sx={{display:'flex',flexDirection:"column",alignItems:'flex-end'}}>
                    <Typography variant="body2" sx={{color:'grey'}}>{compareTitle}</Typography>
                    <Typography variant="body1" sx={{color:'green',fontWeight:'700'}}>{compareValue}</Typography>
                </Box>
              </Box>
              <Box sx={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center',width:'100%',paddingBottom:'1rem'}}>
                {/* Content Box */}
                <Doughnut data={data} width={500}
                    height={200}
                    options={{ maintainAspectRatio: false ,
                        cutout: 70,

                        plugins:{legend:{display:false}}}}></Doughnut>
              </Box>
              <Box>
                <Divider sx={{ borderBottomWidth: 5 }}/>
                <Button>Show More</Button>
              </Box>
        </Paper>
        </Box>
    </>
  }