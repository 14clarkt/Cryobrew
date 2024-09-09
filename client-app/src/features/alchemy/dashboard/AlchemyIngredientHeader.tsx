import { observer } from 'mobx-react-lite';
import { Button, Grid, Popup, Search, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AlchemyIngredientForm from '../form/AlchemyIngredientForm';
import RulesList from '../../rules/list/RulesList';
import { useEffect, useState } from 'react';

export default observer(function AlchemyIngredientHeader() {
    const { userStore, modalStore, suppliesStore, alchemyStore } = useStore()
    const { suppliesList } = suppliesStore
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    const { loading, setIngredientFilter, showZero, toggleShowZero, filterByName, toggleFilterByName } = alchemyStore

    const [catalyst, setCatalyst] = useState(0)

    useEffect(() => {
        for (let index = 0; index < suppliesList.length; index++) {
            const supply = suppliesList[index];
            if (supply.name.toLowerCase().includes("alchemy catalyst".toLowerCase())) {
                setCatalyst(supply.quantity)
                break
            }
        }
    }, [suppliesList])

    return (
        <>
            <Grid>
                <Grid.Column width={1} />
                <Grid.Column width={4}><h3 style={{ color: 'white', textAlign: 'center' }}>Catalyst: {catalyst}gp</h3></Grid.Column>
                <Grid.Column width={6}><h1 style={{ color: 'white', textAlign: 'center' }}>Ingredients</h1></Grid.Column>
                <Grid.Column width={5} />
            </Grid>
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
                                onClick={() => modalStore.openModal('Alchemy Rules', <RulesList group="alchemy" />, "large")}
                                size='large'
                                color='yellow'
                                inverted fluid
                                content="Alch. Rules" />
                        </Grid.Column>
                        <Grid.Column width='4'>
                            <Search
                                onSearchChange={(_e, data) => { data.value ? setIngredientFilter(data.value) : setIngredientFilter("") }}
                                open={false}
                                placeholder={filterByName ? 'Search Ingredients' : 'Search Ingredient Traits'}
                            />
                        </Grid.Column>
                        <Grid.Column width='3'>
                            <Popup inverted style={{ textAlign: 'center' }}
                                content="Filter by Ingredient Name or their Trait Names."
                                position='bottom center'
                                trigger={<Button
                                    toggle active={filterByName}
                                    onClick={toggleFilterByName}
                                    size='large'
                                    color='red'
                                    fluid
                                    content={filterByName ? "Name" : "Traits"} />} />
                        </Grid.Column>
                        <Grid.Column width='3'>
                            <Popup inverted style={{ textAlign: 'center' }}
                                content="Hide/Show Ingredients that have a Quantity of 0."
                                position='bottom center'
                                trigger={<Button
                                    toggle active={showZero}
                                    onClick={toggleShowZero}
                                    size='large'
                                    color='red'
                                    fluid
                                    content={showZero ? "Hide 0" : "Show 0"} />} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment></>
    )
})