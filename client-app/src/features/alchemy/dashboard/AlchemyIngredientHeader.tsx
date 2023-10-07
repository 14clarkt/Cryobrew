import { observer } from 'mobx-react-lite';
import { Button, Grid, Search, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AlchemyRules from './AlchemyRules';
import AlchemyIngredientForm from '../form/AlchemyIngredientForm';

export default observer(function AlchemyIngredientHeader() {
    const { userStore, modalStore, alchemyStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    const { loading, setIngredientFilter } = alchemyStore

    return (
        <Segment style={{ backgroundColor: "black" }}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width='4'>
                        <Button
                            disabled={!isAdmin}
                            onClick={() => modalStore.openModal("Create Alchemy Ingredient", <AlchemyIngredientForm />)}
                            size='large'
                            color='green'
                            inverted fluid
                            loading={loading}
                            content="Create Ingredient" />
                    </Grid.Column>
                    <Grid.Column width='4'>
                        <Button
                            onClick={() => modalStore.openModal('Alchemy Rules', <AlchemyRules />, "fullscreen")}
                            size='large'
                            color='yellow'
                            inverted fluid
                            content="Alchemy Rules" />
                    </Grid.Column>
                    <Grid.Column width='4'>
                        <Search
                            onSearchChange={(_e, data) => { data.value ? setIngredientFilter(data.value) : setIngredientFilter("") }}
                            open={false}
                            placeholder='Search Ingredients'
                        />
                    </Grid.Column>
                    <Grid.Column width='4'>
                    
                    </Grid.Column>
                </Grid.Row>
            </Grid>


        </Segment>
    )
})