import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout } from "../actions/auth";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  // Redirect if not logged in
  if (!userCookie) {
    redirect("/login");
  }

  const userEmail = userCookie.value;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Welcome back!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              You are logged in as{" "}
              <span className="font-semibold text-indigo-600">{userEmail}</span>
            </p>
          </div>

          <div className="mt-6">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Protected Dashboard
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This content is only visible to authenticated users. Your
                session is secure with HTTP-only cookies.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <form action={logout}>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}