import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Button, Grid, Input } from "semantic-ui-react"

export default observer(function DiceRoller() {
    const [min, setMin] = useState<string>("")
    const [max, setMax] = useState<string>("")
    const [result, setResult] = useState<string>("0")

    const [diceSet, setDiceSet] = useState<number[]>([0, 0, 0, 0, 0, 0, 0])

    const updateMin = (data: string) => {
        setMin(data)
    }

    const updateMax = (data: string) => {
        setMax(data)
    }

    const rollCustom = () => {
        if (isNumber(min) && isNumber(max) && (Number(min) <= Number(max))) {
            setResult((Math.floor((Number(max) - Number(min) + 1) * Math.random()) + Number(min)).toString())
        } else {
            setResult("N/A")
        }
    }

    const rollDice = () => {
        let total = 0
        for(let i = 0; i < diceSet[0]; i++) total += rollDie(4)
        for(let i = 0; i < diceSet[1]; i++) total += rollDie(6)
        for(let i = 0; i < diceSet[2]; i++) total += rollDie(8)
        for(let i = 0; i < diceSet[3]; i++) total += rollDie(10)
        for(let i = 0; i < diceSet[4]; i++) total += rollDie(12)
        for(let i = 0; i < diceSet[5]; i++) total += rollDie(20)
        for(let i = 0; i < diceSet[6]; i++) total += rollDie(100)
        setResult(total.toString())
    }

    const rollDie = (denomination: number) => {
        return Math.floor(denomination * Math.random()) + 1
    }

    const incrementDie = (index: number, increment: number) => {
        let newDiceSet = []
        for(let i = 0; i < diceSet.length; i++) {
            if(i === index) newDiceSet.push(diceSet[i] + increment)
            else newDiceSet.push(diceSet[i])
            if(newDiceSet[i] < 0) newDiceSet[i] = 0
        }
        setDiceSet(newDiceSet)
    }

    const isNumber = (value?: string | number): boolean => {
        return ((value != null) &&
            (value !== '') &&
            !isNaN(Number(value.toString())));
    }
    return (
        <Grid inverted divided="vertically">
            <Grid.Row>
                <Grid.Column width={2}>
                    <Button.Group compact>
                        <Button inverted content="-" onClick={() => incrementDie(0, -1)} />
                        <Button inverted content={diceSet[0].toString().concat("d4")} onClick={() => incrementDie(0, 1)}/>
                    </Button.Group>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button.Group compact>
                        <Button inverted content="-" onClick={() => incrementDie(1, -1)}/>
                        <Button inverted content={diceSet[1].toString().concat("d6")} onClick={() => incrementDie(1, 1)}/>
                    </Button.Group>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button.Group compact>
                        <Button inverted content="-" onClick={() => incrementDie(2, -1)}/>
                        <Button inverted content={diceSet[2].toString().concat("d8")} onClick={() => incrementDie(2, 1)}/>
                    </Button.Group>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button.Group compact>
                        <Button inverted content="-" onClick={() => incrementDie(3, -1)}/>
                        <Button inverted content={diceSet[3].toString().concat("d10")} onClick={() => incrementDie(3, 1)}/>
                    </Button.Group>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button.Group compact>
                        <Button inverted content="-" onClick={() => incrementDie(4, -1)}/>
                        <Button inverted content={diceSet[4].toString().concat("d12")} onClick={() => incrementDie(4, 1)}/>
                    </Button.Group>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button.Group compact>
                        <Button inverted content="-" onClick={() => incrementDie(5, -1)}/>
                        <Button inverted content={diceSet[5].toString().concat("d20")} onClick={() => incrementDie(5, 1)}/>
                    </Button.Group>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button.Group compact>
                        <Button inverted content="-" onClick={() => incrementDie(6, -1)}/>
                        <Button inverted content={diceSet[6].toString().concat("d100")} onClick={() => incrementDie(6, 1)}/>
                    </Button.Group>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button
                        compact
                        content="Roll"
                        color="green"
                        fluid inverted
                        onClick={rollDice}
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={2}>
                    <h1 style={{ color: "white", textAlign: "center" }}>Custom:</h1>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Input onKeyPress={(event: { key: string; preventDefault: () => void }) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }} fluid placeholder="min" style={{ backgroundColor: "#222222", color: "white" }} onChange={(_e, data) => updateMin(data.value)} />
                </Grid.Column>
                <Grid.Column width={3}>
                    <Input onKeyPress={(event: { key: string; preventDefault: () => void }) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }} fluid placeholder="max" style={{ backgroundColor: "#222222", color: "white" }} onChange={(_e, data) => updateMax(data.value)} />
                </Grid.Column>
                <Grid.Column width={2} >
                    <Button
                        content="Roll"
                        color="green"
                        fluid inverted
                        onClick={rollCustom}
                    />
                </Grid.Column>
                <Grid.Column width={6} >
                    <h1 style={{ textAlign: "center", color: "white" }}>{result}</h1>
                </Grid.Column>
            </Grid.Row>
        </Grid >
    )
})