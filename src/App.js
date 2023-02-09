import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ToDoItem from './ToDoItem';
import Stack from '@mui/material/Stack';
import { Box, Button } from '@mui/material';
import axios from 'axios';

const api = axios.create({baseURL:'https://jsonplaceholder.typicode.com/todos'})

export default function App() {
  const [toDoList,setToDoList] = React.useState([{id:1, checked:false, content:''},
                                                 {id:2, checked:false, content:''},
                                                 {id:3, checked:false, content:''},
                                                 {id:4, checked:false, content:''},
                                                 {id:5, checked:false, content:''},
                                                 {id:6, checked:false, content:''},
  ])
  const [maxID,setMaxID] = React.useState(toDoList.length);

  const handleCheckBoxChange = (event, index) =>{
    setToDoList(toDoList.map((item, i)=>{
      return (i == index) ? ({id:item.id, checked:event.target.checked, content:item.content}) : (item)
    }));
  }

  const handleTextFieldChange = (event, index) =>{
    setToDoList(toDoList.map((item, i)=>{
      return i == index ? ({id:item.id, checked:item.checked, content:event.target.value}) : item
    }));
  }

  const handleTextFieldBlur = async (event, index) =>{
    let item = toDoList[index];
    if ( item.id<= 200){ // since the mock todo list has only 200 items
      api.patch(`./${item.id}`,{id:item.id, completed:item.checked, title:item.content})
      .then(response=>console.log(response)).catch(error=>console.log(error));
    } else{
      api.post('./',{id:item.id, completed:item.checked, title:item.content})
      .then(response=>console.log(response)).catch(error=>console.log(error));
    }
    
  }

  const randomInt = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getRandomToDos = async () => {
    let idSet = new Set();
    for (let i = 0; i < randomInt(3,10);i++){
      idSet.add(randomInt(1,100));
    }
    let randomToDos = [];
    for (const id of idSet){
      const response = await api.get(`./${id}`).then((response)=>response.data);
      //console.log(response);
      setMaxID(preMaxID=>Math.max(preMaxID,response.id));
      randomToDos.push({id:response.id, checked:response.completed,content:response.title});
    }
    setToDoList(randomToDos);
  }

  return (
    <Container>
      <div>
        <Typography variant='h3' component='h1' align='center' paddingTop={3}>To Do List</Typography>
      </div>
      <div>
        <Button onClick={()=>getRandomToDos()} sx={{margin:'auto',display:'block'}} >Generate random todos</Button>
      </div>
      

      <Stack alignItems='center' paddingTop={3} spacing={1}>
        {console.log(toDoList)}
        {
          toDoList.map((item, i) => <ToDoItem index={i} item={item}
          checkBoxOnChange={(event,index)=>handleCheckBoxChange(event,index)} textFieldOnChange={(event,index)=>handleTextFieldChange(event,index)}
          textFieldOnBlur={(event,index)=>handleTextFieldBlur(event,index)}/>)
        }
        <Button onClick={()=>{
          setToDoList([...toDoList,{id:maxID+1, checked:false, content:''}]);
          setMaxID(preMaxID=>preMaxID+1);
        }}>Add</Button>
      </Stack>
    </Container>
  );
}
