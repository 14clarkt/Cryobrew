import { makeAutoObservable, runInAction } from "mobx"
import { MagicItem } from "../models/magicItem"
import { v4 as uuid } from "uuid"
import agent from "../api/agent";
import { store } from "./store";

export default class MagicItemStore {
    magicItemRegistry = new Map<string, MagicItem>()
    loadingInitial = false
    loading = false
    miFilter = ""

    constructor() {
        makeAutoObservable(this)
    }

    get magicItemList() {
        let sortedMIs = Array.from(this.magicItemRegistry.values()).sort((a, b) =>
            a.name.localeCompare(b.name))

        return sortedMIs.filter((mi) => mi.name.toLowerCase().includes(this.miFilter.toLowerCase()))
    }

    loadMagicItems = async () => {
        this.setLoadingInitial(true)
        try {
            const MIs = await agent.MagicItems.list()
            MIs.forEach(MI => {
                this.setMI(MI)
            })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    createMagicItem = async (mi: MagicItem) => {
        this.loading = true
        mi.id = uuid()
        try {
            await agent.MagicItems.create(mi)
            runInAction(() => {
                this.setMI(mi)
                store.modalStore.closeModal()
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    deleteMagicItem = async (id: string) => {
        this.loading = true;
        try {
            await agent.MagicItems.delete(id)
            runInAction(() => {
                this.magicItemRegistry.delete(id)
                store.modalStore.closeModal()
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    updateMagicItem = async (mi: MagicItem) => {
        this.loading = true
        try {
            await agent.MagicItems.update(mi)
            runInAction(() => {
                this.magicItemRegistry.set(mi.id, mi)
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

    private setMI = (mi: MagicItem) => {
        this.magicItemRegistry.set(mi.id, mi)
    }

    setMIFilter = (query: string) => {
        this.miFilter = query
    }
}