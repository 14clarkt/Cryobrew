import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import MagicItemItem from './MagicItemItem';
import { useEffect, useState } from 'react';
import { MagicItem } from '../../../app/models/magicItem';

export default observer(function MagicItemsList() {
    const { userStore, magicItemStore } = useStore()
    const { magicItemList, miGroup } = magicItemStore
    const { isAdmin } = userStore
    const [ miList, setMIList ] = useState<MagicItem[]>([])

    useEffect(() => {
        if (miGroup === "equipped") {
            setMIList(magicItemList.filter((mi) => mi.equippedBy === userStore.user?.username))
            return
        }
        if (miGroup === "available") {
            setMIList(magicItemList.filter((mi) => mi.equippedBy === null))
            return
        }
        setMIList(magicItemList)
    }, [magicItemList, miGroup])

    return (
        <>{miList.map((mi) => (
            (isAdmin || !mi.isHidden) && <MagicItemItem key={mi.id + "mii"} magicItem={mi} />
        ))}</>
    )
})