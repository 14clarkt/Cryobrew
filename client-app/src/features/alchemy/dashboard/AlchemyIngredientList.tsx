import { observer } from 'mobx-react-lite';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AlchemyIngredientPotencyForm from '../form/AlchemyIngredientPotencyForm';
import AlchemyIngredientUpdateForm from '../form/AlchemyIngredientUpdateForm';

export default observer(function AlchemyIngredientList() {
    const { userStore, alchemyStore, modalStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    const { ingredientList, loading } = alchemyStore

    return (
        <>
            {ingredientList.map((ing) => ((isAdmin || !ing.hidden) && <Segment key={ing.id} style={{
                backgroundColor: "#111111",
                color: "white",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: ing.hidden ? "red" : "#222222",
            }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width='10' style={{ color: "cyan" }}>
                            <h1>{ing.name}</h1>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='yellow'
                                content='Find'
                                fluid inverted
                                loading={loading}
                            // onClick={() => hideShowIngredient(ing)}
                            />}
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='teal'
                                content='Edit'
                                fluid inverted
                                loading={loading}
                                onClick={() => modalStore.openModal("Update Alchemy Ingredient", <AlchemyIngredientUpdateForm ing={ing} />, 'large')}
                            />}
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='red'
                                content='Del'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => deleteEQ(eq.id)}
                            />}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid divided inverted>
                    <Grid.Row style={{ textAlign: "center", borderColor: "teal", borderWidth: "3px", borderBottomStyle: "solid", borderTopStyle: "solid" }}>
                        <Grid.Column width='6'>
                            <h3 style={{ color: "cyan" }}>Biome(s) | Creature(s)</h3>
                            <div style={{ fontSize: "1.2em" }}>{ing.biomesCreatures}</div>
                        </Grid.Column>
                        <Grid.Column width='6'>
                            <h3 style={{ color: "cyan" }}>Type(s)</h3>
                            <div style={{ fontSize: "1.2em" }}>{ing.types}</div>
                        </Grid.Column>
                        <Grid.Column width='4'>
                            <h3 style={{ color: "cyan" }}>Quantity</h3>
                            <Button inverted icon='left chevron' size='mini' />
                            <span style={{ fontSize: "1.5em", paddingInline: "10px" }}> {ing.quantity} </span>
                            <Button inverted icon='right chevron' size='mini' />
                            <span style={{ paddingInline: "10px" }}><Button inverted icon='save' size='mini' /></span>
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
                        <Grid.Column width='2'><Button disabled={!isAdmin} fluid inverted content="Del" color="red" /></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        {ing.potencies.map((tp) => (
                            <Grid.Column width='4'
                                style={{ textAlign: "center", fontSize: "1.2em", paddingBottom: "10px" }}>
                                <span style={{ color: 'cyan' }}>{tp.traitName} : </span>
                                <span>{tp.potency}</span>
                            </Grid.Column>
                        ))}
                    </Grid.Row>
                </Grid>
            </Segment>))}
        </>
    )
})