import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

// You must
// cd API
// dotnet watch
// NEW TERMINAL
// cd client-app
// npm run
// This runs the calls to db and the site respectively.

function App() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    //populate the activities state through the API.
    axios.get('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
      })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities'/>
      <List>
        {activities.map((activitiy: any) => (
          <List.Item key={activitiy.id}>
            {activitiy.title}
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
