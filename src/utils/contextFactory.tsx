import { createContext, useContext, useMemo, useState, type JSX } from "react";

interface IStore {
    key: string,
    store: Record<string, any>,
    setStore:(payload: Record<string, any>) => void
}

interface IProp {
    children: React.ReactNode
}

const getCtxProvider = (key: string, defaultValue: Record<string, any>, AppContext: React.Context<IStore>) => ({ children }: IProp) => {
    const [store, setStore] = useState(defaultValue)

    const value = useMemo(() => ({
        key,
        store,
        setStore
    }),[store])

    return (<AppContext.Provider value= {value} > {children} </AppContext.Provider>)
};

const cxtCache : Record<string, Cxt>= {}

class Cxt {
    defaultStore: IStore;
    appContext: React.Context<IStore>;
    Provider: ({ children }: IProp) => JSX.Element;

    constructor(key: string,defaultValue: Record<string, any>) {
        this.defaultStore = {
            key,
            store: defaultValue,
            setStore: () => {},
        };
        this.appContext = createContext(this.defaultStore);
        this.Provider = getCtxProvider(key, defaultValue, this.appContext);
        cxtCache[key] = this;
    }
}
export const useAppContext = (key: string) => {
    const ctx = cxtCache[key];
    const app = useContext(ctx.appContext);  
    return {store:app.store, setStore:app.setStore}
}

export const connectFactory = (
    key: string,
    defaultValue:Record<string, any>
) => {
    const cxt = cxtCache[key];
    let CurCtx:Cxt;
    if (cxt) {
        CurCtx = cxt;
    } else {
        CurCtx = new Cxt(key, defaultValue);
     }
    
    return (Child:React.FunctionComponent<any>) => (props:any) => {
       return <CurCtx.Provider><Child {...props}/></CurCtx.Provider>
    }
}