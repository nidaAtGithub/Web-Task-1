import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const user = cookieStore.get("user");

  if (user) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}