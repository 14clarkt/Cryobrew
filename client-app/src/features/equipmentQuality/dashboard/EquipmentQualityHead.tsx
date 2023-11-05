import { observer } from 'mobx-react-lite';
import { Button, Grid, Search, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import EquipmentQualityRules from './EquipmentQualityRules';
import EQForm from '../form/EQForm';

export default observer(function EquipmentQualityList() {
    const { userStore, modalStore, equipmentQualityStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    const { setEQFilter } = equipmentQualityStore

    return (
        <Segment style={{ backgroundColor: "black" }}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width='5'>
                        <Button
                            disabled={!isAdmin}
                            onClick={() => modalStore.openModal("Create Equipment Quality", <EQForm />, "large")}
                            size='huge'
                            color='green'
                            inverted
                            loading={equipmentQualityStore.loading}
                            content="Create EQ" />
                        <Button
                            onClick={() => modalStore.openModal('Equipment Quality Rules', <EquipmentQualityRules />, "fullscreen")}
                            size='huge'
                            color='yellow'
                            inverted
                            loading={equipmentQualityStore.loading}
                            content="EQ Rules" />
                    </Grid.Column>
                    <Grid.Column width='11'>
                        <Search
                            onSearchChange={(_e, data) => { data.value ? setEQFilter(data.value) : setEQFilter("") }}
                            open={false}
                            placeholder='Search'
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment >
    )
})