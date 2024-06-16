import { AreaManagerNavbar } from "@/components/AreaManagerNavbar"


const layout = ({children}:{children: React.ReactNode}) => {
    return <>
        <AreaManagerNavbar />
        {children}
    </>
}

export default layout
