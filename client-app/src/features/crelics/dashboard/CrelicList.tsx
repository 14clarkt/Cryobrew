import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/stores/store"
import CrelicItem from "./CrelicItem"

export default observer(function CrelicList() {
    const { crelicStore, userStore } = useStore()
    const { crelicList } = crelicStore

    return (<>{
        crelicList.map((crelic) => (<>{
            (userStore.isAdmin || !crelic.isHidden) && <CrelicItem key={crelic.id} crelic={crelic} />
        }</>))
    }</>)
})