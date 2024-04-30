import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import MagicItemItem from './MagicItemItem';

export default observer(function MagicItemsList() {
    const { userStore, magicItemStore } = useStore()
    const { magicItemList } = magicItemStore
    const { isAdmin } = userStore

    return (
        <>{magicItemList.map((mi) => (
            (isAdmin || !mi.isHidden) && <MagicItemItem key={mi.id + "mii"} magicItem={mi} />
        ))}</>
    )
})