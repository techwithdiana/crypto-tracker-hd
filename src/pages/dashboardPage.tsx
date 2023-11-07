import { useNavigate } from "react-router-dom";
import { flexRender } from "@tanstack/react-table";
import clsx from "clsx";
import Arrow from "../assets/chevron_down.svg";
import { useCoinTable } from "../utils/hooks";
import TopPerforming from "../components/topPerforming";

export default function DashboardPage() {
  //useNavigate is a hook that lets you change pages without reloading the whole window
  const navigate = useNavigate();
  const { isLoading, data, table, setFilter } = useCoinTable();

  return (
    <div>
      <div className="w-full bg-[url('https://crypto-hunter.netlify.app/banner2.jpg')]">
        <div className="max-w-[120rem] mx-auto p-4 lg:p-16">
          <TopPerforming />
        </div>
      </div>
      <div className="max-w-[120rem] mx-auto p-4 lg:p-16 py-8 flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <input
            disabled={isLoading}
            placeholder="Search for a Crypto Currency"
            className="flex-1 transition-all bg-transparent p-3 rounded-lg outline-none border border-white border-opacity-50 focus:border-opacity-75 focus:ring-2 focus:ring-white focus:ring-opacity-25 text-white text-opacity-80"
            onChange={(e) => setFilter(e.target.value)}
          />
          <button
            onClick={() => {
              //This will get the selected rows from the table and
              //trigger navigation to the comparison page if correct
              //amount are selected
              const selected = table.getState().rowSelection;
              const coins = Object.keys(selected).filter(
                (id) => !!selected[id]
              );
              if (coins.length >= 2 && coins.length <= 4) {
                //the url will be built like /comparison?coins=bitcoin,etherium,doge
                navigate(`/comparison?coins=${coins.join(",")}`);
              }
            }}
            className="p-3 rounded-lg border border-white border-opacity-50 text-white font-medium text-opacity-75 hover:bg-white hover:bg-opacity-5 transition-all"
          >
            Compare
          </button>
        </div>
        {isLoading && (
          <div className="flex flex-col gap-2">
            {Array.from(Array(20).keys()).map((i) => (
              <div key={i} className="bg-slate-800 h-12 animate-pulse" />
            ))}
          </div>
        )}
        {!isLoading && (
          <div className="w-full overflow-x-auto lg:overflow-x-hidden">
            <table className="w-full bg-slate-950 bg-opacity-50 rounded">
              <thead>
                {table.getHeaderGroups().map((group) => (
                  <tr key={group.id} className="bg-yellow-400">
                    {group.headers.map((header) => (
                      <th
                        key={header.id}
                        className={clsx(
                          "text-left px-5 py-4 text-sm select-none",
                          {
                            "text-right": header.index !== 0,
                            "cursor-pointer hover:bg-yellow-500 transition-[background]":
                              header.column.getCanSort(),
                          }
                        )}
                        onClick={() => {
                          if (header.column.getCanSort())
                            header.column.toggleSorting();
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() && (
                          <img
                            src={Arrow}
                            className={clsx(
                              "h-4 w-4 transition-transform inline-block ms-2",
                              {
                                "rotate-180":
                                  header.column.getIsSorted() === "asc",
                              }
                            )}
                          />
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="text-white">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => navigate(row.original.id)}
                    className="hover:bg-slate-900 transition-[background] cursor-pointer border-t border-t-white border-opacity-10"
                  >
                    {row.getAllCells().map((cell) => (
                      <td key={cell.id} className="px-5 py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!!data?.length && (
          <div className="ms-auto flex gap-2 font-medium items-center">
            <div className="text-white text-opacity-75">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <button
              onClick={() => {
                table.previousPage();
                window.scrollTo({
                  behavior: "smooth",
                  top: 0,
                });
              }}
              disabled={!table.getCanPreviousPage()}
              className="border border-yellow-400 text-yellow-400 px-3 py-2 rounded hover:bg-yellow-400 hover:text-black transition-all"
            >
              Prev
            </button>
            <button
              onClick={() => {
                table.nextPage();
                window.scrollTo({
                  behavior: "smooth",
                  top: 0,
                });
              }}
              disabled={!table.getCanNextPage()}
              className="border border-yellow-400 text-yellow-400 px-3 py-2 rounded hover:bg-yellow-400 hover:text-black transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
