import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Button, Grid, Segment } from 'semantic-ui-react';
import DiffSpan from '../../../app/common/display/DiffSpan';
import { useEffect } from 'react';
import { AidenUpgrade } from '../../../app/models/aidenUpgrade';
import AuUpdateForm from '../form/AuUpdateForm';

interface Props {
    aidenUpgrade: AidenUpgrade
}

export default observer(function AidenUpgradeItem({ aidenUpgrade }: Props) {
    const { userStore, modalStore, aidenUpgradeStore } = useStore()
    const { loading, updateAidenUpgrade } = aidenUpgradeStore
    const { isAdmin } = userStore
    const username = userStore.user!.username

    useEffect(() => {
    }, [aidenUpgrade])

    return (
        <Segment key={aidenUpgrade.id} style={{
            backgroundColor: "#111111",
            color: "white",
            borderStyle: "solid",
            borderWidth: "2px",
            borderColor: aidenUpgrade.player === username ? "yellow" : "#444444"
        }}>
            <Grid verticalAlign='middle' divided inverted>
                <Grid.Row>
                    <Grid.Column width='3' style={{ color: "cyan" }}>
                        <h1><DiffSpan content={aidenUpgrade.name}/></h1>
                    </Grid.Column>
                    <Grid.Column width='2' style={{ color: "cyan" }}>
                        <h1><DiffSpan content={aidenUpgrade.cost + " \\pCE"}/></h1>
                    </Grid.Column>
                    <Grid.Column width={isAdmin ? '7' : '8'}>
                        <h3><DiffSpan content={aidenUpgrade.description} /></h3>
                    </Grid.Column>
                    <Grid.Column width="1" style={{ color: "cyan" }}>
                        <h2><span>{aidenUpgrade.currentLevel} / {aidenUpgrade.maxLevel}</span></h2>
                    </Grid.Column>
                    <Grid.Column width={'2'}>
                        {!aidenUpgrade.player || (aidenUpgrade.player === username) ? <Button
                            disabled={!!aidenUpgrade.player && aidenUpgrade.player !== username}
                            color='yellow'
                            content={aidenUpgrade.player !== username ? 'Equip' : 'Doff'}
                            fluid inverted
                            loading={loading}
                            onClick={() => {
                                (aidenUpgrade.player === username) ?
                                    updateAidenUpgrade({ ...aidenUpgrade, player: null }) :
                                    updateAidenUpgrade({ ...aidenUpgrade, player: username })
                            }}
                        /> : <h2 style={{ color: 'yellow', whiteSpace: "nowrap", overflow: "hidden" }}>{aidenUpgrade.player}</h2>}
                    </Grid.Column>
                    {isAdmin && <Grid.Column width='1'>
                        {isAdmin && <Button
                            disabled={!isAdmin}
                            color='teal'
                            content='Edit'
                            fluid inverted
                            loading={loading}
                            onClick={() => { modalStore.openModal("Update Aiden Upgrade", <AuUpdateForm aidenUpgrade={aidenUpgrade} />, 'large') }}
                        />}
                    </Grid.Column>}
                </Grid.Row>
            </Grid>
        </Segment>
    )
})