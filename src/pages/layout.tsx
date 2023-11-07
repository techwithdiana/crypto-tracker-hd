import { Outlet, useNavigate } from "react-router-dom";
import { Currency, UserContext, useUserContext } from "../utils/userContext";
import clsx from "clsx";
import { Suspense, useState } from "react";

/**
 *
 * @returns Header that is sticky at the top of every page
 */
function Header() {
  const navigate = useNavigate();
  const { currency, setCurrency } = useUserContext();

  return (
    <div className="bg-slate-950 sticky top-0 left-0 z-10">
      <div className="max-w-[120rem] mx-auto p-4 lg:px-16 py-4 flex items-center">
        <div
          className="text-yellow-300 font-bold text-xl flex-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Crypto Tracker
        </div>
        <div className="font-medium text-sm">
          <button
            onClick={() => setCurrency("usd")}
            className={clsx(
              "px-2 rounded-s border border-yellow-400 text-white",
              {
                "bg-yellow-400 text-black": currency === "usd",
              }
            )}
          >
            USD
          </button>
          <button
            onClick={() => setCurrency("cad")}
            className={clsx(
              "px-2 rounded-e border border-yellow-400 text-white",
              {
                "bg-yellow-400 text-black": currency === "cad",
              }
            )}
          >
            CAD
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Layout() {
  //This is the state for the currency, it will be reset on page refresh
  const [currency, setCurrency] = useState<Currency>("usd");

  //Here we are setting up the page layout and wrapping it in the UserContext
  //UserContext.Provider is what will let all child components use values from the Context
  //One thing to be aware of is that contexts can cause performance issues if they store constantly changing data
  //Since the data it stores is just the currency and changing the currency requires refresh it is safe to use
  return (
    <div>
      <UserContext.Provider
        value={{
          currency: currency,
          setCurrency: setCurrency,
        }}
      >
        {/** This will be visible on every single page */}
        <Header />
        {/** Outlet is the container that the app will load each page into */}
        <Suspense>
          <Outlet />
        </Suspense>
      </UserContext.Provider>
    </div>
  );
}

