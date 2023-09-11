import { observer } from 'mobx-react-lite';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function EquipmentQualityTools() {
    const { userStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    return (
        <>
            <Segment style={{ backgroundColor: "black", color: "white", padding: "1.5em" }}>
                <h1>Tools</h1>
            </Segment>
            <Segment style={{
                backgroundColor: "#111111",
                color: "white",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "#222222"
            }}>
                <div>
                    <span><h2 style={{ display: "inline-block" }}>Base: Smithing Tools +1</h2></span>
                    <Button
                        floated='right'
                        disabled={!isAdmin}
                        color='teal'
                        content='Change'
                        inverted
                    // loading={loading}
                    // onClick={() => modalStore.openModal(<APCEditForm apc={apc} />)}
                    />
                </div>
            </Segment>
            <Segment style={{
                backgroundColor: "#111111",
                color: "white",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "#222222"
            }}>
                <h2>Upgrades</h2>
                <Grid divided="vertically" inverted>
                    <Grid.Row style={{ borderColor: "teal", borderWidth: "3px", borderBottomStyle: "solid" }}>
                        <Grid.Column width='3'>
                            <h3>Name</h3>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <h3>Type</h3>
                        </Grid.Column>
                        <Grid.Column width='8'>
                            <h3>Effect</h3>
                        </Grid.Column>
                        <Grid.Column width='3'>
                            <h3>Equip</h3>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='3'>
                            <div>Crystal Hammer</div>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <div>Hammer</div>
                        </Grid.Column>
                        <Grid.Column width='8'>
                            <div>Reduces Upgrade Cost by 1gp, to a minimum of 1gp. rgegwq wtfgw gw  wgwergfwe rgw 4et wgwrgtfw w wg weg wrgwtfg qwwg wqefg wefgw rgwergwe wg wrg wgq e gwrgwerg</div>
                        </Grid.Column>
                        <Grid.Column width='3'>
                            <Button
                                color='yellow'
                                content='Equip'
                                inverted fluid
                            // loading={loading}
                            // onClick={() => modalStore.openModal(<APCEditForm apc={apc} />)}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='3'>
                            <div>Crystal Hammer</div>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <div>Hammer</div>
                        </Grid.Column>
                        <Grid.Column width='8'>
                            <div>Reduces Upgrade Cost by 1gp, to a minimum of 1gp. rgegwq wtfgw gw  wgwergfwe rgw 4et wgwrgtfw w wg weg wrgwtfg qwwg wqefg wefgw rgwergwe wg wrg wgq e gwrgwerg</div>
                        </Grid.Column>
                        <Grid.Column width='3'>
                            <Button
                                color='yellow'
                                content='Equip'
                                inverted fluid
                            // loading={loading}
                            // onClick={() => modalStore.openModal(<APCEditForm apc={apc} />)}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </>
    )
})