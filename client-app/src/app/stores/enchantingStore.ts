import { makeAutoObservable } from "mobx"
// import { v4 as uuid } from "uuid"
// import { store } from "./store";
// import agent from "../api/agent";

export default class EnchantingStore {
    // eqRegistry = new Map<string, EquipmentQuality>()
    // loadingInitial = false
    // loading = false
    // eqFilter = ""

    constructor() {
        makeAutoObservable(this)
    }

    // get eqList() {
    //     let sortedEQs = Array.from(this.eqRegistry.values()).sort((a, b) =>
    //         a.name.localeCompare(b.name))

    //     return sortedEQs.filter((eq) => eq.name.toLowerCase().includes(this.eqFilter.toLowerCase()))
    // }

    // loadEQs = async () => {
    //     this.setLoadingInitial(true)
    //     try {
    //         const apcs = await agent.EquipmentQualities.list()
    //         apcs.forEach(eq => {
    //             this.setEQ(eq)
    //         })
    //         this.setLoadingInitial(false)
    //     } catch (error) {
    //         console.log(error)
    //         this.setLoadingInitial(false)
    //     }
    // }

    // createEQ = async (eq: EquipmentQuality) => {
    //     this.loading = true
    //     eq.id = uuid()
    //     try {
    //         await agent.EquipmentQualities.create(eq)
    //         runInAction(() => {
    //             this.setEQ(eq)
    //             this.loading = false
    //             store.modalStore.closeModal();
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         runInAction(() => {
    //             this.loading = false
    //         })
    //     }
    // }

    // deleteEQ = async (id: string) => {
    //     this.loading = true;
    //     try {
    //         await agent.EquipmentQualities.delete(id)
    //         runInAction(() => {
    //             this.eqRegistry.delete(id)
    //             this.loading = false
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         runInAction(() => {
    //             this.loading = false
    //         })
    //     }
    // }

    // updateEQ = async (eq: EquipmentQuality) => {
    //     this.loading = true
    //     try {
    //         await agent.EquipmentQualities.update(eq)
    //         runInAction(() => {
    //             this.eqRegistry.set(eq.id, eq)
    //             this.loading = false
    //             store.modalStore.closeModal();
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         runInAction(() => {
    //             this.loading = false
    //         })            
    //     }
    // }

    // findLearnForgetEQ = async (eq: EquipmentQuality) => {
    //     this.loading = true
        
    //     if(eq.found) {
    //         if(eq.learned) {
    //             eq.found = false
    //             eq.learned = false
    //         } else eq.learned = true
    //     } else eq.found = true

    //     try {
    //         await agent.EquipmentQualities.update(eq)
    //         runInAction(() => {
    //             this.eqRegistry.set(eq.id, eq)
    //             this.loading = false
    //             store.modalStore.closeModal();
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         runInAction(() => {
    //             this.loading = false
    //         })            
    //     }
    // }

    // setLoadingInitial = (state: boolean) => {
    //     this.loadingInitial = state
    // }

    // private setEQ = (eq: EquipmentQuality) => {
    //     this.eqRegistry.set(eq.id, eq)
    // }

    // setEQFilter = (query: string) => {
    //     this.eqFilter = query
    // }
}