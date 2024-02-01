import { Add, Check, Create, List as ListIcon, RecentActorsRounded} from "@mui/icons-material";
import { Avatar, Badge, Box, Button, Chip, Container, Divider, Fab, FormControl, Icon, InputLabel, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, ListSubheader, MenuItem, OutlinedInput, Select, SpeedDial, SpeedDialAction,  SpeedDialIcon,  TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { createRecord, fetchRecordList, fetchWalletDetails, getWalletCatergoryList, getWalletPaymentTypes, getWalletTransactionTypes } from "./Service/wallet-data";
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
    let records1 = {
      "First Week":[10, 20, 30,40,50,60],
      "Second Week":[40, 50, 60]
    };
    return (
      <React.Fragment className="slide-parent">
        {/* <div className={"slide-in"}> */}
        <div className={slide?"slide-in":"slide-out"}>
        <Typography variant="h4" align="center">
          Records
        </Typography>
        {Object.entries(records1).map((record, index) => (
          <React.Fragment key={index}>
            { /** Records View Headers */}
           
            <ListSubheader sx={{lineHeight:'1rem'}} >
            <Typography variant="body1">Savings</Typography>
                        <Typography variant="p" fontStyle={"italic"}>"Savi2"</Typography>
              </ListSubheader>
            {/* <Divider textAlign="right">
              <Chip label={record[0]} size="large" />
            </Divider> */}
            { /** Records View Menus */}
            <List>
            {records.map((record,index) => (
              <Box key={index}>
                <ListItem 
                        style={{paddingRight: '1rem',paddingBottom:'2rem'}}
                       
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
            {/* <Divider sx={{borderBottomWidth:'0.2rem'}}textAlign="left" variant="fullWidth"></Divider> */}
          </React.Fragment>
        ))}
        </div>
      </React.Fragment>
      
    );
}

export function CreateWalletRecord(props){
  
    const [slide,setSlide] = useState(true);

    useEffect(()=>{
      setSlide(true)
      getWalletDetails();
        return ()=>{
          setSlide(false)
        }
      },[])

      const [walletDetail,setWalletDetail] = useState({});

      const categoryData = walletDetail.categories||[];

      const [selectedCategory,setSelectedCategory] = useState({
        mainCategory:0,
        subCategory:0,
        type:0,
        paymentType:0,
        account:0,
        status:0,
        label:0
      });


      const getWalletDetails = ()=>{
        fetchWalletDetails().then(response=>{
          setWalletDetail({...response.data});
        });
      }

      const handleCategoryChange = (event)=>{
        setSelectedCategory((prev)=>({...prev,[event.target.name]:event.target.value}));
        if(event.target.name==="mainCategory"){
          setSelectedCategory((prev)=>({...prev,subCategory:0}));
        }
      }

      const [recordObject,setRecordObject] = useState({
        price:0.00,
        date:moment(new Date()).format("YYYY-MM-DD"),
        time:moment(new Date()).format("HH:mm"),
        dateTime:dayjs(new Date())
      });

    const selectMenus = [
      {
        type:"select",
        label:"Category",
        name:"mainCategory",
        values:categoryData.map(data=>data.category),
        selected:selectedCategory.mainCategory,
        order:2
      },
      {
        type:"select",
        label:"Sub Category",
        name:"subCategory",
        values:categoryData[selectedCategory.mainCategory]&&categoryData[selectedCategory.mainCategory||0].subCategories,
        selected:selectedCategory.subCategory,
        order:3
      },
      {
        type:"select",
        label: "Type",
        name:"type",
        values:walletDetail.transactionTypes,
        selected:selectedCategory.type,
        order:4
      }
      ,
      {
        type:"select",
        label: "Payent Type",
        name:"paymentType",
        values:walletDetail.paymentTypes,
        selected:selectedCategory.paymentType,
        order:10
      }
      ,
      {
        type:"select",
        label: "Account",
        name:"account",
        values:walletDetail.accounts,
        selected:selectedCategory.account,
        order:1
      }
      ,
      {
        type:"select",
        label: "Status",
        name:"status",
        values:walletDetail.status,
        selected:selectedCategory.status,
        order:12
      }
      ,
      {
        type:"select",
        label: "Label",
        name:"label",
        values:walletDetail.labels,
        selected:selectedCategory.label,
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
        order:-2
      },
      {
        type:"text",
        label:"Description",
        name:"description",
        value:recordObject.description,
        order:-1
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
        record.account = walletDetail.accounts[selectedCategory.account];
        record.category = categoryData.map(data=>data.category)[selectedCategory.mainCategory];
        record.subCategory = categoryData[selectedCategory.mainCategory].subCategories[selectedCategory.subCategory];
        record.type = walletDetail.transactionTypes[selectedCategory.type];
        record.paymentType = walletDetail.paymentTypes[selectedCategory.paymentType];
        record.labels = [walletDetail.labels[selectedCategory.label]];
        record.paymentType = walletDetail.paymentTypes[selectedCategory.paymentType];
        record.status = walletDetail.status[selectedCategory.status];
        record.warranty = recordObject.warranty;
        record.payee = recordObject.payee;
        record.place = recordObject.place;
        record.date = recordObject.date;
        record.time = recordObject.time;
        record.attachment = recordObject.attachment;
        record.dateTime = recordObject.dateTime;
        console.log(record);
        createRecord(record);
    }
        
    return (
      <React.Fragment>
        <div className={slide?"slide-in":"slide-out"}>
        <Box sx={{marginBottom:'3rem'}}>
          <Typography variant="h4" sx={{marginBottom:'2rem'}} align="center">
            Create Record
          </Typography>
            {consolidatedFields.map((field,index)=>
              field.type==="select"?
              <FormControl sx={{ m: 1,width:'95%',maxWidth:'35rem' }} key={field.name}>
                <InputLabel id={field.name}>{field.label}</InputLabel>
                <Select
                  onChange={handleCategoryChange}
                  labelId={field.name}
                    value={field.selected===null?'':field.selected}
                    name={field.name}
                    input={<OutlinedInput id={"select-multiple-chip-"+field.name} label={field.label} />}
                  >
                    {field.values&&field.values.map((data,index)=><MenuItem value={index}>{data}</MenuItem>)}
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
        <Fab sx={{position:'fixed',right:'1rem',top:'4.5rem'}} color="success" onClick={handleCreateRecord}>
          <Check />
        </Fab>
        </div>
      </React.Fragment>
    );
}