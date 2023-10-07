import { observer } from 'mobx-react-lite';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AlchemyIngredientPotencyForm from '../form/AlchemyIngredientPotencyForm';
import AlchemyIngredientUpdateForm from '../form/AlchemyIngredientUpdateForm';
import AlchemyIngredientPotencyDelete from '../form/AlchemyIngredientPotencyDelete';
import DiffSpan from '../../../app/common/display/DiffSpan';

export default observer(function AlchemyIngredientList() {
    const { userStore, alchemyStore, modalStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    const { hideShowIngredient, deleteAlchemyIngredient, incrementIngredientQuantity, saveIngredientQuantity,
        newQuantityRegistry, ingredientList, ingredientFilter, loading } = alchemyStore

    return (
        <>
            {ingredientList.map((ing) => ((isAdmin || !ing.hidden)
                    && ing.name.toLowerCase().includes(ingredientFilter.toLowerCase())
                    && <Segment key={ing.id} style={{
                backgroundColor: "#111111",
                color: "white",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: ing.hidden ? "red" : "#222222",
            }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width='10' style={{ color: "cyan" }}>
                            <h1><DiffSpan content={ing.name}/></h1>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                color='yellow'
                                content={ing.hidden ? 'Show' : 'Hide'}
                                fluid inverted
                                loading={loading}
                                onClick={() => hideShowIngredient(ing)}
                            />}
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                color='teal'
                                content='Edit'
                                fluid inverted
                                loading={loading}
                                onClick={() => modalStore.openModal("Update Alchemy Ingredient", <AlchemyIngredientUpdateForm ing={ing} />, 'large')}
                            />}
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                color='red'
                                content='Del'
                                fluid inverted
                                loading={loading}
                                onClick={() => deleteAlchemyIngredient(ing.id)}
                            />}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid divided inverted>
                    <Grid.Row style={{ textAlign: "center", borderColor: "teal", borderWidth: "3px", borderBottomStyle: "solid", borderTopStyle: "solid" }}>
                        <Grid.Column width='6'>
                            <h3 style={{ color: "cyan" }}>Biome(s) | Creature(s)</h3>
                            <div style={{ fontSize: "1.2em" }}><DiffSpan content={ing.biomesCreatures}/></div>
                        </Grid.Column>
                        <Grid.Column width='6'>
                            <h3 style={{ color: "cyan" }}>Type(s)</h3>
                            <div style={{ fontSize: "1.2em" }}><DiffSpan content={ing.types}/></div>
                        </Grid.Column>
                        <Grid.Column width='4'>
                            <h3 style={{ color: "cyan" }}>Quantity</h3>
                            <Button inverted icon='left chevron' size='mini' onClick={() => incrementIngredientQuantity(ing.id, false)} />
                            <span style={{ fontSize: "1.5em", paddingInline: "10px" }}> {newQuantityRegistry.get(ing.id)} </span>
                            <Button inverted icon='right chevron' size='mini' onClick={() => incrementIngredientQuantity(ing.id, true)}/>
                            <span style={{ paddingInline: "10px" }}>
                                <Button 
                                    disabled={ing.quantity===newQuantityRegistry.get(ing.id)}
                                    inverted icon='save' size='mini' loading={loading}
                                    onClick={() => saveIngredientQuantity(ing)}
                                />
                            </span>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid divided inverted>
                    <Grid.Row style={{ textAlign: "center" }}>
                        <Grid.Column width='2'><Button
                            disabled={!isAdmin}
                            color='green'
                            content='Add'
                            fluid inverted
                            loading={loading}
                            onClick={() => modalStore.openModal("Add Ingredient Trait Potency", <AlchemyIngredientPotencyForm AIid={ing.id} />)}
                        />
                        </Grid.Column>
                        <Grid.Column width='12'><span style={{ color: "cyan" }}><h2>Traits</h2></span></Grid.Column>
                        <Grid.Column width='2'>
                            <Button
                                disabled={!isAdmin}
                                color="red"
                                content="Del"
                                fluid inverted
                                loading={loading}
                                onClick={() => modalStore.openModal("Delete Ingredient Trait Potencies", <AlchemyIngredientPotencyDelete ing={ing} />)}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        {ing.potencies.map((aip) => (
                            <Grid.Column width='4' key={aip.id}
                                style={{ textAlign: "center", fontSize: "1.2em", paddingBottom: "10px" }}>
                                <span style={{ color: 'cyan' }}><DiffSpan content={aip.traitName}/> : </span>
                                <span>{aip.potency}</span>
                            </Grid.Column>
                        ))}
                    </Grid.Row>
                </Grid>
            </Segment>))}
        </>
    )
})