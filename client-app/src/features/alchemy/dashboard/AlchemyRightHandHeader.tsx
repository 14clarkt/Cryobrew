import { observer } from 'mobx-react-lite';
import { Button, Grid, Search, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AlchemyTraitForm from '../form/AlchemyTraitForm';

export default observer(function AlchemyRightHandHeader() {
    const { userStore, modalStore, alchemyStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    const { loading, rightHandDisplay, setRightHandDisplay, setTraitFilter } = alchemyStore

    return (
        <Segment style={{ backgroundColor: "black" }}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width='3'>
                        <Button
                            disabled={!isAdmin}
                            onClick={() => modalStore.openModal("Create Alchemy Trait", <AlchemyTraitForm />, "large")}
                            size='large'
                            color='green'
                            inverted fluid
                            loading={loading}
                            content="Create Trait" />
                    </Grid.Column>
                    <Grid.Column width='3'>
                        <Button
                            disabled={rightHandDisplay.includes("Traits")}
                            onClick={() => setRightHandDisplay("Traits")}
                            size='large'
                            color='yellow'
                            inverted fluid
                            loading={loading}
                            content="Traits" />
                    </Grid.Column>
                    <Grid.Column width='3'>
                        <Button
                            disabled={rightHandDisplay.includes("Creation")}
                            onClick={() => setRightHandDisplay("Creation")}
                            size='large'
                            color='yellow'
                            inverted fluid
                            loading={loading}
                            content="Creation" />
                    </Grid.Column>
                    <Grid.Column width='3'>
                        <Button
                            disabled={rightHandDisplay.includes("Products")}
                            onClick={() => setRightHandDisplay("Products")}
                            size='large'
                            color='yellow'
                            inverted fluid
                            loading={loading}
                            content="Products" />
                    </Grid.Column>
                    <Grid.Column width='4'>
                        {rightHandDisplay.includes("Traits") && <Search
                            onSearchChange={(_e, data) => { data.value ? setTraitFilter(data.value) : setTraitFilter("") }}
                            open={false}
                            placeholder='Search Traits'
                        />}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
})