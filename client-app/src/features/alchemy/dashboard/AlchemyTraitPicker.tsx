import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/stores/store"
import { Button, Grid, GridColumn, Segment } from "semantic-ui-react"
import { AlchemyTrait } from "../../../app/models/alchemy"
import { useEffect, useState } from "react"
import DiffSpan from "../../../app/common/display/DiffSpan"

export default observer(function AlchemyTraitPicker() {
    const { alchemyStore } = useStore()
    const { traitList } = alchemyStore

    const [randomTrait, setRandomTrait] = useState<AlchemyTrait | undefined>(undefined)
    const [hinderanceList, setHinderanceList] = useState<AlchemyTrait[]>([])
    const [nonHinderanceList, setNonHinderanceList] = useState<AlchemyTrait[]>([])

    useEffect(() => {
        let newHinderanceList: AlchemyTrait[] = []
        let newNonHinderanceList: AlchemyTrait[] = []
        for (let trait of traitList) {
            if (trait.types.includes("Hinderance"))
                newHinderanceList.push(trait)
            else
                newNonHinderanceList.push(trait)
        }
        setHinderanceList(newHinderanceList)
        setNonHinderanceList(newNonHinderanceList)
    }, [traitList])

    const selectTrait = (givenList: AlchemyTrait[]) => {
        if (givenList.length > 0)
            setRandomTrait(givenList[Math.floor((givenList.length) * Math.random())])
        else
            setRandomTrait({name: "None Available.", id: "", triggers: "", types: "", tier: "", hidden: false, potencyRanges: []})
    }

    return (
        <Segment style={{
            backgroundColor: "#111111",
            color: "white",
            borderStyle: "solid",
            borderWidth: "4px",
            borderColor: "#222222",
        }}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={5}>
                        <Button
                            color='teal'
                            content='Random Trait'
                            size="huge"
                            fluid inverted
                            onClick={() => selectTrait(traitList)}
                        />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Button
                            color='teal'
                            content='Random Non-Hinderance'
                            size="huge"
                            fluid inverted
                            onClick={() => selectTrait(nonHinderanceList)}
                        />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Button
                            color='teal'
                            content='Random Hinderance'
                            size="huge"
                            fluid inverted
                            onClick={() => selectTrait(hinderanceList)}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <GridColumn width={16}>
                        {randomTrait && <h1 style={{ textAlign: "center", color: "white" }}><DiffSpan content={randomTrait.name} /></h1>}
                    </GridColumn>
                </Grid.Row>
            </Grid>
        </Segment>
    )
})