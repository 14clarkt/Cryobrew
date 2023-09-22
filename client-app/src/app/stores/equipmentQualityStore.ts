import { makeAutoObservable, runInAction } from "mobx"
import { EquipmentQuality } from "../models/equipmentQuality";
import { v4 as uuid } from "uuid"
import { store } from "./store";
import agent from "../api/agent";

export default class EquipmentQualityStore {
    eqRegistry = new Map<string, EquipmentQuality>();
    loadingInitial = false;
    loading = false;

    constructor() {
        makeAutoObservable(this)
    }

    get eqList() {
        return Array.from(this.eqRegistry.values()).sort((a, b) =>
            a.name.localeCompare(b.name))
    }

    loadEQs = async () => {
        this.setLoadingInitial(true)
        try {
            const apcs = await agent.EquipmentQualities.list()
            apcs.forEach(eq => {
                this.setEQ(eq)
            })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }
    
    createEQ = async (eq: EquipmentQuality) => {
        this.loading = true
        eq.id = uuid()
        try {
            await agent.EquipmentQualities.create(eq)
            runInAction(() => {
                this.setEQ(eq)
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

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }
    
    private setEQ = (eq: EquipmentQuality) => {
        this.eqRegistry.set(eq.id, eq)
    }
}