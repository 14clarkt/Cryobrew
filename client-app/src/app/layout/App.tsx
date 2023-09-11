import { useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import NavBar from './NavBar';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import ModalContainer from '../common/modals/ModalContainer';

// You must
// cd API
// dotnet watch
// NEW TERMINAL
// cd client-app
// npm run
// This runs the calls to db and the site respectively.

function App() {
  const location = useLocation()
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setApploaded())
    } else {
      commonStore.setApploaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ModalContainer />
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Segment style={{ paddingLeft: '3em', paddingRight: '3em', paddingTop: '5em', backgroundColor: 'black' }}>
            <Outlet />
          </Segment>
        </>
      )}
    </>
  );
}

export default observer(App); // observer is a "higher power function" and allows it to 
                              // observe the changes to the properties in the store.
