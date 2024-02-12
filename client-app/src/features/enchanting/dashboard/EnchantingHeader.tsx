import { observer } from 'mobx-react-lite';
import { Grid, Segment } from 'semantic-ui-react';

export default observer(function EnchantingHeader() {
    return (
        <Segment style={{ backgroundColor: "black" }}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width='2' />
                    <Grid.Column width='12'>
                        <h1 style={{ color: 'cyan', textAlign: 'center' }}>Enchantments</h1>
                    </Grid.Column>
                    <Grid.Column width='2' />
                </Grid.Row>
            </Grid>
        </Segment>
    )
})