import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ToDoItem from './ToDoItem';
import Stack from '@mui/material/Stack';
import { Box, Button } from '@mui/material';


export default function App() {
  const [toDoList,setToDoList] = React.useState([{checked:false, content:''},
                                                 {checked:false, content:''},
                                                 {checked:false, content:''},
                                                 {checked:false, content:''},
                                                 {checked:false, content:''},
                                                 {checked:false, content:''},
  ])

  const handleCheck = (event, index) =>{
    setToDoList(toDoList.map((item, i)=>{
      return (i == index) ? ({checked:event.target.checked, content:item.content}) : (item)
    }));
  }

  const handleInput = (event, index) =>{
    setToDoList(toDoList.map((item, i)=>{
      return i == index ? ({checked:item.checked, content:event.target.value}) : item
    }));
  }
  return (
    <Container alignItems='center'>
      <Typography variant='h3' component='h1' align='center' paddingTop={3}>
        To Do List
      </Typography>
        <Stack alignItems='center' paddingTop={3} spacing={1}>
          {console.log(toDoList)}
          {
            toDoList.map((item, i) => <ToDoItem index={i} item={item} onCheck={(event,index)=>handleCheck(event,index)} onChange={(event,index)=>handleInput(event,index)}/>)
          }
          <Button onClick={()=>setToDoList([...toDoList,{checked:false, content:''}])}>Add</Button>
        </Stack>
    </Container>
  );
}
