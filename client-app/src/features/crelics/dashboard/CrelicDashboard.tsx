import { observer } from "mobx-react-lite"
import CrelicList from "./CrelicList"
import CrelicHeader from "./CrelicHeader"
import { useStore } from "../../../app/stores/store"
import { useEffect } from "react"
import LoadingComponent from "../../../app/layout/LoadingComponent"

export default observer(function CrelicDashboard() {
    const { crelicStore, rulesStore } = useStore()
    const { loadCrelics, crelicRegistry, loadingInitial } = crelicStore
    const { loadRules, ruleRegistry, loadingInitial: loadingRules } = rulesStore

    useEffect(() => {
        if (crelicRegistry.size < 1) loadCrelics();
        if (ruleRegistry.size < 1) loadRules();
    }, [loadCrelics, loadRules, crelicRegistry.size, ruleRegistry.size])

    if (loadingInitial) return <div style={{ padding: '400px', position: 'relative' }}><LoadingComponent content='Loading Crelics...' /></div>
    if (loadingRules) return <div style={{ padding: '400px', position: 'relative' }}><LoadingComponent content='Loading Rules...' /></div>

    return (
        <>
            <CrelicHeader />
            <CrelicList />
        </>
    )
})