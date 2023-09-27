import { observer } from 'mobx-react-lite';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function AlchemyIngredientList() {
    const { userStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0

    return (
        <>
            <div style={{ color: 'white' }}>ingredients</div>
            <Segment style={{
                backgroundColor: "#111111",
                color: "white",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "#222222",
            }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width='10' style={{ color: "cyan" }}>
                            <h1>Budding Healing Crystal</h1>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='yellow'
                                content='Find'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => findLearnForgetEQ(eq)}
                            />}
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='teal'
                                content='Edit'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => modalStore.openModal("Update Equipment Quality", <EQUpdateForm eq={eq} />, 'large')}
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
                            <div style={{ fontSize: "1.2em" }}>Crystal</div>
                        </Grid.Column>
                        <Grid.Column width='6'>
                            <h3 style={{ color: "cyan" }}>Type(s)</h3>
                            <div style={{ fontSize: "1.2em" }}>Crystal; Gem</div>
                        </Grid.Column>
                        <Grid.Column width='4'>
                            <h3 style={{ color: "cyan" }}>Quantity</h3>
                            <Button inverted icon='left chevron' size='mini'/>
                            <span style={{ fontSize: "1.5em", paddingInline: "10px" }}> 300 </span>
                            <Button inverted icon='right chevron' size='mini'/>
                            <span style={{ paddingInline: "10px" }}><Button inverted icon='save' size='mini'/></span>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid divided inverted>
                    <Grid.Row style={{ textAlign: "center" }}><Grid.Column width='16'><span style={{ color: "cyan" }}><h2>Traits</h2></span></Grid.Column></Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='4' style={{ textAlign: "center", fontSize: "1.2em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Aranjee's Medicinal Mix : </span><span>2</span></Grid.Column>
                        <Grid.Column width='4' style={{ textAlign: "center", fontSize: "1.2em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Poet's Wax : </span><span>2</span></Grid.Column>
                        <Grid.Column width='4' style={{ textAlign: "center", fontSize: "1.2em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Healing : </span><span>2</span></Grid.Column>
                        <Grid.Column width='4' style={{ textAlign: "center", fontSize: "1.2em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Healing : </span><span>2</span></Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Segment style={{
                backgroundColor: "#111111",
                color: "white",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "yellow",
            }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width='10' style={{ color: "cyan" }}>
                            <h1>Budding Healing Crystal</h1>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='yellow'
                                content='Find'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => findLearnForgetEQ(eq)}
                            />}
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='teal'
                                content='Edit'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => modalStore.openModal("Update Equipment Quality", <EQUpdateForm eq={eq} />, 'large')}
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
                            <div style={{ fontSize: "1.2em" }}>Crystal</div>
                        </Grid.Column>
                        <Grid.Column width='6'>
                            <h3 style={{ color: "cyan" }}>Type(s)</h3>
                            <div style={{ fontSize: "1.2em" }}>Crystal; Gem</div>
                        </Grid.Column>
                        <Grid.Column width='4'>
                            <h3 style={{ color: "cyan" }}>Quantity</h3>
                            <Button inverted icon='left chevron' size='mini'/>
                            <span style={{ fontSize: "1.5em" }}> 3 </span>
                            <Button inverted icon='right chevron' size='mini'/>
                            <Button inverted icon='save' size='mini'/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid divided inverted>
                    <Grid.Row style={{ textAlign: "center" }}><Grid.Column width='16'><span style={{ color: "cyan" }}><h2>Traits</h2></span></Grid.Column></Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px"}}><span style={{ color: 'cyan'}}>Aranjee's Medicinal Mix - </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Poet's Wax - </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Healing: </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Healing - </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Healing - </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Healing - </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Healing - </span><span> 2</span></Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Segment style={{
                backgroundColor: "#111111",
                color: "white",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "#222222",
            }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width='10' style={{ color: "cyan" }}>
                            <h1>Budding Healing Crystal</h1>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='yellow'
                                content='Find'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => findLearnForgetEQ(eq)}
                            />}
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='teal'
                                content='Edit'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => modalStore.openModal("Update Equipment Quality", <EQUpdateForm eq={eq} />, 'large')}
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
                            <div style={{ fontSize: "1.2em" }}>Crystal</div>
                        </Grid.Column>
                        <Grid.Column width='6'>
                            <h3 style={{ color: "cyan" }}>Type(s)</h3>
                            <div style={{ fontSize: "1.2em" }}>Crystal; Gem</div>
                        </Grid.Column>
                        <Grid.Column width='4'>
                            <h3 style={{ color: "cyan" }}>Quantity</h3>
                            <Button inverted icon='left chevron' size='mini'/>
                            <span style={{ fontSize: "1.5em" }}> 3 </span>
                            <Button inverted icon='right chevron' size='mini'/>
                            <Button inverted icon='save' size='mini'/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid divided inverted>
                    <Grid.Row style={{ textAlign: "center" }}><Grid.Column width='16'><span style={{ color: "cyan" }}><h2>Traits</h2></span></Grid.Column></Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px"}}><span style={{ color: 'cyan'}}>Aranjee's Medicinal Mix - </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Poet's Wax - </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Healing: </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Healing - </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Healing - </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Healing - </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Healing - </span><span> 2</span></Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Segment style={{
                backgroundColor: "#111111",
                color: "white",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "#222222",
            }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width='10' style={{ color: "cyan" }}>
                            <h1>Budding Healing Crystal</h1>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='yellow'
                                content='Find'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => findLearnForgetEQ(eq)}
                            />}
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='teal'
                                content='Edit'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => modalStore.openModal("Update Equipment Quality", <EQUpdateForm eq={eq} />, 'large')}
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
                            <div style={{ fontSize: "1.2em" }}>Crystal</div>
                        </Grid.Column>
                        <Grid.Column width='6'>
                            <h3 style={{ color: "cyan" }}>Type(s)</h3>
                            <div style={{ fontSize: "1.2em" }}>Crystal; Gem</div>
                        </Grid.Column>
                        <Grid.Column width='4'>
                            <h3 style={{ color: "cyan" }}>Quantity</h3>
                            <Button inverted icon='left chevron' size='mini'/>
                            <span style={{ fontSize: "1.5em" }}> 3 </span>
                            <Button inverted icon='right chevron' size='mini'/>
                            <Button inverted icon='save' size='mini'/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid divided inverted>
                    <Grid.Row style={{ textAlign: "center" }}><Grid.Column width='16'><span style={{ color: "cyan" }}><h2>Traits</h2></span></Grid.Column></Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px"}}><span style={{ color: 'cyan'}}>Aranjee's Medicinal Mix - </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Poet's Wax - </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Healing: </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Healing - </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Healing - </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Healing - </span><span> 2</span></Grid.Column>
                        <Grid.Column width='4' style={{ fontSize: "1.1em", paddingBottom: "10px" }}><span style={{ color: 'cyan'}}>Healing - </span><span> 2</span></Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </>
    )
})