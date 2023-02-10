import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const ToDoItem = (props) => {
	const {item, checkBoxOnChange, textFieldOnChange, textFieldOnBlur, buttonOnClick, index} = props;
	return(
		<Box noValidate width='80%' display='flex' alignItems='center' justifyContent='center' color={item.checked?'grey':'black'} >
			<Checkbox checked={item.checked} onChange={(event)=>checkBoxOnChange(event,index)}/> 
			<TextField id="standard-basic" label="To Do" variant="standard" 
				sx ={{width:'90%', paddingBottom:2, textDecoration:item.checked ? 'line-through':'undefined', input:{color: item.checked?'grey':'black'}}} 
				value={item.content} onChange={(event)=>textFieldOnChange(event,index)} onBlur={()=>textFieldOnBlur(index)}/>
			<IconButton onClick={()=>buttonOnClick(index)} ><DeleteIcon/></IconButton>
		</Box>
	);
};

export default ToDoItem;