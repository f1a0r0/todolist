import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { padding } from '@mui/system';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const ToDoItem = (props) => {
	const {item, onCheck, onChange, index} = props;
	return(
		<Box noValidate width='80%' display='flex' alignItems='center' justifyContent='center' color={item.checked?'grey':'black'} >
			<Checkbox checked={item.checked} onChange={(event)=>onCheck(event,index)}/> 
			<TextField id="standard-basic" label="To Do" variant="standard" 
			sx ={{width:'90%', paddingBottom:2, textDecoration:item.checked ? 'line-through':'undefined', input:{color: item.checked?'grey':'black'}}} 
			defaultValue={item.content} onChange={(event)=>onChange(event,index)}/>
		</Box>
	);
};

export default ToDoItem;