import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent"
import { v4 as uuid } from "uuid"
import { store } from "./store";
import { AlchemyIngredient, AlchemyIngredientPotency, AlchemyPotencyRange, AlchemyTrait } from "../models/alchemy";

export default class AlchemyStore {
    traitRegistry = new Map<string, AlchemyTrait>();
    ingredientRegistry = new Map<string, AlchemyIngredient>();
    loading = false;
    loadingInitial = false;
    rightHandDisplay : "Traits" | "Products" | "Creation" = "Traits"

    constructor() {
        makeAutoObservable(this)
    }

    get traitList() {
        let traits = Array.from(this.traitRegistry.values()).sort((a, b) =>
            a.name.localeCompare(b.name))

        runInAction(() => { // sort the ranges within the traits
            traits.forEach((trait) => trait.potencyRanges.sort((a, b) => a.order - b.order))
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

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
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
        at?.potencyRanges.sort((a, b) => a.order - b.order)
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
            console.log(`ATid:${ATid}, APRid:${APRid}`);
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

    // Ingredients

    get ingredientList() {
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

    createIngredient = async (ing: AlchemyIngredient) => {
        this.loading = true
        ing.id = uuid()
        try {
            await agent.Alchemy.createIngredient(ing)
            runInAction(() => {
                this.setIng(ing)
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

    // misc

    setRightHandDisplay = (toDisplay: "Traits" | "Products" | "Creation") => {
        this.rightHandDisplay = toDisplay
    }
}