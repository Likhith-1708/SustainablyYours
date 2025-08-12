import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { FormField } from '../components/ui/FormField';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { scrollRevealVariants } from '../utils/animations';

interface EmployeeResponse {
  questionId: string;
  answer: string | number;
}

interface Demographics {
  department: string;
  role: string;
  experience: string;
  location: string;
}

export const EmployeeQuestionnaire: React.FC = () => {
  const [responses, setResponses] = useState<{ [key: string]: EmployeeResponse }>({});
  const [demographics, setDemographics] = useState<Demographics>({
    department: '',
    role: '',
    experience: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);

  // Get organization from URL params (in a real app)
  const organizationName = 'Tech Corp International';

  // Sample Section C questions (15 scored)
  const questions = [
    {
      id: 'c1',
      question: 'How aware are you of your organization\'s climate commitments and sustainability goals?',
      options: [
        { value: 'very-aware', label: 'Very aware - I can discuss them in detail', score: 10 },
        { value: 'somewhat-aware', label: 'Somewhat aware - I know the basics', score: 7 },
        { value: 'slightly-aware', label: 'Slightly aware - I\'ve heard about them', score: 4 },
        { value: 'not-aware', label: 'Not aware at all', score: 0 },
      ],
    },
    {
      id: 'c2',
      question: 'How often do you consider environmental impact in your daily work decisions?',
      options: [
        { value: 'always', label: 'Always - it\'s part of my decision-making process', score: 10 },
        { value: 'often', label: 'Often - I consider it for major decisions', score: 8 },
        { value: 'sometimes', label: 'Sometimes - when it\'s relevant', score: 5 },
        { value: 'rarely', label: 'Rarely - only when required', score: 2 },
        { value: 'never', label: 'Never', score: 0 },
      ],
    },
    {
      id: 'c3',
      question: 'Have you participated in any sustainability training or initiatives at work?',
      options: [
        { value: 'multiple', label: 'Yes, multiple programs', score: 10 },
        { value: 'some', label: 'Yes, some training', score: 7 },
        { value: 'one', label: 'Yes, one program', score: 4 },
        { value: 'none', label: 'No, but I\'m interested', score: 2 },
        { value: 'none-not-interested', label: 'No, and not interested', score: 0 },
      ],
    },
    // More questions would be added here for the full 15...
  ];

  const departments = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' },
    { value: 'sustainability', label: 'Sustainability' },
    { value: 'other', label: 'Other' },
  ];

  const experienceRanges = [
    { value: '0-2', label: '0-2 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '6-10', label: '6-10 years' },
    { value: '11-15', label: '11-15 years' },
    { value: '15+', label: '15+ years' },
  ];

  const handleResponseChange = (questionId: string, answer: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: {
        questionId,
        answer,
      }
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to individual certificate page
    window.location.href = '/employee/certificate';
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;

    questions.forEach(question => {
      const response = responses[question.id];
      if (response) {
        const selectedOption = question.options.find(opt => opt.value === response.answer);
        if (selectedOption) {
          totalScore += selectedOption.score;
        }
      }
      maxScore += Math.max(...question.options.map(opt => opt.score));
    });

    return { totalScore, maxScore };
  };

  const { totalScore, maxScore } = calculateScore();
  const completionPercentage = Math.round((Object.keys(responses).length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header currentPage="/employee" />
      
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scrollRevealVariants}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                <Users className="h-4 w-4 mr-2" />
                Employee Pledge
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Individual Climate Commitment
              </h1>
              <p className="text-slate-600 mb-2">
                Representing: <span className="font-semibold text-blue-800">{organizationName}</span>
              </p>
              <p className="text-slate-500 text-sm">
                {completionPercentage}% Complete • {Object.keys(responses).length} of {questions.length} questions answered
              </p>
            </div>

            {/* Back Navigation */}
            <div className="flex">
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Organization Selection
              </Button>
            </div>

            {/* Demographics Section */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                About You (Optional)
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="Department" htmlFor="department">
                  <Select
                    id="department"
                    value={demographics.department}
                    onChange={(e) => setDemographics({
                      ...demographics,
                      department: e.target.value
                    })}
                    options={departments}
                    placeholder="Select department"
                  />
                </FormField>

                <FormField label="Role/Title" htmlFor="role">
                  <Input
                    id="role"
                    value={demographics.role}
                    onChange={(e) => setDemographics({
                      ...demographics,
                      role: e.target.value
                    })}
                    placeholder="Software Engineer, Marketing Manager, etc."
                  />
                </FormField>

                <FormField label="Years of Experience" htmlFor="experience">
                  <Select
                    id="experience"
                    value={demographics.experience}
                    onChange={(e) => setDemographics({
                      ...demographics,
                      experience: e.target.value
                    })}
                    options={experienceRanges}
                    placeholder="Select experience range"
                  />
                </FormField>

                <FormField label="Work Location" htmlFor="location">
                  <Input
                    id="location"
                    value={demographics.location}
                    onChange={(e) => setDemographics({
                      ...demographics,
                      location: e.target.value
                    })}
                    placeholder="City, Country or Remote"
                  />
                </FormField>
              </div>
            </Card>

            {/* Questions Section */}
            <Card className="p-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    Section C: Individual Climate Engagement
                  </h2>
                  <p className="text-slate-600">
                    Help us understand your personal engagement with climate action and sustainability.
                  </p>
                </div>

                {questions.map((question, index) => {
                  const response = responses[question.id];
                  
                  return (
                    <div key={question.id}>
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-slate-900">
                          {index + 1}. {question.question}
                        </h3>

                        <div className="space-y-2">
                          {question.options.map((option) => (
                            <label
                              key={option.value}
                              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all hover:bg-slate-50 ${
                                response?.answer === option.value
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-slate-200'
                              }`}
                            >
                              <input
                                type="radio"
                                name={question.id}
                                value={option.value}
                                checked={response?.answer === option.value}
                                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                className="sr-only"
                              />
                              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                                response?.answer === option.value
                                  ? 'border-blue-500'
                                  : 'border-slate-300'
                              }`}>
                                {response?.answer === option.value && (
                                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                                )}
                              </div>
                              <span className="flex-1">{option.label}</span>
                              <span className="text-sm text-slate-500 font-medium">
                                {option.score} pts
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {index < questions.length - 1 && (
                        <hr className="mt-8 border-slate-200" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Progress and Submit */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-slate-600">
                    Progress: {completionPercentage}% complete
                    {totalScore > 0 && (
                      <span className="ml-4">
                        Current Score: <span className="font-semibold text-blue-600">{totalScore}/{maxScore}</span>
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={Object.keys(responses).length === 0}
                    className="flex items-center"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Submit & Get Certificate
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};