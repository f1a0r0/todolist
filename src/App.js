import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ToDoItem from './ToDoItem';
import Stack from '@mui/material/Stack';
import { Box, Button } from '@mui/material';
import axios from 'axios';


const api = axios.create({baseURL:'https://jsonplaceholder.typicode.com/todos'})
const TODO_NUM = 200; // the total number of todo in the website

export default function App() {
  const [maxID,setMaxID] = React.useState(TODO_NUM);
  const [toDoList,setToDoList] = React.useState([{id:maxID+1, checked:false, content:''},
                                                 {id:maxID+2, checked:false, content:''},
                                                 {id:maxID+3, checked:false, content:''},
                                                 {id:maxID+4, checked:false, content:''},
                                                 {id:maxID+5, checked:false, content:''},
                                                 {id:maxID+6, checked:false, content:''},
  ])
  

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

  const handleTextFieldBlur = index =>{
    let item = toDoList[index];
    if ( item.id<= TODO_NUM){ 
      api.patch(`./${item.id}`,{id:item.id, completed:item.checked, title:item.content})
      .then(response=>console.log(response)).catch(error=>console.log(error));
    } else{
      api.post('./',{id:item.id, completed:item.checked, title:item.content})
      .then(response=>console.log(response)).catch(error=>console.log(error));
    }  
  }

  const handleButtonClick = index =>{
    //console.log(index);
    api.delete(`./${toDoList[index].id}`).then(response=>console.log(response))
    setToDoList(toDoList.filter((item, i)=>i != index))
  }

  const randomInt = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getRandomToDos = async () => {
    let idSet = new Set();
    for (let i = 0; i < randomInt(3,10);i++){
      idSet.add(randomInt(1,100));
    }
    let promiseList = [];
    for (const id of idSet){
      promiseList.push(api.get(`./${id}`));
      //console.log(response);
    }
    let maxID = 0;
    Promise.all(promiseList).then(responses=>{
      setToDoList((responses.map((response)=>{
        response = response.data;
        maxID = Math.max(maxID, response.id);
        //console.log(maxID)
        return {id:response.id, checked:response.completed, content:response.title};
      })))
      setMaxID((preMaxID)=>Math.max(maxID, preMaxID));
    })
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
          textFieldOnBlur={index=>handleTextFieldBlur(index)} buttonOnClick={index=>handleButtonClick(index)}/>)
        }
        <Button onClick={()=>{
          setToDoList([...toDoList,{id:maxID+1, checked:false, content:''}]);
          setMaxID(preMaxID=>preMaxID+1);
        }}>Add</Button>
      </Stack>
    </Container>
  );
}
