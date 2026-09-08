import { auth } from "@/auth";
import { userCanAccessSchool } from "@/lib/authorization";
import UnauthorizedButton from "../components/UnauthorizedButton";
import AccessDenied from "../components/AccessDenied";

export default async function SchoolLayout(
  props: Readonly<{
        children: React.ReactNode;
        params: Promise<{ sc: string }>;
    }>
) {
  const params = await props.params;
  const { children } = props;

  const session = await auth()

  // Gate on the schools the user actually holds, not on the school picker
  // (findings S10/U2): a district-wide report may link to any of the user's
  // schools, and a tampered activeSchool must not widen access.
  if (!session?.user || !userCanAccessSchool(session.user, params.sc)) {
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
