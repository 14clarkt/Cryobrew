import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';

export default observer(function PlayerHeader() {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width='4' />
                <Grid.Column width='8'>
                    <h1 style={{ color: 'cyan', textAlign: 'center' }}>Player Overview</h1>
                </Grid.Column>
                <Grid.Column width='4' />
            </Grid.Row>
        </Grid>
    )
})