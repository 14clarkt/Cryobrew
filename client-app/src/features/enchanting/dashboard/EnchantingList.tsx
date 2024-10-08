import { observer } from 'mobx-react-lite';
import { Button, Grid, Popup, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import DiffSpan from '../../../app/common/display/DiffSpan';
import EnchUpdateForm from '../form/EnchUpdateForm';
import { Fragment } from 'react';

export default observer(function EnchantingList() {
    const { userStore, modalStore, enchantingStore } = useStore()
    const { enchList, loading, findLearnForgetEnch } = enchantingStore
    const { isAdmin } = userStore

    return (
        <>{enchList.map((ench) => (
            <Fragment key={ench.id}>{(isAdmin || ench.found) && <Segment style={{
                backgroundColor: "#111111",
                color: "white",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: ench.found ? (ench.learned ? "yellow" : "#222222") : "red",
                zIndex: 3
            }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={isAdmin ? '12' : '16'} style={{ color: "cyan", textAlign: 'center' }}>
                            <h1><DiffSpan content={ench.name} /></h1>
                        </Grid.Column>
                        {isAdmin && <Grid.Column width='2'>
                            <Button
                                disabled={!isAdmin}
                                color='yellow'
                                content={ench.found ? (ench.learned ? "Forget" : "Learn") : "Reveal"}
                                fluid inverted
                                loading={loading}
                                onClick={() => findLearnForgetEnch(ench)}
                            />
                        </Grid.Column>}
                        {isAdmin && <Grid.Column width='2'>
                            <Button
                                disabled={!isAdmin}
                                color='teal'
                                content='Edit'
                                fluid inverted
                                loading={loading}
                                onClick={() => modalStore.openModal("Update Enchantment", <EnchUpdateForm ench={ench} />, 'large')}
                            />
                        </Grid.Column>}
                    </Grid.Row>
                </Grid>
                <Grid divided inverted>
                    <Grid.Row style={{
                        textAlign: "center",
                        borderColor: "teal",
                        borderWidth: "3px",
                        borderBottomStyle: "solid",
                        borderTopStyle: "solid"
                    }}>
                        <Grid.Column width='1'>
                            <Popup inverted
                                header="Enchantment Points"
                                content="Adds this many max Points to the equipment this is added to."
                                trigger={<div>
                                    <h3 style={{ color: "cyan" }}>Pts</h3>
                                    <div style={{ fontSize: "1.1em" }}>{ench.points}</div>
                                </div>} />
                        </Grid.Column>

                        <Grid.Column width='3'>
                            <Popup inverted position='top center'
                                header="Applicable Equipment"
                                content="Equipment that this Enchantment can be applied to."
                                trigger={<div>
                                    <h3 style={{ color: "cyan" }}>Applicable Equipment</h3>
                                    <div style={{ fontSize: "1.1em" }}><DiffSpan content={ench.applicableEquipment} /></div>
                                </div>} />
                        </Grid.Column>

                        <Grid.Column width='3'>
                            <Popup inverted position='top center'
                                header="Restriction(s)"
                                content="Restrictions to USE this Enchantment."
                                trigger={<div>
                                    <h3 style={{ color: "cyan" }}>Restriction(s)</h3>
                                    <div style={{ fontSize: "1.1em" }}><DiffSpan content={ench.restrictions} /></div>
                                </div>} />
                        </Grid.Column>

                        <Grid.Column width='2'>
                            <Popup inverted position='top center'
                                header="Range"
                                content="Range of the Effect of this Enchantment."
                                trigger={<div>
                                    <h3 style={{ color: "cyan" }}>Range</h3>
                                    <div style={{ fontSize: "1.1em" }}><DiffSpan content={ench.range} /></div>
                                </div>} />
                        </Grid.Column>

                        <Grid.Column width='3'>
                            <Popup inverted position='top center'
                                header="Duration"
                                content="Duration of the Effect of this Enchantment."
                                trigger={<div>
                                    <h3 style={{ color: "cyan" }}>Duration</h3>
                                    <div style={{ fontSize: "1.1em" }}><DiffSpan content={ench.duration} /></div>
                                </div>} />
                        </Grid.Column>

                        <Grid.Column width='3'>
                            <Popup inverted position='top center'
                                header="Specific Costs"
                                content="Specific items required to be sacrificed for this Enchantment."
                                trigger={<div>
                                    <h3 style={{ color: "cyan" }}>Specific Costs</h3>
                                    <div style={{ fontSize: "1.1em" }}><DiffSpan content={ench.specificCosts} /></div>
                                </div>} />
                        </Grid.Column>

                        <Grid.Column width='1'>
                            <Popup inverted position='top right'
                                header="Total Power"
                                content="Total combined Power from Enchanting Crystals required for this Enchantment."
                                trigger={<div>
                                    <h3 style={{ color: "cyan" }}>Power</h3>
                                    <div style={{ fontSize: "1.1em" }}>{ench.totalPower}</div>
                                </div>} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{
                        textAlign: "center",
                        borderColor: "#222222",
                        borderWidth: "2px",
                        borderBottomStyle: "dashed",
                    }}>
                        <Grid.Column width='7'>
                            <h3><Popup inverted position='top center'
                                header="Effect Cost"
                                content="Resources required to spend to activate this Effect (typically EP; Enchantment Points)."
                                trigger={<div>
                                    <span style={{ color: "cyan" }}>Effect Cost: </span>
                                    <DiffSpan content={ench.effectCost} />
                                </div>} />
                            </h3>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <Popup inverted position='top center'
                                header="Effect"
                                content="Description of this Enchantment's Effect."
                                trigger={<h3 style={{ color: "cyan" }}>Effect</h3>} />
                        </Grid.Column>
                        <Grid.Column width='7'>
                            <h3><Popup inverted position='top center'
                                header="Effect Action"
                                content={'The "Casting Time" to activate this Enchantment' + "'s Effect."}
                                trigger={<div>
                                    <span style={{ color: "cyan" }}>Effect Action: </span>
                                    <DiffSpan content={ench.effectAction} />
                                </div>} />
                            </h3>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ textAlign: "center" }}>
                        <Grid.Column width='16'>
                            <div style={{ fontSize: "1.2em" }}><DiffSpan content={ench.effect} /></div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>}</Fragment>))}
        </>
    )
})