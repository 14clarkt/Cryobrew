import { makeAutoObservable, runInAction } from "mobx"
import { v4 as uuid } from "uuid"
import agent from "../api/agent";
import { Supply } from "../models/supply";
import { store } from "./store";

export default class SuppliesStore {
    suppliesRegistry = new Map<string, Supply>()
    loadingInitial = false
    loading = false

    newQuantityRegistry = new Map<string, number>();

    constructor() {
        makeAutoObservable(this)
    }

    get suppliesList() {
        return Array.from(this.suppliesRegistry.values()).sort((a, b) =>
            a.order - b.order)
    }

    get nextOrder() {
        return this.suppliesList.length > 0 ? 1 + this.suppliesList.at(this.suppliesList.length-1)!.order : 1
    }

    loadSupplies = async () => {
        this.setLoadingInitial(true)
        try {
            const supplies = await agent.Supplies.list()
            supplies.forEach(supply => {
                this.setSupply(supply)
            })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    createSupplies = async (supply: Supply) => {
        this.loading = true
        supply.id = uuid()
        try {
            await agent.Supplies.create(supply)
            runInAction(() => {
                this.setSupply(supply)
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

    deleteSupply = async (id: string) => {
        this.loading = true;
        try {
            await agent.Supplies.delete(id)
            runInAction(() => {
                this.suppliesRegistry.delete(id)
                this.newQuantityRegistry.delete(id)
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    updateSupply = async (supply: Supply) => {
        this.loading = true
        try {
            await agent.Supplies.update(supply)
            runInAction(() => {
                this.suppliesRegistry.set(supply.id, supply)
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

    private setSupply = (supply: Supply) => {
        this.suppliesRegistry.set(supply.id, supply)
        this.setSupplyQuantity(supply)
    }

    private setSupplyQuantity = (supply: Supply) => {
        this.newQuantityRegistry.set(supply.id, supply.quantity)
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }

    incrementSupplyQuantity = (supplyId: string, increment: boolean) => {
        let nq = this.newQuantityRegistry.get(supplyId)
        if (nq === undefined) return
        increment ? this.newQuantityRegistry.set(supplyId, nq+1) : this.newQuantityRegistry.set(supplyId, Math.max(nq-1, 0))
    }

    saveSupplyQuantity = async (supply: Supply) => {
        await this.updateSupply({...supply, quantity: this.newQuantityRegistry.get(supply.id)!})
    }
}