import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import APCList from './APCList';

export default observer(function APCDashboard() {
    const { apcStore } = useStore()
    const {loadApcs, apcRegistry, loadingInitial} = apcStore

    useEffect(() => {
        if (apcRegistry.size <= 1) loadApcs();
    }, [loadApcs, apcRegistry.size])

    if (loadingInitial) return <div style={{padding:'400px', position:'relative'}}><LoadingComponent content='Loading APCs...' /></div>

    return (
        <APCList />
    )
})