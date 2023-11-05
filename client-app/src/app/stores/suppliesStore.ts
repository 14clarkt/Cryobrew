import { makeAutoObservable, runInAction } from "mobx"
import { v4 as uuid } from "uuid"
import agent from "../api/agent";
import { Supply } from "../models/supply";
import { store } from "./store";

export default class SuppliesStore {
    suppliesRegistry = new Map<string, Supply>()
    loadingInitial = false
    loading = false

    newQuantityRegistry = new Map<string, number>()
    quantityIncrement: 1|10|100 = 1;

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
        increment ? this.newQuantityRegistry.set(supplyId, nq+this.quantityIncrement) : this.newQuantityRegistry.set(supplyId, Math.max(nq-this.quantityIncrement, 0))
    }

    saveSupplyQuantity = async (supply: Supply) => {
        await this.updateSupply({...supply, quantity: this.newQuantityRegistry.get(supply.id)!})
    }

    get leftwardIcon() {
        if (this.quantityIncrement === 1) return "angle left"
        if (this.quantityIncrement === 10) return "double angle left"
        if (this.quantityIncrement === 100) return "backward"
    }

    get rightwardIcon() {
        if (this.quantityIncrement === 1) return "angle right"
        if (this.quantityIncrement === 10) return "double angle right"
        if (this.quantityIncrement === 100) return "forward"
    }

    setQuantityIncrement = (increment: 1|10|100) => {
        this.quantityIncrement = increment
    }
}