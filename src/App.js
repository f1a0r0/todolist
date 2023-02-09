import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ToDoItem from './ToDoItem';
import Stack from '@mui/material/Stack';
import { Box, Button } from '@mui/material';
import axios from 'axios';

const api = axios.create({baseURL:'https://jsonplaceholder.typicode.com/todos'})

export default function App() {
  const [toDoList,setToDoList] = React.useState([{checked:false, content:''},
                                                 {checked:false, content:''},
                                                 {checked:false, content:''},
                                                 {checked:false, content:''},
                                                 {checked:false, content:''},
                                                 {checked:false, content:''},
  ])

  const handleCheckBoxChange = (event, index) =>{
    setToDoList(toDoList.map((item, i)=>{
      return (i == index) ? ({checked:event.target.checked, content:item.content}) : (item)
    }));
  }

  const handleTextFieldChange = (event, index) =>{
    setToDoList(toDoList.map((item, i)=>{
      return i == index ? ({checked:item.checked, content:event.target.value}) : item
    }));
  }

  const handleTextFieldBlur = (event, index) =>{
    // setToDoList(toDoList.map((item, i)=>{
    //   return i == index ? ({checked:item.checked, content:event.target.value}) : item
    // }));
    //console.log('blur detected')
  }

  const randomInt = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const generateRandomToDos = async () => {
    let idSet = new Set();
    for (let i = 0; i < randomInt(3,10);i++){
      idSet.add(randomInt(1,100));
    }
    let randomToDos = [];
    for (const id of idSet){
      await api.get(`./${id}`).then((response)=>{
        randomToDos.push({checked:response.data.completed,content:response.data.title})
      });
    }
    setToDoList(randomToDos);
  }

  return (
    <Container>
      <div>
        <Typography variant='h3' component='h1' align='center' paddingTop={3}>To Do List</Typography>
      </div>
      <div>
        <Button onClick={()=>generateRandomToDos()} sx={{margin:'auto',display:'block'}} >Generate random todos</Button>
      </div>
      

      <Stack alignItems='center' paddingTop={3} spacing={1}>
        {console.log(toDoList)}
        {
          toDoList.map((item, i) => <ToDoItem index={i} item={item} 
          checkBoxOnChange={(event,index)=>handleCheckBoxChange(event,index)} textFieldOnChange={(event,index)=>handleTextFieldChange(event,index)}
          textFieldOnBlur={(event,index)=>handleTextFieldBlur(event,index)}/>)
        }
        <Button onClick={()=>setToDoList([...toDoList,{checked:false, content:''}])}>Add</Button>
      </Stack>
    </Container>
  );
}
