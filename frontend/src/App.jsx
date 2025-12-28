import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import IncidentFeed from "./pages/IncidentFeed";
import ReportIncident from "./pages/ReportIncident";

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <BrowserRouter>
      <nav style={{ padding: 10 }}>
        <Link to="/">Feed</Link> |{" "}
        <Link to="/report">Report</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <IncidentFeed onSelectLocation={setSelectedLocation} />
          }
        />
        <Route
          path="/report"
          element={
            <ReportIncident selectedLocation={selectedLocation} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
