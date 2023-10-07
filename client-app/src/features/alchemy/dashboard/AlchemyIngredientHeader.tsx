import { observer } from 'mobx-react-lite';
import { Button, Grid, Popup, Search, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AlchemyRules from './AlchemyRules';
import AlchemyIngredientForm from '../form/AlchemyIngredientForm';
import { useState } from 'react';

export default observer(function AlchemyIngredientHeader() {
    const { userStore, modalStore, alchemyStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    const { loading, setIngredientFilter, showZero, toggleShowZero } = alchemyStore

    return (
        <Segment style={{ backgroundColor: "black" }}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width='3'>
                        <Button
                            disabled={!isAdmin}
                            onClick={() => modalStore.openModal("Create Alchemy Ingredient", <AlchemyIngredientForm />)}
                            size='large'
                            color='green'
                            inverted fluid
                            loading={loading}
                            content="Create Ing." />
                    </Grid.Column>
                    <Grid.Column width='3'>
                        <Button
                            onClick={() => modalStore.openModal('Alchemy Rules', <AlchemyRules />, "fullscreen")}
                            size='large'
                            color='yellow'
                            inverted fluid
                            content="Alch. Rules" />
                    </Grid.Column>
                    <Grid.Column width='3'>
                        <Popup inverted style={{ textAlign: 'center'}}
                            content="Hide/Show Ingredients that have a Quantity of 0."
                            position='bottom center'
                            trigger={<Button
                                toggle active={showZero}
                                onClick={toggleShowZero}
                                size='large'
                                color='red'
                                fluid
                                content="Show 0" />} />
                    </Grid.Column>
                    <Grid.Column width='3'>
                        <Search
                            onSearchChange={(_e, data) => { data.value ? setIngredientFilter(data.value) : setIngredientFilter("") }}
                            open={false}
                            placeholder='Search Ingredients'
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
})