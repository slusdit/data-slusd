import { auth } from "@/auth";
import UnauthorizedButton from "../components/UnauthorizedButton";
import AccessDenied from "../components/AccessDenied";

export default async function SchoolLayout(
  props: Readonly<{
        children: React.ReactNode;
        params: Promise<{ sc: string }>;
    }>
) {
  const params = await props.params;


  const {
    children
  } = props;

  const session = await auth()
  const sc = session?.user?.activeSchool

  if (sc?.toString() !== params.sc && sc != 0) {
    return <AccessDenied message="You do not have access to this school." />;
  }


  return (
      <div>
          {session ? children :
                <UnauthorizedButton
                  home
                />
              }
      </div>
  );
}
  