import { makeAutoObservable, runInAction } from "mobx";
import { Rule } from "../models/rule";
import agent from "../api/agent";
import { v4 as uuid } from "uuid"
import { store } from "./store";

export default class RulesStore {
    loading = false;
    loadingInitial = false;
    ruleRegistry = new Map<string, Rule>();

    constructor() {
        makeAutoObservable(this)
    }

    loadRules = async () => {
        this.setLoadingInitial(true)
        try {
            const rules = await agent.Rules.list()
            rules.forEach(rule => {
                this.setRule(rule)
            })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }
    
    createRule = async (rule: Rule) => {
        this.loading = true
        rule.id = uuid()
        try {
            await agent.Rules.create(rule)
            runInAction(() => {
                this.setRule(rule)
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

    deleteRule = async (id: string) => {
        this.loading = true;
        try {
            await agent.Rules.delete(id)
            runInAction(() => {
                this.ruleRegistry.delete(id)
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

    updateRule = async (rule: Rule) => {
        this.loading = true
        try {
            await agent.Rules.update(rule)
            runInAction(() => {
                this.ruleRegistry.set(rule.id, rule)
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
    
    // getters
    get rulesList() {
        let rules = Array.from(this.ruleRegistry.values()).sort((a, b) =>
            a.order - b.order)
            
        return rules
    }

    // private methods
    private setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }
    
    private setRule = (rule: Rule) => {
        this.ruleRegistry.set(rule.id, rule)
    }
}