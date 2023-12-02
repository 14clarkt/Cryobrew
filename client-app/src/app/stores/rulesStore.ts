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
    
    // getters
    get APCRulesList() {
        let rules = Array.from(this.ruleRegistry.values()).sort((a, b) =>
            a.order - b.order)
    
        rules = rules.filter((a) => a.group === "apc")
        
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