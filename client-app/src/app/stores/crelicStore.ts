import { makeAutoObservable, runInAction } from "mobx"
// import { EquipmentQuality } from "../models/equipmentQuality";
import { v4 as uuid } from "uuid"
import { store } from "./store";
import { Crelic } from "../models/crelic";
import agent from "../api/agent";

export default class CrelicStore {
    crelicRegistry = new Map<string, Crelic>()
    loadingInitial = false
    loading = false
//     crelicFilter = ""

    constructor() {
        makeAutoObservable(this)
    }

    get crelicList() {
        let sortedcrelics = Array.from(this.crelicRegistry.values()).sort((a, b) =>
            a.name.localeCompare(b.name))

        return sortedcrelics//.filter((crelic) => crelic.name.toLowerCase().includes(this.crelicFilter.toLowerCase()))
    }

    loadCrelics = async () => {
        this.setLoadingInitial(true)
        try {
            const apcs = await agent.Crelics.list()
            apcs.forEach(crelic => {
                this.setCrelic(crelic)
            })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    createCrelic = async (crelic: Crelic) => {
        this.loading = true
        crelic.id = uuid()
        try {
            await agent.Crelics.create(crelic)
            runInAction(() => {
                this.setCrelic(crelic)
                this.loading = false
                store.modalStore.closeModal();
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

//     deleteEQ = async (id: string) => {
//         this.loading = true;
//         try {
//             await agent.EquipmentQualities.delete(id)
//             runInAction(() => {
//                 this.eqRegistry.delete(id)
//                 this.loading = false
//             })
//         } catch (error) {
//             console.log(error)
//             runInAction(() => {
//                 this.loading = false
//             })
//         }
//     }

//     updateEQ = async (eq: EquipmentQuality) => {
//         this.loading = true
//         try {
//             await agent.EquipmentQualities.update(eq)
//             runInAction(() => {
//                 this.eqRegistry.set(eq.id, eq)
//                 this.loading = false
//                 store.modalStore.closeModal();
//             })
//         } catch (error) {
//             console.log(error)
//             runInAction(() => {
//                 this.loading = false
//             })            
//         }
//     }

//     findLearnForgetEQ = async (eq: EquipmentQuality) => {
//         this.loading = true
        
//         if(eq.found) {
//             if(eq.learned) {
//                 eq.found = false
//                 eq.learned = false
//             } else eq.learned = true
//         } else eq.found = true

//         try {
//             await agent.EquipmentQualities.update(eq)
//             runInAction(() => {
//                 this.eqRegistry.set(eq.id, eq)
//                 this.loading = false
//                 store.modalStore.closeModal();
//             })
//         } catch (error) {
//             console.log(error)
//             runInAction(() => {
//                 this.loading = false
//             })            
//         }
//     }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }

    private setCrelic = (crelic: Crelic) => {
        this.crelicRegistry.set(crelic.id, crelic)
    }

//     setEQFilter = (query: string) => {
//         this.eqFilter = query
//     }
}