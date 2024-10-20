import { makeAutoObservable, runInAction } from "mobx";
import { User, UserEditValues, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
    user: User | null = null
    userRegistry = new Map<string, User>();

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    get currentAP() {
        return this.user?.currentAP
    }

    get isAdmin() {
        return this.user?.role.localeCompare("Admin") === 0
    }

    get isManager() {
        return this.user?.role.localeCompare("Manager") === 0
    }

    get allUsers() {
        return Array.from(this.userRegistry.values()).sort((a, b) =>
            a.username.localeCompare(b.username))
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/apc');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/apc');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    } 

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    updateUserValues = async (values: UserEditValues) => {
        try {
            const updatedUser = await agent.Account.updateUserValues(values);
            runInAction(() => {
                this.user!.currentAP = updatedUser.currentAP
                this.user!.maxAP = updatedUser.maxAP
                this.user!.shortAP = updatedUser.shortAP
                this.user!.apcSlots = updatedUser.apcSlots
                store.modalStore.closeModal();
            });
        } catch (error) {
            console.log(error);
        }
    }

    loadAllUsers = async () => {
        try {
            const users = await agent.Account.list()
            runInAction(() => {
                users.forEach(user => {
                    this.setUser(user)
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    deleteUser = async (email: string) => {
        try {
            await agent.Account.delete(email)
            runInAction(() => {
                this.userRegistry.delete(email)
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    makeManager = async (email: string) => {
        try {
            await agent.Account.makeManager(email)
            runInAction(() => {
                this.userRegistry.set(email, {...this.userRegistry.get(email)!, role: "Manager"})
            })
        } catch (error) {
            console.log(error)
        }
    }

    private setUser = (user: User) => {
        this.userRegistry.set(user.email, user)
    }
}