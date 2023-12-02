import { observer } from 'mobx-react-lite';
import EquipmentQualityList from './EquipmentQualityList';
import { Grid } from 'semantic-ui-react';
import EquipmentQualityTools from './EquipmentQualityTools';
import EquipmentQualityHead from './EquipmentQualityHead';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default observer(function EquipmentQualityDashboard() {
    const { equipmentQualityStore, rulesStore } = useStore()
    const { loadEQs, eqRegistry, loadingInitial } = equipmentQualityStore
    const { loadRules, ruleRegistry, loadingInitial: loadingRules } = rulesStore

    useEffect(() => {
        if (eqRegistry.size < 1) loadEQs();
        if (ruleRegistry.size < 1) loadRules();
    }, [loadEQs, loadRules, eqRegistry.size, ruleRegistry.size])

    if (loadingInitial) return <div style={{ padding: '400px', position: 'relative' }}><LoadingComponent content='Loading Equipment Qualities...' /></div>
    if (loadingRules) return <div style={{padding:'400px', position:'relative'}}><LoadingComponent content='Loading Rules...' /></div>

    return (
        <Grid>
            <Grid.Column width='10'>
                <EquipmentQualityHead />
                <EquipmentQualityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <div style={{ color: 'white' }}>vvv Example Layout vvv</div>
                <EquipmentQualityTools />
            </Grid.Column>
        </Grid>
    )
})