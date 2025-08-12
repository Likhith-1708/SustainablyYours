import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Share2, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { scrollRevealVariants } from '../utils/animations';

export const OrganizationCertificate: React.FC = () => {
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [paymentProvider, setPaymentProvider] = useState<'stripe' | 'razorpay'>('stripe');

  // Mock data - would come from API
  const certificateData = {
    organizationName: 'Tech Corp International',
    completionDate: new Date().toLocaleDateString(),
    score: 87,
    maxScore: 100,
    certificateId: 'CC-2024-001247',
  };

  const handleDonation = async () => {
    // In a real app, this would integrate with Stripe/Razorpay
    console.log(`Processing $${selectedAmount} donation via ${paymentProvider}`);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to pledge wall after successful donation
    window.location.href = '/pledge-wall';
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
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
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
                className="inline-flex items-center justify-center w-24 h-24 bg-emerald-500 rounded-full"
              >
                <Award className="h-12 w-12 text-white" />
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                Congratulations!
              </h1>
              
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                You have successfully completed the Climate Pledge assessment and
                earned your organization's commitment certificate.
              </p>
            </div>

            {/* Certificate Card */}
            <Card className="p-8 bg-gradient-to-br from-white to-emerald-50 border-2 border-emerald-200">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Climate Pledge Certificate
                    </h2>
                    <p className="text-slate-600">
                      Certificate ID: {certificateData.certificateId}
                    </p>
                  </div>
                </div>

                <div className="border-t border-emerald-200 pt-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    {certificateData.organizationName}
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-emerald-600">
                        <AnimatedCounter from={0} to={certificateData.score} />
                        <span className="text-lg">/{certificateData.maxScore}</span>
                      </div>
                      <p className="text-slate-600 text-sm">Assessment Score</p>
                    </div>
                    
                    <div>
                      <div className="text-3xl font-bold text-blue-800">
                        {Math.round((certificateData.score / certificateData.maxScore) * 100)}%
                      </div>
                      <p className="text-slate-600 text-sm">Climate Readiness</p>
                    </div>
                    
                    <div>
                      <div className="text-3xl font-bold text-amber-500">
                        Gold
                      </div>
                      <p className="text-slate-600 text-sm">Commitment Level</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-emerald-200 pt-6">
                  <p className="text-sm text-slate-600 italic">
                    This certifies that the above organization has completed the comprehensive
                    Climate Pledge assessment on {certificateData.completionDate} and demonstrated
                    a strong commitment to achieving net-zero emissions by 2050.
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
                      title: 'Climate Pledge Certificate',
                      text: `${certificateData.organizationName} has committed to the Climate Pledge!`,
                      url: window.location.href,
                    });
                  }
                }}
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share Achievement
              </Button>
            </div>

            {/* Donation CTA */}
            <Card className="p-8 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Join the Pledge Wall
                  </h2>
                  <p className="text-slate-700 max-w-2xl mx-auto">
                    Make a donation to support global climate initiatives and showcase
                    your organization's commitment on our public Pledge Wall.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  {[50, 100, 250, 500].map((amount) => (
                    <motion.button
                      key={amount}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedAmount(amount)}
                      className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                        selectedAmount === amount
                          ? 'border-amber-500 bg-amber-500 text-white'
                          : 'border-amber-200 bg-white text-amber-700 hover:border-amber-400'
                      }`}
                    >
                      ${amount}
                    </motion.button>
                  ))}
                </div>

                <Button
                  variant="accent"
                  size="lg"
                  onClick={() => setShowDonationModal(true)}
                  className="mx-auto flex items-center"
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  Donate ${selectedAmount} & Join Pledge Wall
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Donation Modal */}
      <Modal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
        title="Complete Your Donation"
        size="md"
      >
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-slate-600">
              You're about to donate <span className="font-bold text-amber-600">${selectedAmount}</span> to
              support global climate initiatives.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-slate-900">Choose Payment Method</h3>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setPaymentProvider('stripe')}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  paymentProvider === 'stripe'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="font-medium">Stripe</div>
                <div className="text-sm text-slate-600">Card Payment</div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setPaymentProvider('razorpay')}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  paymentProvider === 'razorpay'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="font-medium">Razorpay</div>
                <div className="text-sm text-slate-600">Multiple Options</div>
              </motion.button>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="ghost"
              onClick={() => setShowDonationModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="accent"
              onClick={handleDonation}
              className="flex-1"
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};