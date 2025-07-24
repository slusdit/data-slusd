import { auth } from "@/auth";
import UnauthorizedButton from "../components/UnauthorizedButton";

export default async function SchoolLayout(
  props: Readonly<{
        children: React.ReactNode;
        params: { sc: string };
    }>
) {
  const params = await props.params;


  const {
    children
  } = props;

  // const session = await serverAuth()
  const session = await auth()
  const sc = session?.user?.activeSchool
  console.log('userSchools: ', )

  if (sc?.toString() !== params.sc && sc != 0) {
    return (
      <div>
        Unauthorized, please go back
      </div>
    );
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
  