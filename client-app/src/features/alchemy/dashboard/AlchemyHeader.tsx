import { observer } from 'mobx-react-lite';
import { Button, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AlchemyRules from './AlchemyRules';
import AlchemyTraitForm from '../form/AlchemyTraitForm';
import AlchemyIngredientForm from '../form/AlchemyIngredientForm';

export default observer(function AlchemyHeader() {
    const { userStore, modalStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0

    return (
        <Segment style={{ backgroundColor: "black" }}>
            <Button
                disabled={!isAdmin}
                onClick={() => modalStore.openModal("Create Alchemy Ingredient", <AlchemyIngredientForm />)}
                size='huge'
                color='green'
                inverted
                // loading={equipmentQualityStore.loading}
                content="Create Ingredient" />
            <Button
                disabled={!isAdmin}
                onClick={() => modalStore.openModal("Create Alchemy Trait", <AlchemyTraitForm />, "large")}
                size='huge'
                color='green'
                inverted
                // loading={equipmentQualityStore.loading}
                content="Create Trait" />
            <Button
                onClick={() => modalStore.openModal('Alchemy Rules', <AlchemyRules />, "fullscreen")}
                size='huge'
                color='yellow'
                inverted
                // loading={equipmentQualityStore.loading}
                content="Alchemy Rules" />
        </Segment>
    )
})