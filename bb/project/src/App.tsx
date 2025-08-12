import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui/ToastProvider';
import { HomePage } from './pages/HomePage';
import { OrganizationRegistration } from './pages/OrganizationRegistration';
import { OrganizationQuestionnaire } from './pages/OrganizationQuestionnaire';
import { OrganizationCertificate } from './pages/OrganizationCertificate';
import { EmployeeQuestionnaire } from './pages/EmployeeQuestionnaire';
import { EmployeeCertificate } from './pages/EmployeeCertificate';
import { PledgeWall } from './pages/PledgeWall';
import Login from './pages/Login';


function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/organization" element={<OrganizationRegistration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/organization/questionnaire" element={<OrganizationQuestionnaire />} />
            <Route path="/organization/certificate" element={<OrganizationCertificate />} />
            <Route path="/employee" element={<EmployeeQuestionnaire />} />
            <Route path="/employee/certificate" element={<EmployeeCertificate />} />
            <Route path="/pledge-wall" element={<PledgeWall />} />
          </Routes>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;