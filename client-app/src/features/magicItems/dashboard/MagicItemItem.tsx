import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { MagicItem } from '../../../app/models/magicItem';
import DiffSpan from '../../../app/common/display/DiffSpan';
import MiUpdateForm from '../form/MIUpdateForm';
import { useEffect, useState } from 'react';

interface Props {
    magicItem: MagicItem
}

export default observer(function MagicItemItem({ magicItem }: Props) {
    const { userStore, modalStore, magicItemStore } = useStore()
    const { loading, updateMagicItem } = magicItemStore
    const { isAdmin } = userStore
    const username = userStore.user!.username
    const [charges, setCharges] = useState(0)

    useEffect(() => {
        setCharges(magicItem.charges)
    }, [magicItem])

    return (
        <Segment key={magicItem.id} style={{
            backgroundColor: "#111111",
            color: "white",
            borderStyle: "solid",
            borderWidth: "2px",
            borderColor: magicItem.isHidden ? "red" : "#444444"
        }}>
            <Grid verticalAlign='middle' divided inverted>
                <Grid.Row>
                    <Grid.Column width='3' style={{ color: "cyan" }}>
                        <h1>{magicItem.name}</h1>
                    </Grid.Column>
                    <Grid.Column width={magicItem.maxCharges===0 ? '11' : '9'}>
                        <h3><DiffSpan content={magicItem.description} /></h3>
                    </Grid.Column>
                    {magicItem.maxCharges!==0 && <Grid.Column width="2">
                        <Button inverted compact icon='left chevron' onClick={() => setCharges(charges - 1)} />
                        <span style={{ fontSize: "1.5em" }}> {charges} / {magicItem.maxCharges} </span>
                        <Button inverted compact icon='right chevron' onClick={() => setCharges(charges + 1)} />
                        <Button inverted compact icon='save' disabled={charges === magicItem.charges}
                            onClick={() => {updateMagicItem({...magicItem, charges: charges})}} />
                    </Grid.Column>}
                    <Grid.Column width={isAdmin ? '1' : '2'}>
                        {!magicItem.equippedBy || (magicItem.equippedBy === username) ? <Button
                            disabled={!!magicItem.equippedBy && magicItem.equippedBy !== username}
                            color='yellow'
                            content={magicItem.equippedBy !== username ? 'Equip' : 'Doff'}
                            fluid inverted
                            loading={loading}
                            onClick={() => {
                                (magicItem.equippedBy === username) ?
                                updateMagicItem({...magicItem, equippedBy: null}) :
                                updateMagicItem({...magicItem, equippedBy: username})
                            }}
                        /> : <h2 style={{ color: 'yellow', whiteSpace: "nowrap", overflow: "hidden" }}>{magicItem.equippedBy}</h2>}
                    </Grid.Column>
                    {isAdmin && <Grid.Column width='1'>
                        {isAdmin && <Button
                            disabled={!isAdmin}
                            color='teal'
                            content='Edit'
                            fluid inverted
                            loading={loading}
                            onClick={() => { modalStore.openModal("Update Magic Item", <MiUpdateForm magicItem={magicItem} />, 'large') }}
                        />}
                    </Grid.Column>}
                </Grid.Row>
            </Grid>
        </Segment>
    )
})