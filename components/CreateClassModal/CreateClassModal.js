import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  DialogTitle,
  Dialog,
  DialogContent,
  Stack
  } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MainButton from '../basecomponents/MainButton.js'
import styles from '../../utils/styles/CreateClassModalStyles/CreateClassModalStyles.module.css';


export default function CreateClassModal ()  {
  const [subject, setSubject] = useState('');
  const [type, setType] = useState('');
  const [newStartTime, setNewStartTime] = useState(null);
  const [newEndTime, setNewEndTime] = useState(null);
  const [classObj, setClassObj] = useState({});
  const [open, setOpen] = useState(false);



  const handleChange = (e) => {
    setClassObj({ ...classObj, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <MainButton value="Create a Class" onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className={styles.formHeader}>Create a Class</DialogTitle>
      <DialogContent>
      <FormControl component="fieldset" required className={styles.classForm}>
            <TextField
              required
              name="name"
              // margin="dense"
              label="New Course Name"
              type="text"
              fullWidth
              // variant="standard"
              color='primary'
              // focused

              onChange={handleChange}
              placeholder="E.g (Calculus II, Economics 101)"
            />
            <TextField
              className={styles.classForm}
              multiline
              rows={4}
              name="description"
              margin="dense"
              label="Course Description"
              type="text"
              // fullWidth
              // variant="standard"
              color='primary'
              // focused
              onChange={handleChange}
              placeholder="Describe your course"
            />

            <FormControl className={styles.subjectSelector}>
            <InputLabel>Select a Subject</InputLabel>
            <Select
              label="Select a Subject"
              defaultValue="Select a subject"
              value={subject}
              name="subject"
              onChange={(e) => {
                handleChange(e);
                setSubject(e.target.value);
              }}
              >
              <MenuItem value="Math">Math</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="History">History</MenuItem>
              <MenuItem value="Literature">Literature</MenuItem>
              <MenuItem value="Language">Language</MenuItem>
            </Select>
          </FormControl>


        <Stack direction="row" spacing={1} className={styles.stackMargin}>
        <LocalizationProvider dateAdapter={AdapterDateFns} className={styles.dateTimePick}>
          <DateTimePicker
            renderInput={(params) => <TextField {...params} fullWidth />}
            label="New Start Time"
            value={newStartTime}
            name="start_date"
            onChange={(newTimeValue) => {
              setClassObj({ ...classObj, 'startTime': newTimeValue})
              setNewStartTime(newTimeValue)
            }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} fullWidth />}
            label="New End Time"
            name="end_date"
            value={newEndTime}
            onChange={(newTimeValue) => {
              setClassObj({ ...classObj, 'endTime': newTimeValue});
              setNewEndTime(newTimeValue)
            }}
          />
        </LocalizationProvider>
        </Stack>

          <TextField
              className={styles.classForm}
              name="meeting_url"
              margin="dense"
              label="Classroom Link"
              type="text"
              // fullWidth
              // variant="standard"
              color='primary'
              onChange={handleChange}
              placeholder="Please enter your Zoom Meeting Room Link"
            />

          <FormControl className={styles.classForm}>
            <InputLabel>Privacy Type Settings</InputLabel>
            <Select
            label="Privacy Type Settings"
            defaultValue="Privacy"
            value={type}
            name="type"
            margin="dense"
            onChange={(e) => {
              handleChange(e);
              setType(e.target.value);
            }}
            >
              <MenuItem value="Public">Public</MenuItem>
              <MenuItem value="Private">Private</MenuItem>
            </Select>
          </FormControl>

            <TextField
             className={styles.classSizeMargin}
              name="capacity"
              margin="dense"
              label="Class Size"
              type="Number"
              // fullWidth
              // variant="standard"
              color='primary'
              onChange={handleChange}
            />
            <MainButton value="Submit"/>

    </FormControl>
    </DialogContent>
    </Dialog>
   </div>
  )
}
