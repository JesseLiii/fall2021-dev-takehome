/**
 * Thank you for applying to Bits of Good. You are free to add/delete/modify any
 * parts of this project. That includes changing the types.ts, creating css files,
 * modifying import statements, using contexts, etc. We do recommend to keep it simple.
 * You will not be judged based on complexity. We also recommend using
 * multiple components instead of coding everything on this file :)
 *
 * Have fun! Please reach out to hello@bitsofgood.org or wkim330@gatech.edu if you
 * have any questions!
 *
 * Bits of Good Engineering Team
 *
 */
// TODO: Start coding from here
import React, { useState } from 'react';

// I'm using material UI library, but I'm familiar with other libraries such as AntDesign
// And Also creating my own UI, using boostrap/flexbox/css
import {
  Grid,
  TextField,
  Button,
  Chip,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Custome Classes For Material UI
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    display: 'inline-block',
  },
  container: {
    background: '#b9def2',
    borderRadius: 5,
    padding: '3vw',
    margin: '3vw',
  },
}));

export default function TodoList() {
  const classes = useStyles();

  // **SECTION for Creation of a single task
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2021-09-01T11:02');

  // Tags Section
  // Tags - Array of Tags
  const [tags, setTags] = useState([]);
  // Tag Text for creating a new tag
  const [tagText, setTagText] = useState('');

  const handleChipDelete = (index) => {
    let newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleChipClick = (tag) => {
    console.info(tag);
  };

  // **Section for storing all To-Do states
  const [tasks, setTasks] = useState([]);

  // Creates a Task
  const createTask = () => {
    if (title === '') {
      alert('title cannot be empty');
      return;
    }
    let testDate = new Date(date);
    if (testDate == 'Invalid Date') {
      alert('date invalid');
      return;
    }
    setTasks([
      ...tasks,
      { date: testDate, title: title, tags: tags, completed: false },
    ]);
    clearForm();
  };

  // Clears Form
  const clearForm = () => {
    setDate('2021-09-01T11:02');
    setTitle('');
    setTags([]);
    setTagText('');
  };

  // Sort Tracking
  const [sortComplete, setSortComplete] = useState(false);
  const [sortDate, setSortDate] = useState(false);

  // Function to manage when To-Do task is checked
  const setComplete = (index) => {
    let task = tasks[index];
    task.completed = !task.completed;
    let tempTasks = [
      ...tasks.slice(0, index),
      task,
      ...tasks.slice(index + 1, tasks.length),
    ];
    setTasks(tempTasks);
  };

  // Functions to manage when the sort by complete checkbox is ticked
  const sortCompletedFunc = () => {
    setSortComplete(!sortComplete);
    if (sortComplete) {
      return;
    }

    let completeTasks = [];
    let incompleteTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].completed) {
        completeTasks.push(tasks[i]);
      } else {
        incompleteTasks.push(tasks[i]);
      }
    }
    setTasks([...incompleteTasks, ...completeTasks]);
  };

  const sortDateFunc = () => {
    setSortDate(!sortDate);
    if (sortDate) {
      return;
    }

    if (!sortComplete) {
      console.log('hey');
      setTasks([...tasks.sort((a, b) => a.date - b.date)]);
    } else {
      let counter = 0;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed === true) {
          break;
        }
        counter++;
      }
      let notCompleted = tasks.slice(0, counter);
      let completed = tasks.slice(counter, tasks.length);
      setTasks([
        ...notCompleted.sort((a, b) => a.date - b.date),
        ...completed.sort((a, b) => a.date - b.date),
      ]);
    }
  };

  // Apologies for making everything in one page.
  // Usually I would seperate them by components, and pass state and state changes as props
  return (
    <div>
      <h3>Todo List!</h3>
      <Grid
        container
        // justifyContent="flex-start"
        alignItems="center"
        spacing={4}
        class={classes.container}
      >
        <Grid item xs={12} style={{ display: 'flex' }}>
          <h3>Title</h3>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              id="datetime-local"
              label="Due Date"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </Grid>
        <Grid item md={6} xs={12} style={{ display: 'flex' }}>
          <h3>Tags</h3>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Tags"
              variant="outlined"
              value={tagText}
              onChange={(e) => {
                setTagText(e.target.value);
              }}
            />
          </form>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setTags([...tags, tagText]);
              setTagText('');
            }}
          >
            Create Tag
          </Button>
        </Grid>
        <Grid item md={7} xs={12} style={{ display: 'flex' }}>
          {tags.map((tag, index) => (
            <Chip
              label={tag}
              onClick={() => handleChipClick(tag)}
              onDelete={() => handleChipDelete(index)}
              color="primary"
            />
          ))}
        </Grid>
        <Grid item xs={12} style={{ display: 'flex' }}>
          <Button
            style={{ marginRight: '5px' }}
            variant="contained"
            color="primary"
            onClick={() => createTask()}
          >
            Create Task
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => clearForm()}
          >
            Clear All
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={4}
        class={classes.container}
      >
        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={sortComplete}
                onChange={() => sortCompletedFunc()}
                name="complete"
                color="primary"
              />
            }
            label="Sort By Completed"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sortDate}
                onChange={() => sortDateFunc()}
                name="date"
                color="primary"
              />
            }
            label="Sort By Date"
          />
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column' }}>
          {tasks.map((task, index) => (
            <Grid
              container
              style={{
                background: '#a7e5dd',
                borderRadius: 5,
                padding: '3vw',
                marginBottom: '1vw',
              }}
            >
              <Grid item xs={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={task.completed}
                      onChange={() => setComplete(index)}
                      name="complete"
                      color="primary"
                    />
                  }
                />
              </Grid>
              <Grid item xs={7}>
                <h2>{task.title}</h2>
              </Grid>
              <Grid item xs={4}>
                <div>{task.date.toISOString()}</div>
              </Grid>
              <Grid item xs={12} style={{ display: 'flex' }}>
                {task.tags.map((tag) => (
                  <Chip label={tag} color="primary" />
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
