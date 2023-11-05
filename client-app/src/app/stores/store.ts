import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import ActionPointCardStore from "./actionPointCardStore";
import EquipmentQualityStore from "./equipmentQualityStore";
import AlchemyStore from "./alchemyStore";
import SuppliesStore from "./suppliesStore";

interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    apcStore: ActionPointCardStore;
    equipmentQualityStore: EquipmentQualityStore;
    alchemyStore: AlchemyStore;
    suppliesStore: SuppliesStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    apcStore: new ActionPointCardStore(),
    equipmentQualityStore: new EquipmentQualityStore(),
    alchemyStore: new AlchemyStore(),
    suppliesStore: new SuppliesStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}