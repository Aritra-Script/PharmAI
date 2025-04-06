import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { DrugTargetInteraction } from "./molecules/DrugTargetInteraction";
import { ComputationalCompounds } from "./molecules/ComputationalCompounds";
// ... other imports

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/drug-target-interaction" element={<DrugTargetInteraction onFileUpload={function (file: File): void {
            throw new Error("Function not implemented.");
          } } />} />
          <Route path="/computational-compounds" element={<ComputationalCompounds />} />
          {/* ... other routes */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;