import React, { useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
    CloseOutlined,
  DeleteForeverOutlined,
  Edit,
  EditNote,
  EditNotificationsOutlined,
  ExpandMoreOutlined,
  InfoOutlined,
  Label,
  PlayArrowOutlined,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Backdrop,
  Box,
  Button,
  Checkbox,
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
  SnackbarContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import GetTasks, { createTask, deleteTask ,updateTask as updateTaskToDo} from "../service/Tasks/GetData";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";

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
  const handleChecked = (task) => () => {
    setChecked((prev) => ({
      ...prev,
      [task.id]: !prev[task.id],
    }));
  };
  const handleShowInfo = (task) => () => {
    console.log("CLose SHow info r: " + task.id);
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

  return (
    <div>
      <Accordion expanded={open}>
        <AccordionSummary
          onClick={() => setOpen(!open)}
          id="accordion-summary-1"
          expandIcon={<ExpandMoreOutlined />}
        >
          {name}
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
            {updateTaskInput===task?<CreateTask title={"Update"} openModal={showUpdate} updateTask={()=>{setShowUpdate(false);updateTask();}} taskInput={updateTaskInput}></CreateTask>:<div></div>}
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
            {Object.entries(states).filter((entry,index)=>entry[1]!==name).map((entry,index)=><MenuList key={index}><MenuItem onClick={()=>updateTaskItem(popoverTask,entry[0])}>Mark : {entry[1]}</MenuItem></MenuList>)}
        </Popover>
      <Snackbar color="inherit" onClose={()=>setSnackOpen(false)} autoHideDuration={2000} open={snackOpen} message={snackMessage} action={<div><IconButton onClick={()=>setSnackOpen(false)} size="small" color="inherit"><CloseOutlined font="small" color="inherit"/></IconButton></div>}></Snackbar>
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
    if(typeof input == "string" && isNaN(input) 
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
    const {updateTask,taskInput,title,openModal} = props;
    const [open,setOpen] = useState(openModal||false);
    const [openSnack,setOpenSnack] = useState(false);
    const [openBackdrop,setOpenBackdrop] = useState(false);
    const fields = {"Task Name":"task","Task Description":"description","Category":"category"};
    const [task,setTask] = useState(()=>({...taskInput}));
    const [snackMessage,setSnackMessage] = useState("Default Message");

    const createTaskFunc = (task)=>{
        setOpenBackdrop(true);
        let creationCall = title!=="Update"?createTask(task):updateTaskToDo(task);
        creationCall.then((response)=>{
            updateTask();
            setSnackMessage("Task Created Successfully. ID : "+response.data.id);
            setOpenSnack(true);
            setOpen(false);
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
        onClick={()=>setOpen(true)}
      >
        <AddIcon />
      </Fab>:<div></div>}
    <Dialog open={open} onClose={()=>setOpen(false)} maxWidth={'lg'} >
        <DialogTitle >
            {title} Task
        </DialogTitle>
        <DialogContent  >
            <Box style={{marginTop:"0.5rem"}}>
                <Grid container direction={"column"} rowGap={3}  maxWidth={'lg'} alignContent={"center"} >
            {Object.entries(fields).map((entry,index)=>
                <Grid item key={index}>
                    <TextField onKeyDown={(event)=>{
                if(event.key=='Enter')
                    createTaskFunc(task)
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
            <Button onClick={()=>setOpen(false)}>Cancel</Button>
            <Button onClick={()=>createTaskFunc(task)}>{title} Task</Button>
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
        >
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
  useEffect(() => {
    getAllTasks();
  }, []);
  function getAllTasks() {
    GetTasks()
      .then((response) => setTasks(() => [...response.data]))
      .catch((error) => alert(error));
  }

  const updateTask = ()=>{
    getAllTasks();
  }

  return (
    <React.Fragment>
      {Object.entries(states).map((state, index) => (
        <TaskAccordion
          key={state[0]}
          defaultOpen={false}
          name={states[state[0]]}
          tasks={tasks.filter((task) => task.status === state[0])}
          updateTask={updateTask}
        ></TaskAccordion>
      ))}
      
      <CreateTask title={"Create"} updateTask={updateTask} taskInput={{task:"",description:"",status:"",category:"",plannedCompletionDate:dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}} ></CreateTask>
    </React.Fragment>
  );
}
