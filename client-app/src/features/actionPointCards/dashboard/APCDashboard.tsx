import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import APCList from './APCList';

export default observer(function APCDashboard() {
    const { apcStore } = useStore()
    const {loadApcs, apcRegistry, loadingInitial} = apcStore

    useEffect(() => {
        if (apcRegistry.size <= 1) loadApcs();
    }, [loadApcs, apcRegistry.size])

    if (loadingInitial) return <LoadingComponent content='Loading APCs...' />

    return (
        <APCList />
    )
})