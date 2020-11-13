import logo from './logo.svg';
import './App.css';
import Form from './Form';
import React,{useEffect, useState} from 'react';
import axios from 'axios';
import * as yup from 'yup';
import schema from './Schema';
import User from './User';

const initialFormValues = {
  name:'',
  email:'',
  Password:'',
  Role:'',
  TermsOfService:false,
  

}

const initialFormErrors = {
  name:'',
  email:'',
  Password:'',
  Role:'',
  TermsOfService:''
}

const initialUsers = [];
const initialDisabled = true;


function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues); 
  const [formErrors, setFormErrors] = useState(initialFormErrors); 
  const [disabled, setDisabled] = useState(initialDisabled); 

  const getUsers = () => {
    axios
    .get('https://reqres.in/api/users')
    .then((res)=>{
      console.log(res.data.data);
      setUsers(res.data.data);
    })
    .catch((err)=>{
      console.log(err);
      debugger;
    });

  }

  const postNewUser = (newUser) => {
    axios
    .post('https://reqres.in/api/users',newUser)
    .then((res)=>{
      setUsers([res.data,...users]);
      setFormValues(initialFormValues);
    })
    .catch((err)=>{
      console.log(err);
      debugger;
    })

  }

  const inputChange = (name,value)=>{
    yup
      .reach(schema, name) 
      .validate(value) 
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value, 
    });

  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      Password: formValues.Password.trim(),
      TermsOfService: formValues.TermsOfService,
    };

    postNewUser(newUser);
  };


  useEffect(()=>{
    getUsers();
  },[]);

  useEffect(()=>{
    schema.isValid(formValues).then((valid)=>{
      setDisabled(!valid);
    });
  },[formValues]);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

    {users.map((user)=> {
      return <User key={user.id} details={user}/>;
    })}
  

    </div>
    
  );
}

export default App;
