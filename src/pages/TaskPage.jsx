import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  ArrowDownwardOutlined,
  CheckBox,
  DeleteForeverOutlined,
  ExpandMoreOutlined,
  InfoOutlined,
  PlayArrowOutlined,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

function TaskAccordion(props) {
    const { name, tasks, defaultOpen } = props;
    const [open, setOpen] = useState(defaultOpen);
    const [checked, setChecked] = useState(() => {
      let cont = {};
      tasks.forEach((task) => (cont[task.id] = false));
      return cont;
    });
    return (
      <div>
        <Accordion disablePadding disableGutters expanded={open}>
          <AccordionSummary
            disablePadding
            onClick={() => setOpen(!open)}
            id="accordion-summary-1"
            expandIcon={<ExpandMoreOutlined />}
          >
            {name}
          </AccordionSummary>
          {tasks.map((task) => (
            <AccordionDetails disablePadding id="accordion-details-1">
              <ListItem disablePadding>
                <Checkbox
                  name={"checked-" + task.id}
                  onClick={() => {
                    setChecked((prev) => ({
                      ...prev,
                      [task.id]: !prev[task.id],
                    }));
                  }}
                  checked={checked[task.id]}
                />
                <ListItemText
                  onClick={() => {
                    setChecked((prev) => ({
                      ...prev,
                      [task.id]: !prev[task.id],
                    }));
                  }}
                  primary={task.task}
                  secondary={task.description}
                ></ListItemText>
                <ListItemIcon>
                  <IconButton onClick={() => console.log("clicked")}>
                    <InfoOutlined />
                  </IconButton>
                </ListItemIcon>
                <ListItemIcon onClick={() => console.log("clicked")}>
                  <IconButton>
                    <PlayArrowOutlined />
                  </IconButton>
                </ListItemIcon>
                <ListItemIcon onClick={() => console.log("clicked")}>
                  <IconButton>
                    <DeleteForeverOutlined />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            </AccordionDetails>
          ))}
        </Accordion>
      </div>
    );
  }

  TaskAccordion.propTypes = {
    names: PropTypes.string.isRequired,
  };

export default function TaskPage() {
  const tasks1 = [
    { id: "100", task: "Task Name 2", description: "task description" },
    {
      id: "200",
      task: "This is a task with lengthy text which would be enough to span the name to the complete row",
      description: "task description",
    },
    { id: "300", task: "Task Name 2 34", description: "task description" },
  ];

  const states = ["In Progress", "To Do", "Completed"];

 

  return (
    <React.Fragment>
      {states.map((state) => (
        <TaskAccordion
          defaultOpen={false}
          name={state}
          tasks={tasks1}
        ></TaskAccordion>
      ))}
    </React.Fragment>
  );
}
