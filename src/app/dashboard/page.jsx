import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/login");

  // Role-based redirect
  if (session.user.role === "admin") return redirect("/dashboard/admin");
  return redirect("/dashboard/user");
}