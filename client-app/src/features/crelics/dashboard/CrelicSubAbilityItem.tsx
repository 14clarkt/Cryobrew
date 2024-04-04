import { observer } from "mobx-react-lite"
import { CrelicSubAbility } from "../../../app/models/crelic"
import { Button, Grid } from "semantic-ui-react"
import DiffSpan from "../../../app/common/display/DiffSpan"

interface Props {
    crelicSubAbility: CrelicSubAbility
}

export default observer(function CrelicAbilityItem({ crelicSubAbility }: Props) {
    return (
        <Grid.Row style={{ textAlign: "center" }}>
            <Grid.Column width="1" style={{
                borderRightStyle: "solid",
                borderRightColor: "grey",
                borderRightWidth: "1px"
            }}><h2>{crelicSubAbility.level}</h2></Grid.Column>
            <Grid.Column width="2" style={{
                borderRightStyle: "solid",
                borderRightColor: "grey",
                borderRightWidth: "1px"
            }}><h2><DiffSpan content={crelicSubAbility.name}/></h2></Grid.Column>
            <Grid.Column width="5" style={{
                borderRightStyle: "solid",
                borderRightColor: "grey",
                borderRightWidth: "1px"
            }}><h3><DiffSpan content="The number of chains summoned equal \y1" /></h3></Grid.Column>
            <Grid.Column width="5" style={{
                borderRightStyle: "solid",
                borderRightColor: "grey",
                borderRightWidth: "1px"
            }}>
                <h3 style={{ color: "grey" }}><DiffSpan content="The number of chains summoned equal \y2" /></h3>
            </Grid.Column>
            <Grid.Column width="1" style={{ color: "blueviolet" }}>
                <h3>300 CE</h3>
            </Grid.Column>
            <Grid.Column width="1">
                <Button
                    color='teal'
                    content='Edit'
                    compact inverted
                />
            </Grid.Column>
            <Grid.Column width="1">
                <Button
                    color='green'
                    content='Upgrade'
                    compact inverted
                />
            </Grid.Column>
        </Grid.Row>
    )
})