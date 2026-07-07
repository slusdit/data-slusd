import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SchoolPicker from "../components/SchoolPicker";

export default async function Profile() {

    const session = await auth()
    if (!session?.user) {
        redirect("/");
    }

    return (
        <div className="container mx-auto py-6">
            <h1 className="mb-6 text-3xl font-bold">Profile</h1>
            <div className="bg-card max-w-md rounded-lg border p-6">
                <SchoolPicker
                    schools={session?.user?.UserSchool}
                    initialSchool={session?.user?.activeSchool}
                    label={"Select School"}
                />
            </div>
        </div>
    );
}