import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Link, HelpCircle, CheckCircle, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { FormField } from '../components/ui/FormField';
import { FileUpload } from '../components/ui/FileUpload';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { scrollRevealVariants } from '../utils/animations';

interface Question {
  id: string;
  type: 'scored' | 'qualitative';
  section: 'B' | 'D';
  question: string;
  options?: { value: string; label: string; score?: number }[];
  tooltip?: string;
  required: boolean;
  allowFiles?: boolean;
  allowLinks?: boolean;
}

interface Response {
  questionId: string;
  answer: string;
  files?: File[];
  links?: string[];
}

export const OrganizationQuestionnaire: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<'B' | 'D'>('B');
  const [responses, setResponses] = useState<{ [key: string]: Response }>({});
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  // Sample questions - in a real app, these would come from an API
  const questions: Question[] = [
    // Section B - Scored Questions
    {
      id: 'b1',
      type: 'scored',
      section: 'B',
      question: 'Has your organization set science-based targets for greenhouse gas emissions reduction?',
      options: [
        { value: 'yes-verified', label: 'Yes, verified by SBTi', score: 10 },
        { value: 'yes-submitted', label: 'Yes, submitted for verification', score: 8 },
        { value: 'yes-developing', label: 'Yes, currently developing', score: 5 },
        { value: 'planning', label: 'Planning to set targets', score: 2 },
        { value: 'no', label: 'No', score: 0 },
      ],
      tooltip: 'Science-based targets provide a clearly-defined pathway for companies to reduce greenhouse gas emissions.',
      required: true,
      allowFiles: true,
    },
    {
      id: 'b2',
      type: 'scored',
      section: 'B',
      question: 'What percentage of your electricity consumption comes from renewable sources?',
      options: [
        { value: '90-100', label: '90-100%', score: 10 },
        { value: '70-89', label: '70-89%', score: 8 },
        { value: '50-69', label: '50-69%', score: 6 },
        { value: '25-49', label: '25-49%', score: 4 },
        { value: '10-24', label: '10-24%', score: 2 },
        { value: '0-9', label: '0-9%', score: 0 },
      ],
      required: true,
      allowFiles: true,
    },
    // More Section B questions would be added here...
    
    // Section D - Qualitative Questions
    {
      id: 'd1',
      type: 'qualitative',
      section: 'D',
      question: 'Describe your organization\'s climate governance structure and how climate-related decisions are made.',
      tooltip: 'Explain the roles, responsibilities, and processes for climate decision-making in your organization.',
      required: true,
      allowFiles: true,
      allowLinks: true,
    },
    {
      id: 'd2',
      type: 'qualitative',
      section: 'D',
      question: 'What are the key climate-related risks and opportunities your organization has identified?',
      required: true,
      allowFiles: true,
    },
    // More Section D questions would be added here...
  ];

  const sectionBQuestions = questions.filter(q => q.section === 'B');
  const sectionDQuestions = questions.filter(q => q.section === 'D');
  const currentQuestions = currentSection === 'B' ? sectionBQuestions : sectionDQuestions;

  // Calculate completion percentage
  const getCompletionPercentage = () => {
    const totalQuestions = questions.length;
    const completedQuestions = Object.keys(responses).filter(id => {
      const response = responses[id];
      return response && response.answer && response.answer.trim() !== '';
    }).length;
    
    return Math.round((completedQuestions / totalQuestions) * 100);
  };

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setTimeout(() => {
      if (Object.keys(responses).length > 0) {
        handleSave();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSave);
  }, [responses]);

  const handleResponseChange = (questionId: string, answer: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        questionId,
        answer,
      }
    }));
  };

  const handleFileUpload = (questionId: string, files: File[]) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        questionId,
        answer: prev[questionId]?.answer || '',
        files,
      }
    }));
  };

  const handleLinkAdd = (questionId: string, link: string) => {
    if (!link.trim()) return;

    setResponses(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        questionId,
        answer: prev[questionId]?.answer || '',
        links: [...(prev[questionId]?.links || []), link],
      }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    
    // Simulate save API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSavedAt(new Date());
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Simulate submit API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to certificate page
    window.location.href = '/organization/certificate';
  };

  const renderQuestion = (question: Question) => {
    const response = responses[question.id];

    return (
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-start space-x-2">
          <h3 className="text-lg font-medium text-slate-900 flex-1">
            {question.question}
            {question.required && (
              <span className="text-red-500 ml-1" aria-label="required">*</span>
            )}
          </h3>
          {question.tooltip && (
            <div className="relative group">
              <HelpCircle className="h-5 w-5 text-slate-400 cursor-help" />
              <div className="absolute right-0 top-6 w-64 p-3 bg-slate-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                {question.tooltip}
              </div>
            </div>
          )}
        </div>

        {question.type === 'scored' && question.options ? (
          <div className="space-y-2">
            {question.options.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all hover:bg-slate-50 ${
                  response?.answer === option.value
                    ? 'border-emerald-500 bg-emerald-50'
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
                    ? 'border-emerald-500'
                    : 'border-slate-300'
                }`}>
                  {response?.answer === option.value && (
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </div>
                <span className="flex-1">{option.label}</span>
                {option.score !== undefined && (
                  <span className="text-sm text-slate-500 font-medium">
                    {option.score} pts
                  </span>
                )}
              </label>
            ))}
          </div>
        ) : (
          <textarea
            value={response?.answer || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            rows={4}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Please provide a detailed response..."
          />
        )}

        {/* File uploads */}
        {question.allowFiles && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Supporting Documents (Optional)
            </label>
            <FileUpload
              onFilesChange={(files) => handleFileUpload(question.id, files)}
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              maxFiles={3}
            />
          </div>
        )}

        {/* Link inputs */}
        {question.allowLinks && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Reference Links (Optional)
            </label>
            <div className="flex space-x-2">
              <Input
                type="url"
                placeholder="https://example.com"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    handleLinkAdd(question.id, input.value);
                    input.value = '';
                  }
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  handleLinkAdd(question.id, input.value);
                  input.value = '';
                }}
              >
                <Link className="h-4 w-4" />
              </Button>
            </div>
            {response?.links && response.links.length > 0 && (
              <div className="mt-2 space-y-1">
                {response.links.map((link, index) => (
                  <div key={index} className="flex items-center text-sm text-blue-600">
                    <Link className="h-3 w-3 mr-1" />
                    <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header currentPage="/organization" />
      
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
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Climate Assessment Questionnaire
              </h1>
              <p className="text-slate-600 mb-4">
                Complete our comprehensive assessment to receive your climate commitment certificate
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center text-emerald-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {getCompletionPercentage()}% Complete
                </div>
                {savedAt && (
                  <div className="text-slate-500">
                    Last saved: {savedAt.toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>

            {/* Section Tabs */}
            <div className="flex justify-center">
              <div className="bg-slate-100 rounded-lg p-1 flex space-x-1">
                <button
                  onClick={() => setCurrentSection('B')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentSection === 'B'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Section B: Scored Questions (20)
                </button>
                <button
                  onClick={() => setCurrentSection('D')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentSection === 'D'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Section D: Qualitative (6)
                </button>
              </div>
            </div>

            {/* Questions */}
            <Card className="p-8">
              <div className="space-y-8">
                {currentQuestions.map((question, index) => (
                  <div key={question.id}>
                    {renderQuestion(question)}
                    {index < currentQuestions.length - 1 && (
                      <hr className="mt-8 border-slate-200" />
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
                <Button
                  variant="ghost"
                  onClick={handleSave}
                  loading={loading}
                  className="flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Progress
                </Button>

                <div className="space-x-4">
                  {currentSection === 'B' && (
                    <Button
                      variant="secondary"
                      onClick={() => setCurrentSection('D')}
                    >
                      Continue to Section D
                    </Button>
                  )}
                  
                  {currentSection === 'D' && (
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      loading={loading}
                      className="flex items-center"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Submit & Get Certificate
                    </Button>
                  )}
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