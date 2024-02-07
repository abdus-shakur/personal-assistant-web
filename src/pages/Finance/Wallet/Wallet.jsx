import { Add, Check, Clear, Create, Error, Home as HomeIcon, List as ListIcon, Menu, MoreVert, RecentActorsRounded} from "@mui/icons-material";
import { Autocomplete, Avatar, Backdrop, Badge, Box, Button, Chip, CircularProgress, Container, Divider, Fab, FormControl, Grid, Icon, IconButton, InputLabel, LinearProgress, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, ListSubheader, MenuItem, OutlinedInput, Paper, Select, Snackbar, SnackbarContent, SpeedDial, SpeedDialAction,  SpeedDialIcon,  TextField, Toolbar, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate, useParams, useRoutes } from "react-router-dom";
import { createRecord, fetchRecord, fetchRecordList, fetchSuggestion, fetchWalletDetails, getWalletCatergoryList, getWalletPaymentTypes, getWalletTransactionTypes } from "./Service/wallet-data";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from "moment";
import dayjs from 'dayjs'
import { DateTimePicker, LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";

import debounce from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { DashboardCard1 } from "./DashboardCard";
import LoadingOverlay from "../../Utils/Components/LoadingOverlay";

export default function Wallet(){

  const [slideIn,setSlideIn] = useState(true);

    const navigate = useNavigate();

    const actions = [
          {
            name:"Home",
            path:"home",
            element:<Home />,
            icon:<HomeIcon/>
        },
        {
            name:"View Records",
            path:"records",
            element:<ListRecords slideIn={slideIn}/>,
            icon:<ListIcon/>
        },{
            name:"Create Record",
            path:"create-record",
            element:<CreateWalletRecord slideIn={slideIn}/>,
            icon:<Create/>
        },
    ]

    // const [dialOpen,setDialOpen] = useState(false);
    
    return <React.Fragment>
        <Routes>
            {actions.length>0?<Route index={true} element={(actions[0].element)}/>:<React.Fragment/>}
            {actions.map(action=><Route path={action.path} key={action.path} element={action.element}/>)}
            <Route path="/record/:id" element={<CreateWalletRecord/>}/>
        </Routes>
        <SpeedDial
            ariaLabel="Wallet Page Navigation Speed Dial"
            sx={{ position: 'fixed', bottom: '1rem', right: '1rem' }}
            icon={<SpeedDialIcon />}
            // open={dialOpen}
            // onOpen={()=>setDialOpen(true)}
            // onClose={()=>setDialOpen(false)}
        >
            {actions.reverse().map((action) => (
            <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              
                onClick={()=>{navigate(action.path);setSlideIn(!slideIn);
                  // setDialOpen(!dialOpen);
                }}
            />
            ))}
        </SpeedDial>
       
    </React.Fragment>
}

export function Home(){

  const accountStyle = {
    height:'3rem',display:'flex',alignItems:'center',justifyContent:'center'
    ,backgroundColor:"red",':hover':{ boxShadow:'4rem',cursor:'pointer'}
  }

  const accounts = [
    {
      name:"Savings",
      balance:"100",
      type:"own",
      color:"green"
    },{
      name:"Current",
      balance:"60",
      type:"own",
      color:"red"
    },{
      name:"Cash",
      balance:"40",
      type:"own",
      color:"blue"
    },{
      name:"Other Account",
      balance:"76",
      type:"own",
      color:"blue"
    }
  ]

  const expenseStructure ={
    title:"Expense Structure",
    filterTitle:"This Month",
    filterValue:new Intl.NumberFormat('en-US', {style: 'currency',currency: 'INR',}).format(30000),
    compareTitle:"vs past period",
    compareValue:"-20%"
  }

  return <>
    {/** Accounts View */}
    <Box sx={{paddingLeft:'1rem',paddingRight:'1rem',paddingBottom:'0.5rem'}}>
      <Typography textAlign={"center"} variant="h4">Accounts</Typography>
      <Grid container spacing={2} sx={{paddingTop:'1rem'}} >
        {accounts.map(account=>
          <Grid item xs={6} md={4} lg={3}>
            <Paper elevation={6} sx={{...accountStyle,backgroundColor:account.color,color:(theme)=>theme.palette.text.primary}}>{account.name}</Paper>
          </Grid>)}
        </Grid>
      </Box>
      {/** Cards */}
      <Box sx={{display:'flex',flexWrap:'wrap',spacing:'2rem'}}>
          <DashboardCard1  {...expenseStructure} />
          {/* <DashboardCard1 {...expenseStructure} />
          <DashboardCard1 {...expenseStructure} />
          <DashboardCard1 {...expenseStructure} />
          <DashboardCard1 {...expenseStructure} /> */}
          <Box sx={{paddingBottom:'2rem'}}></Box>
        </Box>
  </>;
}

export function DashboardCard(props){
  const {title,filterTitle,filterValue,compareTitle,compareValue} = props;

  var data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
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
                <Typography variant="h6">{title}</Typography>
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
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',height:'10rem',width:'100%'}}>
              Content Box
              <Doughnut data={data}></Doughnut>
            </Box>
            <Box>
              <Button>Show More</Button>
            </Box>
      </Paper>
      </Box>
  </>
}



export function ListRecords(props){

  const navigate = useNavigate();

  const [slide,setSlide] = useState(true);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    getWalletRecords();
    setSlide(true);
      return ()=>{
        setSlide(false)
      }
    },[])

    const [records ,setRecords] = useState([]);

    const getWalletRecords = ()=>{
      setLoading(true);
      fetchRecordList().then(response=>{
        setRecords([...response.data])
        setLoading(false);
      })
    }

    console.log('List Record')
    console.log(records);
    const theme = useTheme();

    const ContainerProps={
        style: {display: 'flex', alignItems: 'center'},
      }
    let range = "This Year";
    let spending = records&&records.length>1&&records.filter(record=>record.price!==null&&record.transactionType!=='Expense').map(map=>map.price).reduce((a,b)=>a+b,0)-records.filter(record=>record.price!==null&&record.transactionType==='Expense').map(map=>map.price).reduce((a,b)=>a+b,0)
    return (
      <React.Fragment>
        {/* <div className={"slide-in"}> */}
        <div className={slide?"slide-in":"slide-out"}>
        <Typography variant="h4" align="center">
          Records
        </Typography>
          <React.Fragment>
           
            <ListSubheader sx={{lineHeight:'1rem'}} >
            <Typography variant="body1">{range}</Typography>
                        <Typography variant="p" fontStyle={"italic"}>Spending : {new Intl.NumberFormat('en-US', {style: 'currency',currency: 'INR',}).format(spending)}</Typography>
              </ListSubheader>
            <List>
            {records.map((record,index) => (
              <Box key={index}>
                <ListItem onClick={()=>navigate('../record/'+record.id)}
                        style={{paddingRight: '10rem',paddingBottom:'2rem'}}
                      >
                    <ListItemAvatar><Avatar alt="Test" sx={{backgroundColor:"#"+Math.floor(Math.random() * 16777215).toString(16)}}>{record.note&&record.note[0]}</Avatar></ListItemAvatar>
                    <ListItemText primary={record.subCategory} secondary={
                      <div style={{display:'flex',flexDirection:"column"}}>
                        <Typography variant="body1">{record.account}</Typography>
                        <Typography variant="p" fontStyle={"italic"}>"{record.note}"</Typography>
                      </div>}>
                    </ListItemText>
                    <ListItemSecondaryAction style={{top:'40%'}}align="right">
                    <Typography sx={{paddingBottom:'0.2rem', color: (theme)=>theme.palette[record.transactionType==='Expense'?'error':'success'].main}} variant="body2" fontWeight={"bold"} >{new Intl.NumberFormat('en-US', {style: 'currency',currency: 'INR',}).format(record.transactionType==='Expense'?-record.price:record.price)}</Typography>
                    <Typography sx={{paddingBottom:'0.2rem'}} variant="body2">{moment(record.dateTime).isValid()&&moment(record.dateTime).format("DD MMM YYYY hh:mm A")}</Typography>
                    {/* <Chip sx={{padding:'0.2rem',fontWeight:'bold'}} variant="outlined" color="success" label="67 Days Overdue"></Chip> */}
                    </ListItemSecondaryAction>
                </ListItem>
                
              </Box>
            ))}
            </List>
          </React.Fragment>
          <LoadingOverlay loading={loading}/>
        </div>
      </React.Fragment>
      
    );
}

export function CreateWalletRecord(props){
  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState({show:false,message:'Default Message'});

  const [suggestions,setSuggestions] = useState([]);
  const [refreshAutoComplete,setRefreshAutoComplete] = useState(false);

  const refreshAuto = ()=>{
    setRefreshAutoComplete(!refreshAutoComplete);
  }
  
    const [slide,setSlide] = useState(true);
    const param = useParams();
    const [pageHeading,setPageHeading] = useState("Create Record");

    useEffect(()=>{
      
      setSlide(true)
        getWalletDetails();
      if(param.id){
       setPageHeading("Edit Record");
       getRecord(param.id);
      }
        return ()=>{
          setSlide(false)
        }
      },[])

      const getRecord = (id)=>{
        setLoading(true);
        fetchRecord(id).then((response=>{
          setRecordObject({...response.data,dateTime:dayjs(response.data.dateTime)});
          refreshAuto();
        })).finally(()=>{
          setTimeout(()=>setLoading(false),500);
        });
      }

      const [walletDetail,setWalletDetail] = useState({});

      const getWalletDetails = ()=>{
        setLoading(true);
        fetchWalletDetails().then(response=>{
          setWalletDetail({...response.data});
          setRecordObjectDefaults(response.data);
        }).finally(()=>{
          setTimeout(()=>setLoading(false),500);
        });
      }

     

      const handleCategoryChange = (event)=>{
        setRecordObject((prev)=>({...prev,[event.target.name]:event.target.value}));
        if(event.target.name==="categoryId"){
          setRecordObject((prev)=>({...prev,subCategoryId:walletDetail.categories.find(cat=>cat.id===event.target.value).subCategory.map(data=>data.id)[0]}));
        }
      }

      const defaultData = {
        price:0.00,
        dateTime:dayjs(new Date()),
        categoryId:0,
        subCategoryId:0,
        typeId:walletDetail.type,
        paymentTypeId:0,
        accountId:walletDetail.account,
        statusId:0,
        labelId:0
      };

      const [recordObject,setRecordObject] = useState(defaultData);

      function getValue(menu){
        return menu?menu.map(data=>data.name):['']
      }

      function getIndexes(menu){
        return menu?menu.map(data=>data.id):[''];
      }

      function getSelected(selectObject,menuObject){
        return selectObject?selectObject:getIndexes(menuObject)[0];
      }

      const setRecordObjectDefaults= (walletDetails)=>{
        recordObject.accountId = walletDetails.accounts[0].id;
        recordObject.categoryId = walletDetails.categories[0].id;
        recordObject.subCategoryId = walletDetails.categories[0].subCategory[0].id;
        recordObject.typeId = walletDetails.transactionTypes[0].id;
        recordObject.paymentTypeId = walletDetails.paymentTypes[0].id;
        recordObject.statusId = walletDetails.status[0].id;
        recordObject.labelId = walletDetails.labels[0].id;
      };

    const selectMenus = [
      {
        type:"select",
        label:"Category",
        name:"categoryId",
        values:getValue(walletDetail.categories),
        indexes:getIndexes(walletDetail.categories),
        selected:getSelected(recordObject.categoryId,walletDetail.categories),
        order:2
      },
      {
        type:"select",
        label:"Sub Category",
        name:"subCategoryId",
        values:walletDetail.categories?getValue(walletDetail.categories.find(cat=>cat.id===getSelected(recordObject.categoryId,walletDetail.categories)).subCategory):[],
        indexes:walletDetail.categories?getIndexes(walletDetail.categories.find(cat=>cat.id===getSelected(recordObject.categoryId,walletDetail.categories)).subCategory):[],
        selected:getSelected(recordObject.subCategoryId,walletDetail.categories?walletDetail.categories.find(cat=>cat.id===getSelected(recordObject.categoryId,walletDetail.categories)).subCategory:''),
        order:3
      },
      {
        type:"select",
        label: "Type",
        name:"typeId",
        values:getValue(walletDetail.transactionTypes),
        indexes:getIndexes(walletDetail.transactionTypes),
        selected:getSelected(recordObject.typeId,walletDetail.transactionTypes),
        order:4
      }
      ,
      {
        type:"select",
        label: "Payment Type",
        name:"paymentTypeId",
        values:getValue(walletDetail.paymentTypes),
        indexes:getIndexes(walletDetail.paymentTypes),
        selected:getSelected(recordObject.paymentTypeId,walletDetail.paymentTypes),
        order:10
      }
      ,
      {
        type:"select",
        label: "Account",
        name:"accountId",
        values:getValue(walletDetail.accounts),
        indexes:getIndexes(walletDetail.accounts),
        selected:getSelected(recordObject.accountId,walletDetail.accounts),
        order:1
      }
      ,
      {
        type:"select",
        label: "Status",
        name:"statusId",
        values:getValue(walletDetail.status),
        indexes:getIndexes(walletDetail.status),
        selected:getSelected(recordObject.statusId,walletDetail.status),
        order:12
      }
      ,
      {
        type:"select",
        label: "Label",
        name:"labelId",
        values:getValue(walletDetail.labels),
        indexes:getIndexes(walletDetail.labels),
        selected:getSelected(recordObject.labelId,walletDetail.labels),
        order:6
      }
    ]

    const handleInputChange = (event)=>{
        setRecordObject((prev)=>({
          ...prev,
          [event.target.name]:event.target.value
        }))
    }

    const inputFields = [
      {
        type:"number",
        label:"Price",
        name:"price",
        value:recordObject.price,
        order:0
      },
      {
        type:"text",
        label:"Note",
        name:"note",
        value:recordObject.note,
        order:-2,
        autoComplete:true
      },
      {
        type:"text",
        label:"Description",
        name:"description",
        value:recordObject.description,
        order:-1,
        autoComplete:true
      },
      {
        type:"number",
        label:"Warranty Period (Months)",
        name:"warranty",
        value:recordObject.warranty,
        order:11
      },
      {
        type:"text",
        label:"Payee",
        name:"payee",
        value:recordObject.payee,
        order:7
      },
      {
        type:"text",
        label:"Place",
        name:"place",
        value:recordObject.place,
        order:13
      },
      {
        type:"time",
        label:"Date & Time",
        name:"dateTime",
        value:recordObject.dateTime,
        order:9
      },
      {
        type:"file",
        label:"Attachment",
        name:"attachment",
        value:recordObject.attachment||'',
        order:14
      }
    ]

    var consolidatedFields = [...inputFields,...selectMenus].sort((a,b)=>a.order-b.order);

    const handleCreateRecord = ()=>{
        var record = {};
        record.id = recordObject.id;
        // Plain input field
        record.price = recordObject.price;
        // Autocompleted Fields
        record.note = recordObject.note;
        record.description = recordObject.description;
        // Category Managed Dropdowns
        // record.category = walletDetail.categories.find(data=>data.id===recordObject.categoryId).name;
        record.categoryId =  recordObject.categoryId;
        // record.subCategory = walletDetail.categories.find(data=>data.id===recordObject.categoryId).subCategory.find(data=>data.id===recordObject.subCategoryId).name;
        record.subCategoryId = recordObject.subCategoryId;
        // Drop Downs
        // record.account = walletDetail.accounts.find(data=>data.id===recordObject.account).name;
        // record.type = walletDetail.transactionTypes.find(data=>data.id===recordObject.type).name;
        // record.paymentType = walletDetail.paymentTypes.find(data=>data.id===recordObject.paymentType).name;
        // record.labels = [walletDetail.labels.find(data=>data.id===recordObject.label).name];
        // record.status = walletDetail.status.find(data=>data.id===recordObject.status).name;
        // record.accountId = walletDetail.accounts.find(data=>data.id===recordObject.accountId).id;
        // record.typeId = walletDetail.transactionTypes.find(data=>data.id===recordObject.typeId).id;
        // record.paymentTypeId = walletDetail.paymentTypes.find(data=>data.id===recordObject.paymentTypeId).id;
        // record.labelId = [walletDetail.labels.find(data=>data.id===recordObject.labelId).id];
        // record.statusId = walletDetail.status.find(data=>data.id===recordObject.statusId).id;
        record.accountId = recordObject.accountId;
        record.typeId = recordObject.typeId;
        record.paymentTypeId = recordObject.paymentTypeId;
        record.labelId = [recordObject.labelId];
        record.statusId = recordObject.statusId;
        // record.type = walletDetail.transactionTypes[recordObject.type].name;
        // record.paymentType = walletDetail.paymentTypes[recordObject.paymentType].name;
        // record.labels = [walletDetail.labels[recordObject.label]].name;
        // record.paymentType = walletDetail.paymentTypes[recordObject.paymentType].name;
        // record.status = walletDetail.status[recordObject.status].name;
        // Plain Input Fields
        record.warranty = recordObject.warranty;
        record.payee = recordObject.payee;
        record.place = recordObject.place;
        record.date = recordObject.date;
        record.time = recordObject.time;
        record.attachment = recordObject.attachment;
        record.dateTime = recordObject.dateTime;
        setLoading(true);
        createRecord(record).then((response)=>{
          setRecordObject(defaultData);
          setMessage(prev=>({...prev,show:true,message:(record.id?"Updated":"Created")+" Record : "+response.data.id}))
        }).catch((err)=>{
          setMessage(prev=>({...prev,show:true,message:"Error Creating Record :"+err.error}))
        }).finally(()=>{
          setLoading(false);
        });
        
    }


    const fetchAutoComplete = (field,text)=>{
        fetchSuggestion(field,text).then((response=>{
          setSuggestions([...response.data]);
        }))
    };

    return (
      <React.Fragment>
        <div className={slide?"slide-in":"slide-out"}>
        <Box sx={{marginBottom:'3rem'}}>
          <Typography variant="h4" sx={{marginBottom:'2rem'}} align="center">
            {pageHeading}
          </Typography>
            {consolidatedFields.filter((filter)=>!filter.disabled).map((field,index)=>
            field.autoComplete?
              <Autocomplete options={suggestions} key={refreshAutoComplete+field.name}
              onChange={(event)=>{handleInputChange(event);fetchAutoComplete(field.name,event.target.value)}}
              sx={{display:'inline-flex', m: 1,width:'95%',maxWidth:'35rem'}}
              disablePortal  freeSolo 
              value={field.value}
              renderInput={(params)=><TextField key={index}
               type={field.type}
             label={field.label}
             value={field.value|| ""}
             sx={{}}
             
             name={field.name} {...params} onChange={(event)=>{handleInputChange(event);fetchAutoComplete(field.name,event.target.value)}}/>}>

              </Autocomplete>
              
              :field.type==="select"?
              <FormControl sx={{ m: 1,width:'95%',maxWidth:'35rem' }} key={field.name}>
                <InputLabel id={field.name}>{field.label}</InputLabel>
                <Select
                  onChange={handleCategoryChange}
                  labelId={field.name}
                    value={field.selected===null?'':field.selected}
                    name={field.name}
                    input={<OutlinedInput id={"select-multiple-chip-"+field.name} label={field.label} />}
                  >
                    {field.values&&field.values.map((data,index)=><MenuItem value={field.indexes?field.indexes[index]:index}>{data}</MenuItem>)}
                </Select>
              </FormControl>
              :field.type=="time"?
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <MobileDateTimePicker sx={{ m: 1,width:'95%',maxWidth:'35rem' }}  name={field.name} label={field.label} onChange={(value)=>{
                    var obj = {};
                    obj.target = {};
                    obj.target.name = field.name;
                    obj.target.value = value;
                    handleInputChange(obj);
                  }} value={field.value}/>
              </LocalizationProvider>
              :<TextField key={index}
               sx={{ m: 1,width:'95%',maxWidth:'35rem'}} type={field.type}
              label={field.label}
              value={field.value|| ""}
              name={field.name} onChange={handleInputChange}/>
            )}
        </Box>
        <Paper elevation={10} sx={{position:'fixed',width:'100%',justifyContent:'center',paddingBottom:'1rem',paddingTop:'0.8rem',columnGap:'15%',zIndex:'1',opacity:'1',bottom:0,display:'flex'}}>
        <Fab color="error" onClick={()=>setRecordObject(defaultData)}>
          <Clear />
        </Fab>
        <Fab  color="success" onClick={handleCreateRecord}>
          <Check />
        </Fab>
        </Paper>
        <LoadingOverlay loading={loading}/>
        <Snackbar sx={{transform: 'translateY(4rem)'}}
          anchorOrigin={{vertical: "top", horizontal: "right"}}
         autoHideDuration={3000} onClose={()=>setMessage((prev)=>({...prev,show:false}))} open={message.show}>
          <SnackbarContent message={message.message}></SnackbarContent>
        </Snackbar>
        <Toolbar/>
        </div>
      </React.Fragment>
    );
}