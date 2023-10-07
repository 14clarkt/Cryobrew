import { observer } from 'mobx-react-lite';
import { Button, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AlchemyTraitForm from '../form/AlchemyTraitForm';

export default observer(function AlchemyRightHandHeader() {
    const { userStore, modalStore, alchemyStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    const { loading, rightHandDisplay, setRightHandDisplay } = alchemyStore

    return (
        <Segment style={{ backgroundColor: "black" }}>
            <Button
                disabled={!isAdmin}
                onClick={() => modalStore.openModal("Create Alchemy Trait", <AlchemyTraitForm />, "large")}
                size='huge'
                color='green'
                inverted
                loading={loading}
                content="Create Trait" />
            <Button
                disabled={rightHandDisplay.includes("Traits")}
                onClick={() => setRightHandDisplay("Traits")}
                size='huge'
                color='yellow'
                inverted
                loading={loading}
                content="Traits" />
            <Button
                disabled={rightHandDisplay.includes("Creation")}
                onClick={() => setRightHandDisplay("Creation")}
                size='huge'
                color='yellow'
                inverted
                loading={loading}
                content="Creation" />
            <Button
                disabled={rightHandDisplay.includes("Products")}
                onClick={() => setRightHandDisplay("Products")}
                size='huge'
                color='yellow'
                inverted
                loading={loading}
                content="Products" />
        </Segment>
    )
})