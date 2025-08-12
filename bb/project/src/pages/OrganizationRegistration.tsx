import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { FormField } from '../components/ui/FormField';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { scrollRevealVariants } from '../utils/animations';
import type { PersonalInfo, CompanyInfo } from '../types';

interface FormErrors {
  [key: string]: string;
}

export const OrganizationRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
  });
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: '',
    employees: '',
    country: '',
    address: '',
    postalCode: '',
    sector: '',
    website: '',
    identifier: '',
    netZeroTarget: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const totalSteps = 2;
  const progress = (currentStep / totalSteps) * 100;

  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'IN', label: 'India' },
    { value: 'AU', label: 'Australia' },
    { value: 'JP', label: 'Japan' },
  ];

  const sectors = [
    { value: 'technology', label: 'Technology' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'retail', label: 'Retail' },
    { value: 'energy', label: 'Energy' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'other', label: 'Other' },
  ];

  const employeeRanges = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!personalInfo.firstName) newErrors.firstName = 'First name is required';
      if (!personalInfo.lastName) newErrors.lastName = 'Last name is required';
      if (!personalInfo.role) newErrors.role = 'Role is required';
      if (!personalInfo.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    if (step === 2) {
      if (!companyInfo.name) newErrors.companyName = 'Company name is required';
      if (!companyInfo.employees) newErrors.employees = 'Employee count is required';
      if (!companyInfo.country) newErrors.country = 'Country is required';
      if (!companyInfo.address) newErrors.address = 'Address is required';
      if (!companyInfo.sector) newErrors.sector = 'Sector is required';
      if (!companyInfo.netZeroTarget) newErrors.netZeroTarget = 'Net zero target date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to questionnaire
    window.location.href = '/organization/questionnaire';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Personal Information
              </h2>
              <p className="text-slate-600">
                Tell us about yourself and your role
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="First Name"
                required
                htmlFor="firstName"
                error={errors.firstName}
              >
                <Input
                  id="firstName"
                  type="text"
                  value={personalInfo.firstName}
                  onChange={(e) => setPersonalInfo({
                    ...personalInfo,
                    firstName: e.target.value
                  })}
                  error={!!errors.firstName}
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                />
              </FormField>

              <FormField
                label="Last Name"
                required
                htmlFor="lastName"
                error={errors.lastName}
              >
                <Input
                  id="lastName"
                  type="text"
                  value={personalInfo.lastName}
                  onChange={(e) => setPersonalInfo({
                    ...personalInfo,
                    lastName: e.target.value
                  })}
                  error={!!errors.lastName}
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                />
              </FormField>
            </div>

            <FormField
              label="Role/Title"
              required
              htmlFor="role"
              error={errors.role}
            >
              <Input
                id="role"
                type="text"
                value={personalInfo.role}
                onChange={(e) => setPersonalInfo({
                  ...personalInfo,
                  role: e.target.value
                })}
                error={!!errors.role}
                placeholder="e.g., Sustainability Director, CEO, Environmental Manager"
                aria-describedby={errors.role ? 'role-error' : undefined}
              />
            </FormField>

            <FormField
              label="Email Address"
              required
              htmlFor="email"
              error={errors.email}
            >
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({
                  ...personalInfo,
                  email: e.target.value
                })}
                error={!!errors.email}
                placeholder="your.email@company.com"
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </FormField>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Company Information
              </h2>
              <p className="text-slate-600">
                Provide details about your organization
              </p>
            </div>

            <FormField
              label="Company Name"
              required
              htmlFor="companyName"
              error={errors.companyName}
            >
              <Input
                id="companyName"
                type="text"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo({
                  ...companyInfo,
                  name: e.target.value
                })}
                error={!!errors.companyName}
                aria-describedby={errors.companyName ? 'companyName-error' : undefined}
              />
            </FormField>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Number of Employees"
                required
                htmlFor="employees"
                error={errors.employees}
              >
                <Select
                  id="employees"
                  value={companyInfo.employees}
                  onChange={(e) => setCompanyInfo({
                    ...companyInfo,
                    employees: e.target.value
                  })}
                  options={employeeRanges}
                  placeholder="Select employee count"
                  error={!!errors.employees}
                  aria-describedby={errors.employees ? 'employees-error' : undefined}
                />
              </FormField>

              <FormField
                label="Country"
                required
                htmlFor="country"
                error={errors.country}
              >
                <Select
                  id="country"
                  value={companyInfo.country}
                  onChange={(e) => setCompanyInfo({
                    ...companyInfo,
                    country: e.target.value
                  })}
                  options={countries}
                  placeholder="Select country"
                  error={!!errors.country}
                  aria-describedby={errors.country ? 'country-error' : undefined}
                />
              </FormField>
            </div>

            <FormField
              label="Address"
              required
              htmlFor="address"
              error={errors.address}
            >
              <Input
                id="address"
                type="text"
                value={companyInfo.address}
                onChange={(e) => setCompanyInfo({
                  ...companyInfo,
                  address: e.target.value
                })}
                error={!!errors.address}
                placeholder="Company headquarters address"
                aria-describedby={errors.address ? 'address-error' : undefined}
              />
            </FormField>

            <div className="grid md:grid-cols-3 gap-6">
              <FormField
                label="Postal Code"
                htmlFor="postalCode"
              >
                <Input
                  id="postalCode"
                  type="text"
                  value={companyInfo.postalCode}
                  onChange={(e) => setCompanyInfo({
                    ...companyInfo,
                    postalCode: e.target.value
                  })}
                />
              </FormField>

              <FormField
                label="Industry Sector"
                required
                htmlFor="sector"
                error={errors.sector}
              >
                <Select
                  id="sector"
                  value={companyInfo.sector}
                  onChange={(e) => setCompanyInfo({
                    ...companyInfo,
                    sector: e.target.value
                  })}
                  options={sectors}
                  placeholder="Select sector"
                  error={!!errors.sector}
                  aria-describedby={errors.sector ? 'sector-error' : undefined}
                />
              </FormField>

              <FormField
                label="Net Zero Target Year"
                required
                htmlFor="netZeroTarget"
                error={errors.netZeroTarget}
              >
                <Input
                  id="netZeroTarget"
                  type="number"
                  min="2025"
                  max="2050"
                  value={companyInfo.netZeroTarget}
                  onChange={(e) => setCompanyInfo({
                    ...companyInfo,
                    netZeroTarget: e.target.value
                  })}
                  error={!!errors.netZeroTarget}
                  placeholder="2030"
                  aria-describedby={errors.netZeroTarget ? 'netZeroTarget-error' : undefined}
                />
              </FormField>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Website/Social Link"
                htmlFor="website"
              >
                <Input
                  id="website"
                  type="url"
                  value={companyInfo.website}
                  onChange={(e) => setCompanyInfo({
                    ...companyInfo,
                    website: e.target.value
                  })}
                  placeholder="https://www.company.com"
                />
              </FormField>

              <FormField
                label="Company Identifier"
                htmlFor="identifier"
              >
                <Input
                  id="identifier"
                  type="text"
                  value={companyInfo.identifier}
                  onChange={(e) => setCompanyInfo({
                    ...companyInfo,
                    identifier: e.target.value
                  })}
                  placeholder="Tax ID, Registration Number, etc."
                />
              </FormField>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header currentPage="/organization" />
      
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scrollRevealVariants}
          >
            {/* Progress Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-slate-900">
                  Organization Registration
                </h1>
                <span className="text-sm text-slate-600">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
              <ProgressBar progress={progress} />
            </div>

            <Card className="p-8">
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <Button
                  variant="primary"
                  onClick={handleNext}
                  loading={loading}
                  className="flex items-center"
                >
                  {currentStep === totalSteps ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Complete Registration
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};