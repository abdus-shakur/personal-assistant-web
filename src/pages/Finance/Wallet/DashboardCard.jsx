import { Home as HomeIcon, MoreVert } from "@mui/icons-material";
import { Alert, Avatar, Box, Button, ButtonGroup, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, MenuItem, Paper, Select, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";

import { CategoryScale,LinearScale,PointElement ,LineElement,LineController,Filler} from "chart.js";




export function DashboardCard1(props){

    const {title,filterTitle,filterValue,compareTitle,compareValue} = props;
  
    ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement,LineElement,LineController,Filler);


    const [showDialog,setShowDialog] = useState(false);

    const handleMore = ()=>{

    };


    var doughnutContent = ()=>{
        
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
        return (
        <Doughnut data={data} width={500} height={200}
            options={{ maintainAspectRatio: false , cutout: 70,
            plugins:{legend:{display:false}}}}></Doughnut>
     )
    }

    var listContent = ()=>{
        return (<>
        <List sx={{width:"100%"}}>
            <ListItem >
                <ListItemAvatar>
                    <Avatar sx={{backgroundColor:'red'}}><HomeIcon/></Avatar>
                </ListItemAvatar>
                <ListItemText primary="Housing" secondary="Savings"></ListItemText>
                <ListItemSecondaryAction sx={{textAlign:'right'}}>
                    <Typography>-30,000</Typography>
                    <Typography>3 Feb</Typography>
                </ListItemSecondaryAction>
            </ListItem>
            </List>
        </>)
    }

    var trendContent = ()=>{

        var buttons = ["Cash Flow","Expense","Income"];


        const data = {
            labels: ["January", "February", "March", "April", "May", "June"],
            fill:true,
            datasets: [
              {
                label: "Income",
                data: [65, 59, 80, 81, 56, 55],
                fill: true,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgba(255, 99, 132, 0.2)",
                backgroundColor:(context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "rgba(255, 99, 132, 1)");
                    gradient.addColorStop(1, "rgba(255, 99, 132, 0)");
                    return gradient;
                  },
                order:2
              },
              {
                label: "Expense",
                data: [28, 48, 40, 19, 86, 27],
                fill: true,
                // backgroundColor: "rgb(54, 162, 235)",
                borderColor: "rgba(54, 162, 235, 0.2)",
                backgroundColor:(context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "rgba(54, 162, 235,1)");
                    gradient.addColorStop(1, "rgba(54, 162, 235,0)");
                    return gradient;
                  },
                order:1
              },
            ],
          };
          
          const options = {
            tension:0.4,
            // type:"line",
            title: {
              display: true,
              text: "Line Chart",
            },
            fill:true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          };

          
        return (<>
            <Container sx={{width:'100%',textAlign:'center'}}>
                <ButtonGroup buttonFlex={1} sx={{
                    width: '100%'
                }}>
            {buttons.map(button=><Button sx={{':focus':{backgroundColor:(theme)=>theme.palette.primary.main,color:(theme)=>theme.palette.primary.contrastText}}}>{button}</Button>)}
                </ButtonGroup>
                <Line data={data} options={options}></Line>
            </Container>
        </>)
    }
  
    return <>
        <Box className="dashboard-box" draggable="true" sx={{resize:'both',overflow:'auto'}}> 
        <Paper elevation={10} className="dashboard-card">
              <Box sx={{display:'inline-flex',alignItems:'center',width:'100%',justifyContent:'space-between'}}>
                  <Typography variant="h6" >{title}</Typography>
                  <IconButton sx={{justifySelf:'right'}} onClick={()=>setShowDialog(true)}> 
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
              <Box sx={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center',paddingBottom:'1rem'}}>
                {trendContent()}
              </Box>
              <Box>
                <Divider sx={{ borderBottomWidth: 5 }}/>
                <Button onClick={handleMore}>Show More</Button>
              </Box>
        </Paper>
        <Dialog open={showDialog} sx={{width:'100%',maxWidth:'150rem'}} fullWidth={true} onClose={()=>setShowDialog(false)} >
            <DialogTitle>Card Configuration</DialogTitle>
            <DialogContent>
                <Container >
                    <Container>
                    <FormControl sx={{width:'100%',marginTop:'1rem'}}>
                        <InputLabel id="select-label-id">Select Period</InputLabel>
                        <Select labelId="select-label-id" label="Select Period" value={"This Month"}>
                            <MenuItem value={"next month"}>Next Month</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{width:'100%',marginTop:'1rem',marginBottom:'1rem'}}>
                        <InputLabel id="select-label-id1">Filter</InputLabel>
                        <Select labelId="select-label-id1" label="Filter" value={"None"} placeholder="None">
                            <MenuItem value={"food"}>Food</MenuItem>
                        </Select>
                    </FormControl>
                    </Container>
                <Alert>TIP : Long touch on a Card to Change the position</Alert>
                </Container>
            </DialogContent>
            <DialogActions>
                <Box sx={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                    <Box>
                        <Button color="error">Remove Card</Button>
                    </Box>
                    <Box>
                        <Button onClick={()=>setShowDialog(false)}>Cancel</Button>
                        <Button>Save</Button>
                    </Box>
                </Box>
                
                

            </DialogActions>
        </Dialog>
        </Box>
    </>
  }