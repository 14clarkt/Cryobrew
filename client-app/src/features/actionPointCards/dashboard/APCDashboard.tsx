import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import APCList from './APCList';
import ScrollToTop from '../../../app/common/display/ScrollToTop';

export default observer(function APCDashboard() {
    const { apcStore, rulesStore } = useStore()
    const {loadApcs, apcRegistry, loadingInitial} = apcStore
    const {loadRules, ruleRegistry, loadingInitial: loadingRules} = rulesStore

    useEffect(() => {
        if (apcRegistry.size < 1) loadApcs();
        if (ruleRegistry.size < 1) loadRules();
    }, [loadApcs, loadRules, apcRegistry.size, ruleRegistry.size])

    if (loadingInitial) return <div style={{padding:'400px', position:'relative'}}><LoadingComponent content='Loading APCs...' /></div>
    if (loadingRules) return <div style={{padding:'400px', position:'relative'}}><LoadingComponent content='Loading Rules...' /></div>

    return (
        <>
            <APCList />
            <ScrollToTop />
        </>
    )
})