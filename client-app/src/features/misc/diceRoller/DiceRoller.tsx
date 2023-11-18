import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Button, Grid, Input } from "semantic-ui-react"

export default observer(function DiceRoller() {
    const [min, setMin] = useState<string>("")
    const [max, setMax] = useState<string>("")
    const [result, setResult] = useState<string>("0")

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

    return (
        <Grid inverted divided="vertically">
            <Grid.Row>
                <Grid.Column width={8}>
                    <Input onKeyPress={(event: { key: string; preventDefault: () => void }) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }} fluid placeholder="min" style={{ backgroundColor: "#222222", color: "white" }} onChange={(_e, data) => updateMin(data.value)} />
                </Grid.Column>
                <Grid.Column width={8}>
                    <Input onKeyPress={(event: { key: string; preventDefault: () => void }) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }} fluid placeholder="max" style={{ backgroundColor: "#222222", color: "white" }} onChange={(_e, data) => updateMax(data.value)} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={4} />
                <Grid.Column width={8}>
                    <h1 style={{ textAlign: "center", color: "white" }}>{result}</h1>
                </Grid.Column>
                <Grid.Column width={4} />
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={4} />
                <Grid.Column width={8} >
                    <Button
                        content="Roll"
                        color="green"
                        fluid inverted
                        onClick={roll}
                    />
                </Grid.Column>
                <Grid.Column width={4} />
            </Grid.Row>
        </Grid >
    )
})