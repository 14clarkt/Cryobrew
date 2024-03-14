import { observer } from 'mobx-react-lite';
import { SyntheticEvent } from 'react';
import { DropdownProps, Grid } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

export default observer(function SokobanHeader() {
    const { sokobanStore } = useStore()
    const { levelOptions, setCurrentLevel } = sokobanStore
    
    const handleChange = (_e: SyntheticEvent, data: DropdownProps) => {
        setCurrentLevel(data.value?.toString()!);
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width='2' >
                    <Dropdown
                        onChange={handleChange}
                        placeholder='Select Level'
                        fluid
                        selection
                        options={levelOptions}
                    />
                </Grid.Column>
                <Grid.Column width='12'>
                    <h1 style={{ color: 'cyan', textAlign: 'center' }}>Sokoban</h1>
                </Grid.Column>
                <Grid.Column width='2' />
            </Grid.Row>
        </Grid>
    )
})