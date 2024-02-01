import React, { useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Close,
    CloseOutlined,
  DeleteForeverOutlined,
  EditNote,
  ExpandMoreOutlined,
  InfoOutlined,
  PlayArrowOutlined,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Modal,
  Popover,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import GetTasks, { createTask, deleteTask ,updateTask as updateTaskToDo} from "./Service/GetData";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { useTheme } from "@mui/material";

const states = { 0: "To Do", 1: "In Progress", 2: "Completed" };
function TaskAccordion(props) {
  const { name, tasks, defaultOpen ,updateTask} = props;
  const [open, setOpen] = useState(defaultOpen);

  const [checked, setChecked] = useState({});
  const [showInfo, setShowInfo] = useState({});
  const [openBackdrop,setOpenBackdrop] = useState(false);
  const [snackMessage,setSnackMessage] = useState("");
  const [snackOpen,setSnackOpen] = useState(false);
  const [popOverAnchor,setPopOverAnchor] = useState(null);
  const [popoverTask,setPopoverTask] = useState(null);
  const [showUpdate,setShowUpdate] = useState(false);
  const [updateTaskInput,setUpdateTaskInput] = useState({});
  const id = Boolean(popOverAnchor) ? 'simple-popover' : undefined;
  
  const theme = useTheme();

  const handleChecked = (task) => () => {
    setChecked((prev) => ({
      ...prev,
      [task.id]: !prev[task.id],
    }));
  };
  const handleShowInfo = (task) => () => {
    setShowInfo((prev) => ({
      ...prev,
      [task.id]: !prev[task.id],
    }));
  };
  const deleteTaskFunction = (task) => () => {
    setOpenBackdrop(true);
    deleteTask(task).then((response)=>{
        updateTask();
        setSnackMessage("Deleted Task Successfully !");
        setSnackOpen(true);
    }).catch((error)=>{
        setSnackMessage("Error Deleting Task : "+error.message);
        setSnackOpen(true);
    }).finally(()=>{
        setOpenBackdrop(false);
    });
  };

  const setPopOverDetails = (event,task)=>{
    setPopoverTask(()=>({...task}));
    setPopOverAnchor(event.currentTarget);
  }

  const updateTaskItem = (task,status)=>{
    task.status = status;
    task.plannedCompletionDate = dayjs(task.plannedCompletionDate).format('YYYY-MM-DD HH:mm:ss');
    setOpenBackdrop(true);
    updateTaskToDo(task).then((response)=>{
        updateTask();
        setPopOverAnchor(null);
        setSnackMessage("Updated Task Successfully !");
        setSnackOpen(true);
    }).catch((error)=>{
        setSnackMessage("Error Updating Task : "+error.message);
        setSnackOpen(true);
    }).finally(()=>{
        setOpenBackdrop(false);
    });
  };

  function getStatusForAccordionType(){
    return Object.keys(states).filter(key=>states[key]===name)[0];
  }
  

  return (
    <div>
      <Accordion expanded={open}>
        <AccordionSummary
          onClick={() => setOpen(!open)}
          id="accordion-summary-1"
          expandIcon={<ExpandMoreOutlined />}
        ><Grid container style={{display:"flex",alignItems:"center"}}>
          <Grid item><Typography style={{paddingRight:"1rem"}} >{name}</Typography></Grid>
          <Grid item>
            <Chip style={{margin:"auto"}} label={tasks.length+" Tasks"} 
            color={getStatusForAccordionType()==="2"?"success":
                   getStatusForAccordionType()==="1"?"info":
                   getStatusForAccordionType()==="0"?"warning":"error"} 
              variant={theme.palette.mode==='dark'?"outlined":"filled"}>
                </Chip></Grid>
          </Grid>
        </AccordionSummary>
        {tasks.map((task) => (
          <AccordionDetails key={task.id} style={{padding:'0',paddingBottom:'0.5rem'}} id={"accordion-details" + task.id}>
            <ListItem disablePadding>
              <Checkbox
                name={"checked-" + task.id}
                onChange={handleChecked(task)}
                checked={checked[task.id] || false}
              />
              <ListItemText style={{fontSize:'0.3rem'}}
                onClick={handleChecked(task)}
                primary={task.task}
                secondary={task.description}
              ></ListItemText>
              <ListItemIcon style={{minWidth:'1rem'}}>
                <IconButton onClick={handleShowInfo(task)}>
                  <InfoOutlined />
                </IconButton>
              </ListItemIcon >
              <ListItemIcon style={{minWidth:'1rem'}}>
                <IconButton onClick={()=>{setUpdateTaskInput(task);setShowUpdate(true);}}>
                  <EditNote />
                </IconButton>
              </ListItemIcon >
              <ListItemIcon style={{minWidth:'1rem'}} onClick={(event)=>setPopOverDetails(event,task)}>
                <IconButton>
                  <PlayArrowOutlined />
                </IconButton>
              </ListItemIcon>
              <ListItemIcon  style={{minWidth:'1rem'}} onClick={deleteTaskFunction(task)}>
                <IconButton>
                  <DeleteForeverOutlined />
                </IconButton>
              </ListItemIcon>
            </ListItem>
            <TaskModal
                key={task.id}
              task={task}
              open={showInfo[task.id] || false}
              setOpen={handleShowInfo}
            ></TaskModal>
              {updateTaskInput===task?<CreateTask title={"Update"} openModal={showUpdate} setOpenModal={setShowUpdate} updateTask={()=>{setShowUpdate(false);updateTask();}} taskInput={{...updateTaskInput,plannedCompletionDate:dayjs(task.plannedCompletionDate).format('YYYY-MM-DD HH:mm:ss')}}></CreateTask>:<div></div>}
          </AccordionDetails>
        ))}
      </Accordion>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={openBackdrop}
        onClick={()=>setOpenBackdrop(false)}
        >
      <CircularProgress color="inherit" />
      </Backdrop>
      <Popover id={id} open={Boolean(popOverAnchor)} anchorEl={popOverAnchor} anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }} onClose={()=>setPopOverAnchor(null)}>
            {Object.entries(states).filter((entry,index)=>null===popoverTask?entry[1]!==name:entry[0]!==popoverTask.status).map((entry,index)=><MenuList key={index}><MenuItem onClick={()=>updateTaskItem(popoverTask,entry[0])}>Mark : {entry[1]}</MenuItem></MenuList>)}
        </Popover>
      <Snackbar color="inherit" onClose={()=>setSnackOpen(false)} autoHideDuration={3000} open={snackOpen} message={snackMessage} action={<div><IconButton onClick={()=>setSnackOpen(false)} size="small" color="inherit"><CloseOutlined font="small" color="inherit"/></IconButton></div>}></Snackbar>
    </div>
  );
}

TaskAccordion.propTypes = {
  name: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
};

function TaskModal(props) {
  const { task, open, setOpen } = props;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "95vw",
    width: "70%",
    minWidth:"50vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const titleCase = (input)=>{
    const result = input.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  };

  const formatDate = (input)=>{
    let output = input;
    if(typeof input === "string" && isNaN(input) 
    && !isNaN(dayjs(input).$D)&& dayjs(input, 'YYYY-MM-DDTHH:mm:ss.SSSZ', false).isValid()){
        output = dayjs(input).format("DD-MM-YYYY HH:mm");
    }
    return output;
  };

  return (
    <Modal open={open} onClose={setOpen(task)} >
      <Box sx={style} >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Task Details
        </Typography>
        {Object.entries(task).map((entry, index) => (
          <React.Fragment key={index}>
            <Grid container width={"100%"}>
              <Grid item xs={5}>
                <Typography
                  id={"modal-task-description-" + entry[0]}
                  sx={{ mt: 2 }} variant="p"
                >
                  {`${titleCase(entry[0])}`}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography id={"modal-task-value-" + entry[0]} sx={{ mt: 2 }} variant="p" >
                  {`${formatDate(task[entry[0]])}`}
                </Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        ))}
      </Box>
    </Modal>
  );
}

function CreateTask(props) {
    const {updateTask,taskInput,title,openModal: updateTaskModalOpen,setOpenModal:setUpdateTaskModalOpen} = props;
    const [createTaskModalOpen,setCreateTaskModalOpen] = useState(updateTaskModalOpen||false);
    const [openSnack,setOpenSnack] = useState(false);
    const [openBackdrop,setOpenBackdrop] = useState(false);
    const fields = {"Task Name":"task","Task Description":"description","Category":"category"};
    const [task,setTask] = useState(()=>({...taskInput}));
    const [snackMessage,setSnackMessage] = useState("Default Message");

    const showCreateTask = (show)=>{
      title!=="Update"?setCreateTaskModalOpen(show):setUpdateTaskModalOpen(show);
    }

    const createTaskFunc = (task,keepOpen)=>{
        setOpenBackdrop(true);
        let creationCall = title!=="Update"?createTask(task):updateTaskToDo(task);
        creationCall.then((response)=>{
            updateTask();
            setSnackMessage("Task Created Successfully. ID : "+response.data.id);
            setOpenSnack(true);
            if(!keepOpen)
            showCreateTask(false);
        }).catch((error)=>{
            setSnackMessage("Error Creating Task : "+error.message);
            setOpenSnack(true);
        }).finally(()=>{
            setOpenBackdrop(false);
        });
    };
    const handleChange = (event,name)=>{
        if(event.target)
            setTask((prev)=>({
                ...prev,
                [event.target.name]:event.target.value
            }))
        else{
            setTask((prev)=>({
                ...prev,
                [name]:event.format('YYYY-MM-DD HH:mm:ss')
            }))
        }
    };

  return <React.Fragment>
    {title!=="Update"?<Fab
        style={{ position: "fixed", right: "1rem", bottom: "1rem" }}
        color="info"
        aria-label="add" 
        onClick={()=>setCreateTaskModalOpen(true)}
      >
        <AddIcon />
      </Fab>:<div></div>}
    <Dialog open={title!=="Update"?createTaskModalOpen:updateTaskModalOpen} onClose={()=>showCreateTask(false)} maxWidth={'lg'} >
        <DialogTitle >
            {title} Task
        </DialogTitle>
        <DialogContent  >
            <Box style={{marginTop:"0.5rem"}}>
                <Grid container direction={"column"} rowGap={3}  maxWidth={'lg'} alignContent={"center"} >
            {Object.entries(fields).map((entry,index)=>
                <Grid item key={index}>
                    <TextField onKeyDown={(event)=>{
                if(event.key==='Enter')
                    createTaskFunc(task,true)
            }}  onChange={handleChange} name={fields[entry[0]]} style={{width:"50%",minWidth:"25rem",maxWidth:"80vw"}} label={entry[0]} value={task[fields[entry[0]]]} variant="outlined" color="primary" ></TextField>
                </Grid>
            )} 
             <Grid item>
                <FormControl>
             <InputLabel id="category-label">Status</InputLabel>
                    <Select name="status" value={task.status} onChange={handleChange} style={{width:"50%",minWidth:"25rem",maxWidth:"80vw"}} label="Status" labelId="category-label" variant="outlined" color="primary" >
                        {Object.entries(states).map((state,index)=><MenuItem key={index} value={state[0]}>{states[state[0]]}</MenuItem>)}
                    </Select>
                    </FormControl>
                </Grid>
            <LocalizationProvider  dateAdapter={AdapterDayjs} >
                <MobileDateTimePicker name="plannedCompletionDate" label="Planned Completion Date" onChange={(value)=>handleChange(value,"plannedCompletionDate")} value={dayjs(task.plannedCompletionDate)}/>
                </LocalizationProvider>
                </Grid>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>showCreateTask(false)}>Cancel</Button>
            <Button onClick={()=>createTaskFunc(task,false)}>{title} Task</Button>
        </DialogActions>
    </Dialog>

    <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={()=>setOpenSnack(false)}
        message={snackMessage}
        action={<React.Fragment>
            <IconButton
              size="small"
              color="inherit"
              onClick={()=>setOpenSnack(false)}
            ><CloseOutlined fontSize="small" />
            </IconButton>
          </React.Fragment>}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={openBackdrop}
        onClick={()=>setOpenBackdrop(false)}
        >y
      <CircularProgress color="inherit" />
      </Backdrop>
  </React.Fragment>;
}

export default function TaskPage() {
  const [tasks, setTasks] = useState([
    { id: "100", task: "Task Name 2", description: "task description" },
    {
      id: "200",
      task: "This is a task with lengthy text which would be enough to span the name to the complete row",
      description: "task description",
    },
    { id: "300", task: "Task Name 2 34", description: "task description" },
  ]);

  const [snackDetails,setSnackDetails] = useState({open:false,message:""})
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    getAllTasks();
  }, []);
  function getAllTasks() {
    setLoading(true);
    GetTasks()
      .then((response)=>{
          setTasks(() => [...response.data])
      }).catch((error)=>{
          setSnackDetails((prev)=>({...prev,open:true,message:"Error getting Tasks : "+error.message}))
      }).finally(()=>{
        setLoading(false);
      });
  }

  const updateTask = ()=>{
    getAllTasks();
  }

  return (
    <React.Fragment>
      {Object.entries(states).map((state, index) => (
        <TaskAccordion
          key={index}
          defaultOpen={false}
          name={states[state[0]]}
          tasks={tasks.filter((task) => task.status === state[0])}
          updateTask={updateTask}
        ></TaskAccordion>
      ))}
      {tasks.filter((task) => task.status !== 2)
          .filter((task) => dayjs(task.plannedCompletionDate).isBefore(dayjs(new Date()))).length>0?
          <TaskAccordion
          defaultOpen={false}
          name={"Past Due"}
          tasks={tasks.filter((task) => task.status !== "2")
            .filter((task) => dayjs(task.plannedCompletionDate).isBefore(dayjs(new Date())))}
          updateTask={updateTask}
        ></TaskAccordion>:<div></div>}
      
      <CreateTask title={"Create"} updateTask={updateTask} taskInput={{task:"",description:"",status:0,category:"",plannedCompletionDate:dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}} ></CreateTask>
      <Snackbar color="inherit" open={snackDetails.open} anchorOrigin={{horizontal:"left",vertical:"bottom"}} message={snackDetails.message} autoHideDuration={3000} action={<div><IconButton color="inherit" onClick={()=>setSnackDetails((prev)=>({...prev,open:!snackDetails.open}))}><Close/></IconButton></div>}></Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.appBar - 1 }}
        open={loading}
        onClick={()=>setLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
