import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/stores/store"
import CrelicItem from "./CrelicItem"

export default observer(function CrelicList() {
    const { crelicStore } = useStore()
    const { crelicList } = crelicStore

    return (<>{
        crelicList.map((crelic) => (
            <CrelicItem key={crelic.id} crelic={crelic} />
        ))
    }</>)
})