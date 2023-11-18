import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Button, Grid, Input } from "semantic-ui-react"
import { isNumericLiteral } from "typescript"

export default observer(function DiceRoller() {
    const [min, setMin] = useState<string>("")
    const [max, setMax] = useState<string>("")
    const [result, setResult] = useState<string>("")

    const updateMin = (data: string) => {
        setMin(data)
    }

    const updateMax = (data: string) => {
        setMax(data)
    }

    const roll = () => {
        if (isNumber(min) && isNumber(max) && (Number(min) <= Number(max))) {
            setResult((Math.floor((Number(max) - Number(min) + 1) * Math.random()) + Number(min)).toString())
        } else {
            setResult("N/A")
        }
    }

    const isNumber = (value?: string | number): boolean => {
        return ((value != null) &&
            (value !== '') &&
            !isNaN(Number(value.toString())));
    }

    return (<>
        <Grid>
            <Grid.Row>
                <Grid.Column width={5}>
                    <Input fluid placeholder="min" style={{ backgroundColor: "#222222", color: "white" }} onChange={(_e, data) => updateMin(data.value)} />
                </Grid.Column>
                <Grid.Column width={5}>
                    <Input fluid placeholder="max" style={{ backgroundColor: "#222222", color: "white" }} onChange={(_e, data) => updateMax(data.value)} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <h1 style={{ color: "white" }}>res: {result}</h1>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Button
                    content="Roll"
                    color="green"
                    fluid inverted
                    onClick={roll}
                />
            </Grid.Row>
        </Grid>
    </>)
})