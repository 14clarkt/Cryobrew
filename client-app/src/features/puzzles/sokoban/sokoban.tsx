import SokobanHeader from "./SokobanHeader"
import SokobanGame from "./SokobanGame"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import { useStore } from "../../../app/stores/store"
import { useEffect } from "react"

export default function Sokoban() {
    const { sokobanStore } = useStore()
    const { loadLevels, levelRegistry, loadingInitial } = sokobanStore

    useEffect(() => {
        if (levelRegistry.size < 1) loadLevels();
    }, [loadLevels, levelRegistry.size])

    if (loadingInitial)
        return <div style={{ padding: '400px', position: 'relative' }}><LoadingComponent content='Loading Sokoban*...' /></div>

    return (
        <>
            <SokobanHeader />
            <SokobanGame />
        </>
    )
}