import { observer } from 'mobx-react-lite';
import { Button, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import EquipmentQualityRules from './EquipmentQualityRules';
import EQForm from '../form/EQForm';

export default observer(function EquipmentQualityList() {
    const { userStore, modalStore, equipmentQualityStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0

    return (
        <Segment style={{ backgroundColor: "black" }}>
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
        </Segment>
    )
})