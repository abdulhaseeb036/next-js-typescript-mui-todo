'use client';
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useGetCurrentUserQuery, useGetDeleteTodoMutation, useGetTodoQuery, usePostTodoMutation } from '@/slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo } from '@/slices/todoSlice.js';
import { useRouter } from 'next/navigation'
import { logout } from '@/slices/authSlice';
import { toast } from 'react-toastify';



const HomePage: React.FC = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos)
  const token = localStorage.getItem('token');
  const { data, isError, isLoading } = useGetCurrentUserQuery(token);
  const [postTodo, { isLoading: lodingTodo, isError: errorAddTodo }] = usePostTodoMutation()
  const { data: todoData, isError: todoError, isLoading: todoLoading } = useGetTodoQuery(data ? data.id : null);
  const [deleteTodo, { isLoading: lodingDeleteTodo, isError: errorDeleteTodo }] = useGetDeleteTodoMutation()


  const [newTodo, setNewTodo] = useState('');

  const handlerAddTodo = async () => {
    if (newTodo.trim() !== '') {
      setNewTodo('');
      const responce = await postTodo({ todo: newTodo.trim(), completed: false, userId: data ? data.id : null })
      dispatch(addTodo({ id: Math.floor(Math.random() * 100), todo: newTodo.trim(), completed: false, userId: data ? data.id : null }))
      toast('Todo added successfully', { type: 'success' })
    }

  };

  const handlerDeleteTodo = async (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    dispatch(removeTodo(index))
    const responce = await deleteTodo(index)
    console.log(responce, "responce from deleteTodo");
    toast('Todo deleted successfully', { type: 'success' }) 

  };

  const handlerLogout = () => {
    dispatch(logout(null))
    route.push(`/login`);
  }


  useEffect(() => {
    if (!isLoading && !data) {
      route.push(`/login`);
    }
  }, [isLoading, data, route]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (

    <Container>
      {data && (
        <>
          <div style={{ alignSelf: 'flex-end', marginBottom: '10px', marginTop: '30px', textAlign: "right" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handlerLogout}
              className='logout-btn'
            >
              Log out
            </Button>
          </div>
          <Typography variant="h2" gutterBottom>
            To-Do App Test
          </Typography>
          <TextField
            variant="outlined"
            label="Add Todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlerAddTodo}
            startIcon={<AddIcon />}
            style={{ marginBottom: '20px' }}
          >
            Add
          </Button>

          <Divider />

          {todos.length === 0 ? (
            <Typography align="center">No todos yet.</Typography>
          ) : (
            <List>
              {todos.map((item: { todo: string, id: number }) => (
                <ListItem key={item.id}>
                  <ListItemText primary={item.todo} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => handlerDeleteTodo(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )

          }

          {
            todoError ? (
              <div>error</div>
            ) : todoLoading ? (
              <div>loading...</div>
            ) : (
              todoData.length === 0 ? (
                <Typography align="center">No todos yet.</Typography>
              ) : (
                <>
                  <Divider />
                  <List style={{ marginBottom: '20px', marginTop: "20px" }}>
                    <h1>This todo is from Api server, Its not changeable, because we do not have server permission. I just fetch it from server.</h1>
                    {todoData.todos.map((item: { todo: string, id: number }, index: React.Key | null | undefined) => (
                      <ListItem key={item.id}>
                        <ListItemText primary={item.todo} />
                        <ListItemSecondaryAction>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </>
              )
            )
          }
        </>
      )}
    </Container >
  );
};

export default HomePage;

