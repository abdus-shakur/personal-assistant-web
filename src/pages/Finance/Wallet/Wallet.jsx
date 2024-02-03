import { Add, Check, Clear, Create, Error, List as ListIcon, RecentActorsRounded} from "@mui/icons-material";
import { Autocomplete, Avatar, Backdrop, Badge, Box, Button, Chip, CircularProgress, Container, Divider, Fab, FormControl, Icon, InputLabel, LinearProgress, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, ListSubheader, MenuItem, OutlinedInput, Paper, Select, Snackbar, SnackbarContent, SpeedDial, SpeedDialAction,  SpeedDialIcon,  TextField, Toolbar, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate, useParams, useRoutes } from "react-router-dom";
import { createRecord, fetchRecord, fetchRecordList, fetchSuggestion, fetchWalletDetails, getWalletCatergoryList, getWalletPaymentTypes, getWalletTransactionTypes } from "./Service/wallet-data";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from "moment";
import dayjs from 'dayjs'
import { DateTimePicker, LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";

export default function Wallet(){

  const [slideIn,setSlideIn] = useState(true);

    const navigate = useNavigate();

    const actions = [
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
        }
    ]
    
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
        >
            {actions.map((action) => (
            <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={()=>{navigate(action.path);setSlideIn(!slideIn)}}
            />
            ))}
        </SpeedDial>
       
    </React.Fragment>
}



export function ListRecords(props){

  const navigate = useNavigate();

  const [slide,setSlide] = useState(true);
  useEffect(()=>{
    getWalletRecords();
    setSlide(true)
      return ()=>{
        setSlide(false)
      }
    },[])

    const [records ,setRecords] = useState([{}]);

    const getWalletRecords = ()=>[
      fetchRecordList().then(response=>{
        setRecords([...response.data])
      })
    ]


    const theme = useTheme();

    const ContainerProps={
        style: {display: 'flex', alignItems: 'center'},
      }
    let range = "This Year";
    let spending = records&&records.length>1&&records.filter(record=>record.price!==null&&record.type!=='Expense').map(map=>map.price).reduce((a,b)=>a+b,0)-records.filter(record=>record.price!==null&&record.type==='Expense').map(map=>map.price).reduce((a,b)=>a+b,0)
    console.log(records&&records.length>1&&records.filter(record=>record.price!==null&&record.type!=='Expense').map(map=>map.price).reduce((prev,value)=>prev+value));
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
                    <ListItemAvatar><Avatar alt="Test">{record.note&&record.note[0]}</Avatar></ListItemAvatar>
                    <ListItemText primary={record.subCategory} secondary={
                      <div style={{display:'flex',flexDirection:"column"}}>
                        <Typography variant="body1">{record.account}</Typography>
                        <Typography variant="p" fontStyle={"italic"}>"{record.note}"</Typography>
                      </div>}>
                    </ListItemText>
                    <ListItemSecondaryAction style={{top:'40%'}}align="right">
                    <Typography sx={{paddingBottom:'0.2rem', color: (theme)=>theme.palette[record.type==='Expense'?'error':'success'].main}} variant="body2" fontWeight={"bold"} >{new Intl.NumberFormat('en-US', {style: 'currency',currency: 'INR',}).format(record.type==='Expense'?-record.price:record.price)}</Typography>
                    <Typography sx={{paddingBottom:'0.2rem'}} variant="body2">{moment(record.dateTime).isValid()&&moment(record.dateTime).format("DD MMM YYYY hh:mm A")}</Typography>
                    {/* <Chip sx={{padding:'0.2rem',fontWeight:'bold'}} variant="outlined" color="success" label="67 Days Overdue"></Chip> */}
                    </ListItemSecondaryAction>
                </ListItem>
                
              </Box>
            ))}
            </List>
          </React.Fragment>
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

    useEffect(()=>{
      
      setSlide(true)
        getWalletDetails();
      if(param.id){
       console.log("Param Id : "+param.id);
       getRecord(param.id);
      }
        return ()=>{
          setSlide(false)
        }
      },[])

      const getRecord = (id)=>{
        setLoading(true);
        fetchRecord(id).then((response=>{
          console.log(response.data);
          setRecordObject({...response.data,dateTime:dayjs(response.data.dateTime)});
          refreshAuto();
        })).finally(()=>{
          setTimeout(()=>setLoading(false),500);
        });
      }

      const [walletDetail,setWalletDetail] = useState({});

      const categoryData = walletDetail.categories||[];

      const getWalletDetails = ()=>{
        setLoading(true);
        fetchWalletDetails().then(response=>{
          setWalletDetail({...response.data});
        }).finally(()=>{
          setTimeout(()=>setLoading(false),500);
        });
      }

      const handleCategoryChange = (event)=>{
        setRecordObject((prev)=>({...prev,[event.target.name]:event.target.value}));
        if(event.target.name==="mainCategory"){
          setRecordObject((prev)=>({...prev,subCategoryId:0}));
        }
      }

      const defaultData = {
        price:0.00,
        dateTime:dayjs(new Date()),
        categoryId:0,
        subCategoryId:0,
        type:0,
        paymentType:0,
        account:0,
        status:0,
        label:0
      };

      const [recordObject,setRecordObject] = useState(defaultData);

    const selectMenus = [
      {
        type:"select",
        label:"Category",
        name:"categoryId",
        values:categoryData.map(data=>data.name),
        indexes:categoryData.map(data=>data.id),
        selected:recordObject.categoryId,
        order:2
      },
      {
        type:"select",
        label:"Sub Category",
        name:"subCategoryId",
        values:categoryData.find(cat=>cat.id===recordObject.categoryId)&&categoryData.find(cat=>cat.id===recordObject.categoryId).subCategory.map(sub=>sub.name),
        indexes:categoryData.find(cat=>cat.id===recordObject.categoryId)&&categoryData.find(cat=>cat.id===recordObject.categoryId).subCategory.map(data=>data.id),
        selected:recordObject.subCategoryId,
        order:3
      },
      {
        type:"select",
        label: "Type",
        name:"type",
        values:walletDetail.transactionTypes,
        selected:recordObject.type,
        order:4
      }
      ,
      {
        type:"select",
        label: "Payent Type",
        name:"paymentType",
        values:walletDetail.paymentTypes,
        selected:recordObject.paymentType,
        order:10
      }
      ,
      {
        type:"select",
        label: "Account",
        name:"account",
        values:walletDetail.accounts,
        selected:recordObject.account,
        order:1
      }
      ,
      {
        type:"select",
        label: "Status",
        name:"status",
        values:walletDetail.status,
        selected:recordObject.status,
        order:12
      }
      ,
      {
        type:"select",
        label: "Label",
        name:"label",
        values:walletDetail.labels,
        selected:recordObject.label,
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
        record.price = recordObject.price;
        record.note = recordObject.note;
        record.description = recordObject.description;
        record.account = walletDetail.accounts[recordObject.account];
        record.category = categoryData.find(data=>data.id===recordObject.categoryId).name;
        record.categoryId =  recordObject.categoryId;
        record.subCategory = categoryData.find(data=>data.id===recordObject.categoryId).subCategory.find(data=>data.id===recordObject.subCategoryId).name;
        record.subCategoryId = recordObject.subCategoryId;
        record.type = walletDetail.transactionTypes[recordObject.type];
        record.paymentType = walletDetail.paymentTypes[recordObject.paymentType];
        record.labels = [walletDetail.labels[recordObject.label]];
        record.paymentType = walletDetail.paymentTypes[recordObject.paymentType];
        record.status = walletDetail.status[recordObject.status];
        record.warranty = recordObject.warranty;
        record.payee = recordObject.payee;
        record.place = recordObject.place;
        record.date = recordObject.date;
        record.time = recordObject.time;
        record.attachment = recordObject.attachment;
        record.dateTime = recordObject.dateTime;
        console.log(record);
        setLoading(true);
        createRecord(record).then((response)=>{
          setRecordObject(defaultData);
          setMessage(prev=>({...prev,show:true,message:"Created Record : "+response.data.id}))
        }).catch((err)=>{
          setMessage(prev=>({...prev,show:true,message:"Error Creating Record :"+err.error}))
        }).finally(()=>{
          setLoading(false);
        });
        
    }

   console.log(recordObject)
   console.log(selectMenus)

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
            Create Record
          </Typography>
            {consolidatedFields.map((field,index)=>
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
        <Backdrop open={loading}> <CircularProgress/></Backdrop>
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