import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent"
import { v4 as uuid } from "uuid"
import { store } from "./store";
import { AlchemyIngredient, AlchemyIngredientPotency, AlchemyPotencyRange, AlchemyProduct, AlchemyTrait } from "../models/alchemy";

export default class AlchemyStore {
    traitRegistry = new Map<string, AlchemyTrait>();
    ingredientRegistry = new Map<string, AlchemyIngredient>();
    productRegistry = new Map<string, AlchemyProduct>();

    newQuantityRegistry = new Map<string, number>();

    loading = false;
    loadingInitial = false;
    rightHandDisplay : "Traits" | "Products" | "Creation" | "Picker" = "Traits"

    traitFilter = ""
    ingredientFilter = ""

    showZero : boolean = true
    filterByName : boolean = true

    constructor() {
        makeAutoObservable(this)
    }

    // Alchemy Traits
    get traitList() {
        let traits = Array.from(this.traitRegistry.values()).sort((a, b) =>
            a.name.localeCompare(b.name))

        runInAction(() => { // sort the ranges within the traits
            traits.forEach((trait) => trait.potencyRanges.sort((a, b) => {
                const aMin = a.range.includes("-") ? +a.range.split("-")[0] : +a.range.split("+")[0]
                const bMin = b.range.includes("-") ? +b.range.split("-")[0] : +b.range.split("+")[0]
                return aMin - bMin
            }))
        })

        return traits
    }

    loadTraits = async () => {
        this.setLoadingInitial(true)
        try {
            const traits = await agent.Alchemy.listTrait()
            runInAction(() => {
                traits.forEach(trait => {
                    this.setTrait(trait)
                })
            })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    private setTrait = (trait: AlchemyTrait) => {
        this.traitRegistry.set(trait.id, trait)
    }

    createTrait = async (trait: AlchemyTrait) => {
        this.loading = true
        trait.id = uuid()
        try {
            await agent.Alchemy.createTrait(trait)
            runInAction(() => {
                this.setTrait(trait)
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

    createAPR = async (ATid: string, apr: AlchemyPotencyRange) => {
        this.loading = true
        apr.id = uuid()
        try {
            await agent.Alchemy.createAPR(ATid, apr)
            runInAction(() => {
                this.setAPR(ATid, apr)
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

    private setAPR = (ATid: string, apr: AlchemyPotencyRange) => {
        let at = this.traitRegistry.get(ATid)
        at?.potencyRanges.push(apr)
        at?.potencyRanges.sort((a, b) => {
            const aMin = a.range.includes("-") ? +a.range.split("-")[0] : +a.range.split("+")[0]
            const bMin = b.range.includes("-") ? +b.range.split("-")[0] : +b.range.split("+")[0]
            return aMin - bMin
        })
    }

    updateTrait = async (at: AlchemyTrait) => {
        this.loading = true
        try {
            await agent.Alchemy.updateTrait(at)
            runInAction(() => {
                this.traitRegistry.set(at.id, at)
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

    updateAPR = async (ATid: string, apr: AlchemyPotencyRange) => {
        this.loading = true
        try {
            await agent.Alchemy.updateAPR(apr)
            runInAction(() => {
                let at = this.traitRegistry.get(ATid)
                at!.potencyRanges = at!.potencyRanges.filter((a) => a.id !== apr.id)
                this.setAPR(ATid, apr)
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

    deleteTrait = async (id: string) => {
        this.loading = true;
        try {
            await agent.Alchemy.deleteTrait(id)
            runInAction(() => {
                this.traitRegistry.delete(id)
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    deleteAPR = async (ATid: string, APRid: string) => {
        this.loading = true;
        try {
            await agent.Alchemy.deleteAPR(ATid, APRid)
            runInAction(() => {
                let at = this.traitRegistry.get(ATid)
                at!.potencyRanges = at!.potencyRanges.filter((apr) => apr.id !== APRid)
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

    // Alchemy Ingredients

    get ingredientSortedList() {
        let ings = Array.from(this.ingredientRegistry.values()).sort((a, b) =>
            a.name.localeCompare(b.name))

        return ings
    }

    loadIngredients = async () => {
        this.setLoadingInitial(true)
        try {
            const ings = await agent.Alchemy.listIngredient()
            runInAction(() => {
                ings.forEach(ing => {
                    this.setIng(ing)
                    this.setIngQuantity(ing)
                })
            })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    private setIng = (ing: AlchemyIngredient) => {
        this.ingredientRegistry.set(ing.id, ing)
    }

    private setIngQuantity = (ing: AlchemyIngredient) => {
        this.newQuantityRegistry.set(ing.id, ing.quantity)
    }

    createIngredient = async (ing: AlchemyIngredient) => {
        this.loading = true
        ing.id = uuid()
        try {
            await agent.Alchemy.createIngredient(ing)
            runInAction(() => {
                this.setIng(ing)
                this.setIngQuantity(ing)
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

    createAIP = async (AIid: string, aip: AlchemyIngredientPotency) => {
        this.loading = true
        aip.id = uuid()
        try {
            await agent.Alchemy.createAIP(AIid, aip)
            runInAction(() => {
                this.setAIP(AIid, aip)
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

    private setAIP = (AIid: string, aip: AlchemyIngredientPotency) => {
        let ing = this.ingredientRegistry.get(AIid)
        ing?.potencies.push(aip)
    }

    updateIngredient = async (ing: AlchemyIngredient) => {
        this.loading = true
        try {
            await agent.Alchemy.updateIngredient(ing)
            runInAction(() => {
                this.ingredientRegistry.set(ing.id, ing)
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

    hideShowIngredient = async (ing: AlchemyIngredient) => {
        await this.updateIngredient({...ing, hidden: !ing.hidden})
    }

    deleteAlchemyIngredient = async (id: string) => {
        this.loading = true;
        try {
            await agent.Alchemy.deleteIngredient(id)
            runInAction(() => {
                this.ingredientRegistry.delete(id)
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    deleteAIP = async (AIid: string, AIPid: string) => {
        this.loading = true;
        try {
            await agent.Alchemy.deleteAIP(AIid, AIPid)
            runInAction(() => {
                let ing = this.ingredientRegistry.get(AIid)
                ing!.potencies = ing!.potencies.filter((aip) => aip.id !== AIPid)
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    incrementIngredientQuantity = (ingId: string, increment: boolean) => {
        let nq = this.newQuantityRegistry.get(ingId)
        if (nq === undefined) return
        increment ? this.newQuantityRegistry.set(ingId, nq+1) : this.newQuantityRegistry.set(ingId, Math.max(nq-1, 0))
    }

    saveIngredientQuantity = async (ing: AlchemyIngredient) => {
        await this.updateIngredient({...ing, quantity: this.newQuantityRegistry.get(ing.id)!})
    }

    // Alchemy Products
    get productList() {
        let products = Array.from(this.productRegistry.values()).sort((a, b) =>
            a.name.localeCompare(b.name))

        return products
    }

    loadProducts = async () => {
        this.setLoadingInitial(true)
        try {
            const products = await agent.Alchemy.listProduct()
            runInAction(() => {
                products.forEach(product => {
                    this.setProduct(product)
                })
            })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    createProduct = async (product: AlchemyProduct) => {
        this.loading = true
        product.id = uuid()
        try {
            await agent.Alchemy.createProduct(product)
            runInAction(() => {
                this.setProduct(product)
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

    deleteProduct = async (id: string) => {
        this.loading = true;
        try {
            await agent.Alchemy.deleteProduct(id)
            runInAction(() => {
                this.productRegistry.delete(id)
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

    updateProduct = async (product: AlchemyProduct) => {
        this.loading = true
        try {
            await agent.Alchemy.updateProduct(product)
            runInAction(() => {
                this.setProduct(product)
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

    private setProduct = (product: AlchemyProduct) => {
        this.productRegistry.set(product.id, product)
    }

    // misc

    setRightHandDisplay = (toDisplay: "Traits" | "Products" | "Creation" | "Picker") => {
        this.rightHandDisplay = toDisplay
        this.traitFilter = ""
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }

    setTraitFilter = (query: string) => {
        this.traitFilter = query
    }

    setIngredientFilter = (query: string) => {
        this.ingredientFilter = query
    }

    toggleShowZero = () => {
        this.showZero = !this.showZero
    }

    toggleFilterByName = () => {
        this.filterByName = !this.filterByName
    }
}