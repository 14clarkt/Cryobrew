import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import ActionPointCardStore from "./actionPointCardStore";
import EquipmentQualityStore from "./equipmentQualityStore";

interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    apcStore: ActionPointCardStore;
    equipmentQualityStore: EquipmentQualityStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    apcStore: new ActionPointCardStore(),
    equipmentQualityStore: new EquipmentQualityStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}