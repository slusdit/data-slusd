import adminCheck from "@/lib/adminCheck"
import BackButton from "@/app/components/BackButton"

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
            <BackButton />
            <h1>Admin</h1>
        </div>
    )
}