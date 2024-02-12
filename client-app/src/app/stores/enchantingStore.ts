import { makeAutoObservable, runInAction } from "mobx"
import { v4 as uuid } from "uuid"
import agent from "../api/agent";
import { Enchantment } from "../models/enchantment";
import { store } from "./store";

export default class EnchantingStore {
    enchRegistry = new Map<string, Enchantment>()
    loadingInitial = false
    loading = false
    enchFilter = ""

    constructor() {
        makeAutoObservable(this)
    }

    get enchList() {
        let sortedEQs = Array.from(this.enchRegistry.values()).sort((a, b) =>
            a.name.localeCompare(b.name))

        return sortedEQs.filter((ench) => ench.name.toLowerCase().includes(this.enchFilter.toLowerCase()))
    }

    loadEnchantments = async () => {
        this.setLoadingInitial(true)
        try {
            const enchs = await agent.Enchanting.list()
            enchs.forEach(ench => {
                this.setEnch(ench)
            })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    createEnch = async (ench: Enchantment) => {
        this.loading = true
        ench.id = uuid()
        try {
            console.log(ench)
            await agent.Enchanting.create(ench)
            runInAction(() => {
                this.setEnch(ench)
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

    deleteEnch = async (id: string) => {
        this.loading = true;
        try {
            await agent.Enchanting.delete(id)
            runInAction(() => {
                this.enchRegistry.delete(id)
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

    updateEnch = async (ench: Enchantment) => {
        this.loading = true
        try {
            await agent.Enchanting.update(ench)
            runInAction(() => {
                this.enchRegistry.set(ench.id, ench)
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

    findLearnForgetEnch = async (ench: Enchantment) => {
        this.loading = true
        
        if(ench.found) {
            if(ench.learned) {
                ench.found = false
                ench.learned = false
            } else ench.learned = true
        } else ench.found = true

        try {
            await agent.Enchanting.update(ench)
            runInAction(() => {
                this.enchRegistry.set(ench.id, ench)
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

    private setEnch = (ench: Enchantment) => {
        this.enchRegistry.set(ench.id, ench)
    }

    // setEQFilter = (query: string) => {
    //     this.eqFilter = query
    // }
}