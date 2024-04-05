import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';
import { store } from '../stores/store';
import { User, UserEditValues, UserFormValues } from '../models/user';
import { ActionPointCard, ActionPointLevel } from '../models/actionPointCard';
import { EquipmentQuality } from '../models/equipmentQuality';
import { AlchemyIngredient, AlchemyIngredientPotency, AlchemyPotencyRange, AlchemyProduct, AlchemyTrait } from '../models/alchemy';
import { Supply } from '../models/supply';
import { Rule } from '../models/rule';
import { Enchantment } from '../models/enchantment';
import { Crelic, CrelicAbility, CrelicSubAbility, CrelicSubAbilityLevel } from '../models/crelic';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
    return config
})

axios.interceptors.response.use(async response => {
    //TODO: this await is just to simulate load time. It should be removed in production.
    if (import.meta.env.DEV) await sleep(100)
    return response
}, (error: AxiosError) => { // this runs on rejection (an error/exception)
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found')
            }
            if (data.errors) {
                const modalStateErrors = []
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat()
            } else {
                toast.error(data)
            }
            break;
        case 401:
            toast.error('unauthorised')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            router.navigate('/not-found')
            break;
        case 500:
            store.commonStore.setServerError(data)
            router.navigate('/server-error')
            break;
    }
    return Promise.reject(error)
})

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const ActionPointCards = {
    list: () => requests.get<ActionPointCard[]>('/actionpointcard'),
    create: (apc: ActionPointCard) => axios.post('/actionpointcard', apc),
    update: (apc: ActionPointCard) => axios.put(`/actionpointcard/${apc.id}`, apc),
    delete: (id: string) => axios.delete(`/actionpointcard/${id}`),

    createApl: (APCid: string, apl: ActionPointLevel) => axios.post(`/actionpointlevel/${APCid}`, apl),
    deleteApl: (APCid: string, APLid: string) => axios.delete(`/actionpointlevel/${APCid}/${APLid}`),
    copyApl: (APCid: string, APLid: string, copyAplId: string) => axios.post(`/actionpointlevel/${APCid}/${APLid}/${copyAplId}`, {}),
    updateApl: (apl: ActionPointLevel) => axios.put(`/actionpointlevel`, apl),
}

const EquipmentQualities = {
    list: () => requests.get<EquipmentQuality[]>('/equipmentquality'),
    create: (eq: EquipmentQuality) => axios.post('/equipmentquality', eq),
    delete: (id: string) => axios.delete(`/equipmentquality/${id}`),
    update: (eq: EquipmentQuality) => axios.put(`/equipmentquality/${eq.id}`, eq),
}

const Alchemy = {
    listTrait: () => requests.get<AlchemyTrait[]>('/alchemy/trait'),
    createTrait: (trait: AlchemyTrait) => axios.post('/alchemy/trait', trait),
    deleteTrait: (id: string) => axios.delete(`/alchemy/trait/${id}`),
    updateTrait: (at: AlchemyTrait) => axios.put(`/alchemy/trait/${at.id}`, at),

    createAPR: (ATid: string, apr: AlchemyPotencyRange) => axios.post(`/alchemy/potencyrange/${ATid}`, apr),
    updateAPR: (apr: AlchemyPotencyRange) => axios.put(`/alchemy/potencyrange/${apr.id}`, apr),
    deleteAPR: (ATid: string, APRid: string) => axios.delete(`/alchemy/potencyrange/${ATid}/${APRid}`),

    listIngredient: () => requests.get<AlchemyIngredient[]>('/alchemy/ingredient'),
    createIngredient: (ing: AlchemyIngredient) => axios.post('/alchemy/ingredient', ing),
    deleteIngredient: (id: string) => axios.delete(`/alchemy/ingredient/${id}`),
    updateIngredient: (ing: AlchemyIngredient) => axios.put(`/alchemy/ingredient/${ing.id}`, ing),

    createAIP: (AIid: string, aip: AlchemyIngredientPotency) => axios.post(`/alchemy/ingredientpotency/${AIid}`, aip),
    deleteAIP: (AIid: string, AIPid: string) => axios.delete(`/alchemy/ingredientpotency/${AIid}/${AIPid}`),

    listProduct: () => requests.get<AlchemyProduct[]>('/alchemy/product'),
    createProduct: (product: AlchemyProduct) => axios.post('/alchemy/product', product),
    deleteProduct: (id: string) => axios.delete(`/alchemy/product/${id}`),
}

const Supplies = {
    list: () => requests.get<Supply[]>('/supply'),
    create: (supply: Supply) => axios.post('/supply', supply),
    delete: (id: string) => axios.delete(`/supply/${id}`),
    update: (supply: Supply) => axios.put(`/supply/${supply.id}`, supply),
}

const Enchanting = {
    list: () => requests.get<Enchantment[]>('/enchanting'),
    create: (ench: Enchantment) => axios.post('/enchanting', ench),
    update: (ench: Enchantment) => axios.put(`/enchanting/${ench.id}`, ench),
    delete: (id: string) => axios.delete(`/enchanting/${id}`),
}

const Crelics = {
    list: () => requests.get<Crelic[]>('/crelic'),
    create: (crelic: Crelic) => axios.post('/crelic', crelic),
    update: (crelic: Crelic) => axios.put(`/crelic/${crelic.id}`, crelic),
    delete: (id: string) => axios.delete(`/crelic/${id}`),

    // listAbility: () => requests.get<CrelicAbility[]>('/crelic/ability'),
    createAbility: (crelicId: string, crelicAbility: CrelicAbility) => axios.post(`/crelic/ability/${crelicId}`, crelicAbility),
    updateAbility: (crelicAbility: CrelicAbility) => axios.put(`/crelic/ability/${crelicAbility.id}`, crelicAbility),
    // deleteAbility: (id: string) => axios.delete(`/crelic/ability/${id}`),

    createSubAbility: (crelicAbilityId: string, crelicSubAbility: CrelicSubAbility) => axios.post(`/crelic/subability/${crelicAbilityId}`, crelicSubAbility),
    updateSubAbility: (crelicSubAbility: CrelicSubAbility) => axios.put(`/crelic/subability/${crelicSubAbility.id}`, crelicSubAbility),

    createSubAbilityLevel: (crelicSubAbilityId: string, crelicSubAbilityLevel: CrelicSubAbilityLevel) => axios.post(`/crelic/subabilitylevel/${crelicSubAbilityId}`, crelicSubAbilityLevel),
    updateSubAbilityLevel: (crelicSubAbilityLevel: CrelicSubAbilityLevel) => axios.put(`/crelic/subabilitylevel/${crelicSubAbilityLevel.id}`, crelicSubAbilityLevel),
}

const Rules = {
    list: () => requests.get<Rule[]>('/rule'),
    create: (rule: Rule) => axios.post('/rule', rule),
    delete: (id: string) => axios.delete(`/rule/${id}`),
    update: (rule: Rule) => axios.put(`/rule/${rule.id}`, rule),
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
    updateUserValues: (values: UserEditValues) => requests.put<User>('/account/update', values)
}

const agent = {
    ActionPointCards,
    EquipmentQualities,
    Alchemy,
    Supplies,
    Enchanting,
    Crelics,
    Account,
    Rules,
}

export default agent;