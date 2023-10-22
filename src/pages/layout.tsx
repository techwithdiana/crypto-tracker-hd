import { Outlet, useNavigate } from "react-router-dom";
import { Currency, UserContext, useUserContext } from "../utils/userContext";
import clsx from "clsx";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const { currency, setCurrency } = useUserContext();

  return (
    <div className="bg-slate-950 sticky top-0 left-0 z-10">
      <div className="max-w-[120rem] mx-auto px-16 py-4 flex items-center">
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
  const [currency, setCurrency] = useState<Currency>("usd");

  return (
    <div>
      <UserContext.Provider
        value={{
          currency: currency,
          setCurrency: setCurrency,
        }}
      >
        <Header />
        <Outlet />
      </UserContext.Provider>
    </div>
  );
}
