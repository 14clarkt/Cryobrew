import { observer } from 'mobx-react-lite';
import { Grid, Search, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function EnchantingHeader() {
    const { enchantingStore } = useStore()
    const { setEnchFilter } = enchantingStore
    return (
        <Segment style={{ backgroundColor: "black" }}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width='4' />
                    <Grid.Column width='8'>
                        <h1 style={{ color: 'cyan', textAlign: 'center' }}>Enchantments</h1>
                    </Grid.Column>
                    <Grid.Column width='4' >
                        <Search
                            onSearchChange={(_e, data) => { data.value ? setEnchFilter(data.value) : setEnchFilter("") }}
                            open={false}
                            placeholder='Search'
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
})