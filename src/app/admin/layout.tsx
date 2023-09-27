import AdminNavbar from '@/components/AdminNavbar'

const layout = ({children}:{children: React.ReactNode}) => {
    return <>
        <AdminNavbar/>
        {children}
    </>
}

export default layout