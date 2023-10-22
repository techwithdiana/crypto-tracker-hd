import { useParams } from "react-router-dom";
import Summary from "../components/summary";
import Chart from "../components/chart";

function DetailPage() {
  const { id } = useParams();
  if (!id) throw Error();

  return (
    <div className="max-w-[120rem] mx-auto px-16 py-8 grid grid-cols-1 lg:grid-cols-10 gap-8">
      <div className="col-span-3">
        <Summary id={id} />
      </div>
      <div className="col-span-7">
        <Chart id={id} />
      </div>
    </div>
  );
}

export default DetailPage;
