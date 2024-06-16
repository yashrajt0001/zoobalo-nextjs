import KitchenHeadNavbar from "@/components/KitchenHeadNavbar"

const layout = ({children}:{children: React.ReactNode}) => {
    return <>
        <KitchenHeadNavbar/>
        {children}
    </>
}

export default layout