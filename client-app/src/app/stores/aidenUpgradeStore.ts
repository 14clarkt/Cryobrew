import { makeAutoObservable, runInAction } from "mobx"
import { v4 as uuid } from "uuid"
import agent from "../api/agent";
import { store } from "./store";
import { AidenUpgrade } from "../models/aidenUpgrade";

export default class AidenUpgradeStore {
    aidenUpgradeRegistry = new Map<string, AidenUpgrade>()
    loadingInitial = false
    loading = false
    auFilter = ""
    auGroup : "equipped" | "all" | "available" = "equipped"
    
    constructor() {
        makeAutoObservable(this)
    }
    
    get aidenUpgradeList() {
        let sortedAUs = Array.from(this.aidenUpgradeRegistry.values()).sort((a, b) =>
            a.name.localeCompare(b.name))

        return sortedAUs.filter((au) => au.name.toLowerCase().includes(this.auFilter.toLowerCase()))
    }

    loadAidenUpgrades = async () => {
        this.setLoadingInitial(true)
        try {
            const AUs = await agent.AidenUpgrades.list()
            AUs.forEach(AU => {
                this.setAU(AU)
            })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    createAidenUpgrade = async (au: AidenUpgrade) => {
        this.loading = true
        au.id = uuid()
        try {
            await agent.AidenUpgrades.create(au)
            runInAction(() => {
                this.setAU(au)
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

    deleteAidenUpgrade = async (id: string) => {
        this.loading = true;
        try {
            await agent.AidenUpgrades.delete(id)
            runInAction(() => {
                this.aidenUpgradeRegistry.delete(id)
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

    updateAidenUpgrade = async (au: AidenUpgrade) => {
        this.loading = true
        try {
            await agent.AidenUpgrades.update(au)
            runInAction(() => {
                this.aidenUpgradeRegistry.set(au.id, au)
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

    private setAU = (au: AidenUpgrade) => {
        this.aidenUpgradeRegistry.set(au.id, au)
    }

    setAUFilter = (query: string) => {
        this.auFilter = query
    }

    setAUGroup = (group: "all" | "equipped" | "available") => {
        this.auGroup = group
    }    
}