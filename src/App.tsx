import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboardPage";
import DetailPage from "./pages/detailPage";
import Layout from "./pages/layout";
import ComparisonPage from "./pages/comparisonPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="comparison" element={<ComparisonPage />} />{" "}
          <Route path=":id" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

