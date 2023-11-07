import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

const Layout = React.lazy(() => import("./pages/layout"));
const DashboardPage = React.lazy(() => import("./pages/dashboardPage"));
const DetailPage = React.lazy(() => import("./pages/detailPage"));
const ComparisonPage = React.lazy(() => import("./pages/comparisonPage"));

function App() {
  //The BrowserRouter handles the navigation of the pages
  return (
    <BrowserRouter>
      <Routes>
        {/** Here we are providing a parent page with the Layout from layout.tsx */}
        <Route element={<Layout />}>
          {/** Here are the pages for the App. since they are children
           * and the Layout has the Outlet, they will be correctly rendered inside the layout
           * bellow the header based on the path set
           *
           * since DashboardPage has a path of "/" it will be rendered as the index
           */}
          <Route path="/" element={<DashboardPage />} />
          <Route path="comparison" element={<ComparisonPage />} />{" "}
          <Route path=":id" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;