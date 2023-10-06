import { observer } from 'mobx-react-lite';
import { Button, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AlchemyRules from './AlchemyRules';
import AlchemyIngredientForm from '../form/AlchemyIngredientForm';

export default observer(function AlchemyIngredientHeader() {
    const { userStore, modalStore, alchemyStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    const { loading } = alchemyStore

    return (
        <Segment style={{ backgroundColor: "black" }}>
            <Button
                disabled={!isAdmin}
                onClick={() => modalStore.openModal("Create Alchemy Ingredient", <AlchemyIngredientForm />)}
                size='huge'
                color='green'
                inverted
                loading={loading}
                content="Create Ingredient" />
            <Button
                onClick={() => modalStore.openModal('Alchemy Rules', <AlchemyRules />, "fullscreen")}
                size='huge'
                color='yellow'
                inverted
                content="Alchemy Rules" />
        </Segment>
    )
})