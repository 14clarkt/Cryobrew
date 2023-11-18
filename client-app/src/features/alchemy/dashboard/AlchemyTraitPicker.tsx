import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/stores/store"
import { Button } from "semantic-ui-react"
import { AlchemyTrait } from "../../../app/models/alchemy"
import { useState } from "react"
import DiffSpan from "../../../app/common/display/DiffSpan"

export default observer(function AlchemyTraitPicker() {
    const { userStore, alchemyStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    const { traitList } = alchemyStore

    const [randomTrait, setRandomTrait] = useState<AlchemyTrait | undefined>(undefined)
    const [randomHinderance, setRandomHinderance] = useState<AlchemyTrait | undefined>(undefined)
    const [randomNonHinderance, setRandomNonHinderance] = useState<AlchemyTrait | undefined>(undefined)

    const randomizeTrait = () => {
        const newTrait = traitList[Math.floor(traitList.length * Math.random())]
        setRandomTrait(newTrait)
    }

    const randomizeHinderance = () => {
        let newHinderance: AlchemyTrait | undefined = undefined
        while (!newHinderance?.types.includes("Hinderance")) {
            newHinderance = traitList[Math.floor(traitList.length * Math.random())]
        }
        setRandomHinderance(newHinderance)
    }
    const randomizeNonHinderance = () => {
        let newHinderance: AlchemyTrait | undefined = undefined
        do { newHinderance = traitList[Math.floor(traitList.length * Math.random())] }
        while (newHinderance?.types.includes("Hinderance"))
        setRandomNonHinderance(newHinderance)
    }

    return (
        <>
            <div>
                <Button
                    disabled={!isAdmin}
                    color='teal'
                    content='Random Trait'
                    size="huge"
                    fluid inverted
                    onClick={randomizeTrait}
                />
            </div>
            {randomTrait && <h1 style={{ textAlign: "center", color: "white" }}><DiffSpan content={randomTrait.name} /></h1>}
            
            <div>
                <Button
                    disabled={!isAdmin}
                    color='teal'
                    content='Random Hinderance'
                    size="huge"
                    fluid inverted
                    onClick={randomizeHinderance}
                />
            </div>
            {randomHinderance && <h1 style={{ textAlign: "center", color: "white" }}><DiffSpan content={randomHinderance.name} /></h1>}
            
            <div>
                <Button
                    disabled={!isAdmin}
                    color='teal'
                    content='Random Non-Hinderance'
                    size="huge"
                    fluid inverted
                    onClick={randomizeNonHinderance}
                />
            </div>
            {randomNonHinderance && <h1 style={{ textAlign: "center", color: "white" }}><DiffSpan content={randomNonHinderance.name} /></h1>}
        </>
    )
})