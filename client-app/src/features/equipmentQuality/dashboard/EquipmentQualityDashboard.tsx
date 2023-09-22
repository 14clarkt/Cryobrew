import { observer } from 'mobx-react-lite';
import EquipmentQualityList from './EquipmentQualityList';
import { Grid } from 'semantic-ui-react';
import EquipmentQualityTools from './EquipmentQualityTools';
import EquipmentQualityHead from './EquipmentQualityHead';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default observer(function EquipmentQualityDashboard() {
    const { equipmentQualityStore } = useStore()
    const {loadEQs, eqRegistry, loadingInitial} = equipmentQualityStore

    useEffect(() => {
        if (eqRegistry.size <= 1) loadEQs();
    }, [loadEQs, eqRegistry.size])

    if (loadingInitial) return <div style={{padding:'400px', position:'relative'}}><LoadingComponent content='Loading Equipment Qualities...' /></div>

    return (
        <><div style={{ color: 'white' }}>Example Layout</div>
        <Grid>
            <Grid.Column width='10'>
                <EquipmentQualityHead/>
                <EquipmentQualityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <EquipmentQualityTools />
            </Grid.Column>
        </Grid></>
    )
})