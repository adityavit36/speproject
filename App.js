import './App.css';
import PredictiveAnalysisForm from './PredictiveAnalysisForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PredictiveAnalysis from './templates/PredictiveAnalysis'; // Adjust the path to reflect the new location
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<PredictiveAnalysisForm />} />
      <Route path="/predictive-analysis" element={<PredictiveAnalysis />} />
    </Routes>
  </Router>

    
  );
}

export default App;
