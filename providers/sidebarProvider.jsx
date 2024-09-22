"use client"
const { createContext, useState, useEffect, useContext } = require("react");

const SidebarContext = createContext()

export default function SidebarProvider({ children }) {

    const [openSidebar, setOpenSidebar] = useState(true)

    useEffect(()=>{

        const checkWindowForSidebar = ()=>{
            const windowWidth = window.innerWidth

            if(windowWidth > 550){
                setOpenSidebar(false)
            }
        }

        checkWindowForSidebar()

    },[])

    return (
        <SidebarContext.Provider value={{openSidebar, setOpenSidebar}}>
{children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = ()=> useContext(SidebarContext)