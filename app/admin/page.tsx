import adminCheck from "@/lib/adminCheck"

export default async function AdminPage() {
    const admin = await adminCheck()

    if (!admin) {
        return (
            <div className="">
                Not an Admin
            </div>
        )
    }

    return (
        <div>
            <h1>Admin</h1>
        </div>
    )
}