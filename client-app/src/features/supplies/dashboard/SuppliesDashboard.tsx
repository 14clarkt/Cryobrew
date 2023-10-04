import { observer } from "mobx-react-lite"
import { Button, Container, Grid } from "semantic-ui-react"

export default observer(function SuppliesDashboard() {
    return (
        <>
            <div style={{ color: "white" }}>Supplies Coming Soon</div>
            <Container style={{ color: 'white', textAlign: "center"}}>
                <Grid divided inverted>
                    <Grid.Row><h2 style={{ color: "cyan" }}>Party Supplies</h2></Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='4'>
                            <h3 style={{ color: "cyan" }}>Low Quality Sellables</h3>
                            <Button inverted icon='left chevron' size='mini' />
                            <span style={{ fontSize: "1.5em", paddingInline: "10px" }}> 300gp </span>
                            <Button inverted icon='right chevron' size='mini' />
                            <span style={{ paddingInline: "10px" }}><Button inverted icon='save' size='mini' /></span>
                            <h4>Sell at (Persuasion Check)% value</h4>
                        </Grid.Column>
                        <Grid.Column width='4'>
                            <h3 style={{ color: "cyan" }}>Mid Quality Sellables</h3>
                            <Button inverted icon='left chevron' size='mini' />
                            <span style={{ fontSize: "1.5em", paddingInline: "10px" }}> 300gp </span>
                            <Button inverted icon='right chevron' size='mini' />
                            <span style={{ paddingInline: "10px" }}><Button inverted icon='save' size='mini' /></span>
                            <h4>Sell at (2 * Persuasion Check)% </h4>
                        </Grid.Column>
                        <Grid.Column width='4'>
                            <h3 style={{ color: "cyan" }}>High Quality Sellables</h3>
                            <Button inverted icon='left chevron' size='mini' />
                            <span style={{ fontSize: "1.5em", paddingInline: "10px" }}> 300gp </span>
                            <Button inverted icon='right chevron' size='mini' />
                            <span style={{ paddingInline: "10px" }}><Button inverted icon='save' size='mini' /></span>
                            <h4>Sell at (3 * Persuasion Check)%</h4>
                        </Grid.Column>
                        <Grid.Column width='4'>
                            <h3 style={{ color: "cyan" }}>Top Quality Sellables</h3>
                            <Button inverted icon='left chevron' size='mini' />
                            <span style={{ fontSize: "1.5em", paddingInline: "10px" }}> 300gp </span>
                            <Button inverted icon='right chevron' size='mini' />
                            <span style={{ paddingInline: "10px" }}><Button inverted icon='save' size='mini' /></span>
                            <h4>Sell at (4 * Persuasion Check)%</h4>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width='4'>
                            <h3 style={{ color: "cyan" }}>Alchemy Catalyst</h3>
                            <Button inverted icon='left chevron' size='mini' />
                            <span style={{ fontSize: "1.5em", paddingInline: "10px" }}> 300gp </span>
                            <Button inverted icon='right chevron' size='mini' />
                            <span style={{ paddingInline: "10px" }}><Button inverted icon='save' size='mini' /></span>
                            <h4>Sell at (Persuasion Check)% value</h4>
                        </Grid.Column>
                        <Grid.Column width='4'>
                            <h3 style={{ color: "cyan" }}>Equipment Supplies</h3>
                            <Button inverted icon='left chevron' size='mini' />
                            <span style={{ fontSize: "1.5em", paddingInline: "10px" }}> 300gp </span>
                            <Button inverted icon='right chevron' size='mini' />
                            <span style={{ paddingInline: "10px" }}><Button inverted icon='save' size='mini' /></span>
                        </Grid.Column>
                        <Grid.Column width='4'>
                            <h3 style={{ color: "cyan" }}>Rations</h3>
                            <Button inverted icon='left chevron' size='mini' />
                            <span style={{ fontSize: "1.5em", paddingInline: "10px" }}> 300 rations </span>
                            <Button inverted icon='right chevron' size='mini' />
                            <span style={{ paddingInline: "10px" }}><Button inverted icon='save' size='mini' /></span>
                            <h4>Sell at (3 * Persuasion Check)%</h4>
                        </Grid.Column>
                        <Grid.Column width='4'>
                            <h3 style={{ color: "cyan" }}>Rations</h3>
                            <Button inverted icon='left chevron' size='mini' />
                            <span style={{ fontSize: "1.5em", paddingInline: "10px" }}> 300 rations</span>
                            <Button inverted icon='right chevron' size='mini' />
                            <span style={{ paddingInline: "10px" }}><Button inverted icon='save' size='mini' /></span>
                            <h4>Sell at (4 * Persuasion Check)%</h4>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </>
    )
})