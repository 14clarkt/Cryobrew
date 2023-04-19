import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

// You must
// cd API
// dotnet watch
// NEW TERMINAL
// cd client-app
// npm run
// This runs the calls to db and the site respectively.

function App() {
  const {activityStore} = useStore()

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard/>
      </Container>
    </>
  );
}

export default observer(App); // observer is a "higher power function" and allows it to 
                              // observe the changes to the properties in the store.
