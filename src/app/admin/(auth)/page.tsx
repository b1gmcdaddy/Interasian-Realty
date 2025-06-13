import React from "react";
import {auth, signIn, signOut} from "@/app/auth";
import Image from "next/image";
import {InteractiveGridPattern} from "@/components/magicui/interactive-grid-pattern";

export default async function LoginPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden">
      <InteractiveGridPattern className="absolute inset-0 w-full h-full z-0" />
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md flex flex-col items-center gap-6 border border-gray-200 z-10">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          {user ? "Welcome!" : "Admin Login"}
        </h1>

        {user ? (
          <>
            {user.image && (
              <Image
                src={user.image}
                alt={"Inter Asian Realty Services Inc."}
                width={80}
                height={80}
                className="rounded-full border-2 border-blue-400 shadow-md mb-2"
              />
            )}
            <div className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
              {user.name}
            </div>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
              className="w-full flex flex-col items-center gap-2">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow transition-colors">
                Sign out
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="w-full flex flex-col items-center gap-4 dark:bg-white">
              <p className="text-gray-600 dark:text-gray-700 text-center">
                Please sign in with your Google account to access the admin
                dashboard and manage listings.
              </p>
              <form
                action={async () => {
                  "use server";
                  await signIn("google", {redirectTo: "/admin/dashboard"});
                }}
                className="w-full flex flex-col items-center gap-2">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg shadow transition-transform duration-200 ease-in-out flex items-center justify-center gap-2 cursor-pointer hover:scale-105 hover:shadow-lg">
                  <Image
                    src="/gmail.png"
                    alt={"Inter Asian Realty Services Inc."}
                    width={20}
                    height={20}
                    decoding="async"
                  />
                  Sign in with Google
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
