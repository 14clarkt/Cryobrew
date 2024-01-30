import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import ActionPointCardStore from "./actionPointCardStore";
import EquipmentQualityStore from "./equipmentQualityStore";
import AlchemyStore from "./alchemyStore";
import SuppliesStore from "./suppliesStore";
import RulesStore from "./rulesStore";
import EnchantingStore from "./enchantingStore";

interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    apcStore: ActionPointCardStore;
    equipmentQualityStore: EquipmentQualityStore;
    alchemyStore: AlchemyStore;
    enchantingStore: EnchantingStore;
    suppliesStore: SuppliesStore;
    rulesStore: RulesStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    apcStore: new ActionPointCardStore(),
    equipmentQualityStore: new EquipmentQualityStore(),
    alchemyStore: new AlchemyStore(),
    enchantingStore: new EnchantingStore(),
    suppliesStore: new SuppliesStore(),
    rulesStore: new RulesStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}