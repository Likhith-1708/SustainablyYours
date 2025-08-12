import React from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Share2, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { scrollRevealVariants } from '../utils/animations';

export const EmployeeCertificate: React.FC = () => {
  // Mock data - would come from API
  const certificateData = {
    employeeName: 'John Doe',
    organizationName: 'Tech Corp International',
    completionDate: new Date().toLocaleDateString(),
    score: 78,
    maxScore: 100,
    certificateId: 'CE-2024-015632',
    role: 'Software Engineer',
    department: 'Engineering',
  };

  const badgeVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scrollRevealVariants}
            className="space-y-8"
          >
            {/* Success Header */}
            <div className="space-y-4">
              <motion.div
                variants={badgeVariants}
                className="inline-flex items-center justify-center w-24 h-24 bg-blue-800 rounded-full"
              >
                <Users className="h-12 w-12 text-white" />
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                Well Done!
              </h1>
              
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                You have successfully completed your individual Climate Pledge
                and earned your personal commitment certificate.
              </p>
            </div>

            {/* Certificate Card */}
            <Card className="p-8 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Individual Climate Pledge Certificate
                    </h2>
                    <p className="text-slate-600">
                      Certificate ID: {certificateData.certificateId}
                    </p>
                  </div>
                </div>

                <div className="border-t border-blue-200 pt-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {certificateData.employeeName}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {certificateData.role} • {certificateData.department}
                  </p>
                  <p className="text-blue-800 font-medium mb-6">
                    {certificateData.organizationName}
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">
                        <AnimatedCounter from={0} to={certificateData.score} />
                        <span className="text-lg">/{certificateData.maxScore}</span>
                      </div>
                      <p className="text-slate-600 text-sm">Engagement Score</p>
                    </div>
                    
                    <div>
                      <div className="text-3xl font-bold text-emerald-500">
                        {Math.round((certificateData.score / certificateData.maxScore) * 100)}%
                      </div>
                      <p className="text-slate-600 text-sm">Climate Awareness</p>
                    </div>
                    
                    <div>
                      <div className="text-3xl font-bold text-amber-500">
                        Silver
                      </div>
                      <p className="text-slate-600 text-sm">Commitment Level</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-blue-200 pt-6">
                  <p className="text-sm text-slate-600 italic">
                    This certifies that the above individual has completed the Climate Pledge
                    assessment on {certificateData.completionDate} and demonstrated personal
                    commitment to climate action and environmental responsibility.
                  </p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                className="flex items-center"
                onClick={() => window.print()}
              >
                <Download className="h-5 w-5 mr-2" />
                Download Certificate
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                className="flex items-center"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Individual Climate Pledge Certificate',
                      text: `I've made my personal commitment to climate action at ${certificateData.organizationName}!`,
                      url: window.location.href,
                    });
                  }
                }}
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share Achievement
              </Button>
            </div>

            {/* Next Steps */}
            <Card className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-emerald-200">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  Your Climate Journey Continues
                </h2>
                <p className="text-slate-700 max-w-2xl mx-auto">
                  Thank you for making your personal commitment! Consider encouraging 
                  your colleagues to join the pledge and explore ways to amplify 
                  your organization's climate impact.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  <Button
                    variant="secondary"
                    onClick={() => window.location.href = '/pledge-wall'}
                  >
                    View Pledge Wall
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={() => window.location.href = '/'}
                  >
                    Invite Colleagues
                  </Button>
                </div>
              </div>
            </Card>

            {/* Impact Stats */}
            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-800 mb-2">
                  <AnimatedCounter from={0} to={15632} suffix="+" />
                </div>
                <p className="text-slate-600">Individual Pledges</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-500 mb-2">
                  <AnimatedCounter from={0} to={1247} suffix="+" />
                </div>
                <p className="text-slate-600">Organizations</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-500 mb-2">
                  <AnimatedCounter from={0} to={89} suffix="%" />
                </div>
                <p className="text-slate-600">Engagement Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};