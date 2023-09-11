import { observer } from 'mobx-react-lite';
import EquipmentQualityList from './EquipmentQualityList';
import { Grid } from 'semantic-ui-react';
import EquipmentQualityTools from './EquipmentQualityTools';

export default observer(function EquipmentQualityDashboard() {
    return (
        <Grid>
            <Grid.Column width='10'>
                <EquipmentQualityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <EquipmentQualityTools />
            </Grid.Column>
        </Grid>
    )
})