import {createContext, useCallback, useContext, useState} from "react";

interface SidebarContextType {
    state: 'expanded' | 'collapsed';
    toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  state: 'collapsed',
  toggleSidebar: () => {},
});

export const SidebarProvider = ({children}:{children: React.ReactNode}) => {
    const [state, setState] = useState<'expanded' | 'collapsed'>('collapsed');
    
    const toggleSidebar = useCallback(() => {
        setState(prevState => prevState === 'expanded' ? 'collapsed' : 'expanded');
    }, []);

    return (
        <SidebarContext.Provider value={{state, toggleSidebar}}>
            {children}
        </SidebarContext.Provider>
    )
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}
