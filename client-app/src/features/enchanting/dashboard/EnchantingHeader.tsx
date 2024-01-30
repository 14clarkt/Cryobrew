import { observer } from 'mobx-react-lite';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import RulesList from '../../rules/apcs/RulesList';

export default observer(function EnchantingHeader() {
    const { modalStore } = useStore()
    // const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    // const {  } = enchantingStore

    return (
        <><h1 style={{ color: 'white', textAlign: 'center' }}>Enchanting</h1>
            <Segment style={{ backgroundColor: "black" }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width='7'/>
                        <Grid.Column width='2'>
                            <Button
                                onClick={() => modalStore.openModal('Enchanting Rules', <RulesList group="enchanting" />, "large")}
                                size='large'
                                color='yellow'
                                inverted fluid
                                content="Enchanting Rules" />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment></>
    )
})