import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';

export default observer(function OverviewHeader() {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width='16'>
                    <h1 style={{ color: 'cyan', textAlign: 'center' }}>Player Overview</h1>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
})