import { auth } from "@/auth";
import RenewSchools from "../components/RenewSchools";

type SchoolAccessPermission = {
    SchoolCode: number;
    ReadOnlyAccess: boolean;
    CommunicationGroup: boolean;
  };
  
  type PersonInfo = {
    SchoolAccessPermissions: SchoolAccessPermission[];
    ExtendedProperties: any[];
    EarlyChildhoodCertificationCode: string;
    Gender: string;
    EducationLevelCode: string;
    EthnicityCode: string;
    RaceCode1: string;
    RaceCode2: string;
    RaceCode3: string;
    RaceCode4: string;
    RaceCode5: string;
    PositionStatusCode: string;
    TotalYearsOfEduService: number;
    TotalYearsInThisDistrict: number;
    PreviousLastName: string;
    PreviousFirstName: string;
    PreviousMiddleName: string;
    NameSuffix: string;
    Address: string;
    AddressCity: string;
    AddressState: string;
    AddressZipCode: string;
    AddressZipExt: string;
    HomePhone: string;
    EmergencyContactName: string;
    EmergencyContactPhone: string;
    ID: number;
    FirstName: string;
    LastName: string;
    MiddleName: string;
    BirthYear: number;
    BirthDate: string;
    FullTimePercentage: number;
    HireDate: string;
    LeaveDate: string | null;
    InactiveStatusCode: string;
    StateEducatorID: string;
    UserName: string;
    EmailAddress: string;
    PrimaryAeriesSchool: number;
    NetworkLoginID: string;
    AlternateEmailAddress: string;
    HumanResourcesSystemID: string;
    CellPhone: string;
    NotificationPreferenceCode: string;
    Title: string;
  };

type PersonData = {
    id: number
    email: string
    schoolPermissions: SchoolAccessPermission[]
    primarySchool: number
    title: string
}

function getSchools(data: PersonInfo) {
    if (data.SchoolAccessPermissions.length === 0) return [data.PrimaryAeriesSchool]
    let schools = data.SchoolAccessPermissions.map(s => s.SchoolCode)
    return schools
}
export async function getAeriesPermissions({
    endpoint = "/api/v5/staff"
}: {
    endpoint?: string
}) {
    const session = await auth()
    const cert = process.env.AERIES_API_KEY as string
    console.log(cert)
    
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_AERIES_URL}${endpoint}`,
        {
            method: "GET",
            cache: "force-cache",
            headers: {
                "Content-Type": "application/json",
                "AERIES-CERT": cert
            },
        }
    );
    const data:PersonInfo[] = await response.json()
    console.log(data)
    
    // const person = data.filter(p => p.EmailAddress === session?.user?.email)[0]
    // const person = data.filter(p => p.EmailAddress === "mabadia@slusd.us")[0]
    const person = data.filter(p => p.EmailAddress === "acorona@slusd.us")[0]

    return {
        "id": person.ID, 
        "email": person.EmailAddress, 
        "schoolPermissions": getSchools(person), 
        "primarySchool": person.PrimaryAeriesSchool, 
        "title": person.Title
    }

}

export default async function Page() {

    const aeriesPermissions = await getAeriesPermissions({endpoint:"/api/v5/staff"});
    console.log(aeriesPermissions)
    return (
        <div>
            <h1>Tests</h1>
            <RenewSchools email={aeriesPermissions.email} />
            <pre>{JSON.stringify(aeriesPermissions, null, 2)}</pre>
        </div>
    );
}