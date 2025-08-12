import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Trophy, Search, Filter, Calendar } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { scrollRevealVariants, staggerContainer } from '../utils/animations';
import type { Organization } from '../types';

export const PledgeWall: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');

  // Mock data - would come from API
  const organizations: Organization[] = [
    {
      id: '1',
      name: 'Tech Corp International',
      size: 'large',
      membershipStatus: 'committed',
      commitmentDate: '2024-01-15',
      sector: 'Technology',
      country: 'United States',
      netZeroTarget: '2030',
    },
    {
      id: '2',
      name: 'Green Energy Solutions',
      size: 'medium',
      membershipStatus: 'verified',
      commitmentDate: '2024-01-10',
      sector: 'Energy',
      country: 'Germany',
      netZeroTarget: '2028',
    },
    {
      id: '3',
      name: 'Sustainable Manufacturing Co.',
      size: 'large',
      membershipStatus: 'committed',
      commitmentDate: '2024-01-12',
      sector: 'Manufacturing',
      country: 'Canada',
      netZeroTarget: '2035',
    },
    {
      id: '4',
      name: 'EcoLogistics Ltd.',
      size: 'medium',
      membershipStatus: 'verified',
      commitmentDate: '2024-01-08',
      sector: 'Transportation',
      country: 'United Kingdom',
      netZeroTarget: '2032',
    },
    {
      id: '5',
      name: 'CleanTech Innovations',
      size: 'small',
      membershipStatus: 'committed',
      commitmentDate: '2024-01-14',
      sector: 'Technology',
      country: 'Australia',
      netZeroTarget: '2030',
    },
  ];

  const sectors = [
    { value: '', label: 'All Sectors' },
    { value: 'technology', label: 'Technology' },
    { value: 'energy', label: 'Energy' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'retail', label: 'Retail' },
  ];

  const sizes = [
    { value: '', label: 'All Sizes' },
    { value: 'small', label: 'Small (1-200)' },
    { value: 'medium', label: 'Medium (201-1000)' },
    { value: 'large', label: 'Large (1000+)' },
  ];

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = !sectorFilter || org.sector.toLowerCase() === sectorFilter;
    const matchesSize = !sizeFilter || org.size === sizeFilter;
    
    return matchesSearch && matchesSector && matchesSize;
  });

  const getStatusBadge = (status: Organization['membershipStatus']) => {
    const badges = {
      pending: { label: 'Pending', color: 'bg-amber-100 text-amber-800' },
      verified: { label: 'Verified', color: 'bg-blue-100 text-blue-800' },
      committed: { label: 'Committed', color: 'bg-emerald-100 text-emerald-800' },
    };
    
    const badge = badges[status];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const getSizeIcon = (size: Organization['size']) => {
    switch (size) {
      case 'small':
        return <Building2 className="h-4 w-4 text-slate-400" />;
      case 'medium':
        return <Building2 className="h-5 w-5 text-slate-500" />;
      case 'large':
        return <Building2 className="h-6 w-6 text-slate-600" />;
      default:
        return <Building2 className="h-5 w-5 text-slate-500" />;
    }
  };

  const totalCommitted = organizations.filter(org => org.membershipStatus === 'committed').length;
  const totalVerified = organizations.filter(org => org.membershipStatus === 'verified').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header currentPage="/pledge-wall" />
      
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Hero Section */}
            <motion.div variants={scrollRevealVariants} className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Pledge Wall
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Celebrating organizations and individuals who have committed to achieving 
                net-zero emissions and creating a sustainable future for all.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={scrollRevealVariants}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              <Card className="p-6 text-center">
                <Trophy className="h-8 w-8 text-amber-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  <AnimatedCounter from={0} to={organizations.length} />
                </div>
                <p className="text-slate-600">Total Organizations</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="text-3xl font-bold text-emerald-600 mb-1">
                  <AnimatedCounter from={0} to={totalCommitted} />
                </div>
                <p className="text-slate-600">Committed</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  <AnimatedCounter from={0} to={totalVerified} />
                </div>
                <p className="text-slate-600">Verified</p>
              </Card>

              <Card className="p-6 text-center">
                <Users className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  <AnimatedCounter from={0} to={15632} suffix="+" />
                </div>
                <p className="text-slate-600">Individual Pledges</p>
              </Card>
            </motion.div>

            {/* Filters */}
            <motion.div variants={scrollRevealVariants}>
              <Card className="p-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="Search organizations, sectors, or countries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Select
                      value={sectorFilter}
                      onChange={(e) => setSectorFilter(e.target.value)}
                      options={sectors}
                    />
                    
                    <Select
                      value={sizeFilter}
                      onChange={(e) => setSizeFilter(e.target.value)}
                      options={sizes}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Organizations Grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredOrganizations.map((org, index) => (
                <motion.div
                  key={org.id}
                  variants={scrollRevealVariants}
                  custom={index}
                >
                  <Card
                    clickable
                    className="p-6 h-full hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getSizeIcon(org.size)}
                        <div>
                          <h3 className="font-semibold text-slate-900 text-lg">
                            {org.name}
                          </h3>
                          <p className="text-slate-600 text-sm">{org.country}</p>
                        </div>
                      </div>
                      {getStatusBadge(org.membershipStatus)}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Sector:</span>
                        <span className="font-medium text-slate-900">{org.sector}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Size:</span>
                        <span className="font-medium text-slate-900 capitalize">{org.size}</span>
                      </div>
                      
                      {org.netZeroTarget && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Net Zero Target:</span>
                          <span className="font-medium text-emerald-600">{org.netZeroTarget}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-200">
                        <span className="text-slate-600">Committed:</span>
                        <div className="flex items-center text-slate-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(org.commitmentDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredOrganizations.length === 0 && (
              <motion.div
                variants={scrollRevealVariants}
                className="text-center py-12"
              >
                <div className="text-slate-400 mb-4">
                  <Filter className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  No organizations found
                </h3>
                <p className="text-slate-600">
                  Try adjusting your search terms or filters to see more results.
                </p>
              </motion.div>
            )}

            {/* Call to Action */}
            <motion.div variants={scrollRevealVariants}>
              <Card className="p-8 bg-gradient-to-r from-emerald-500 to-blue-800 text-white text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Ready to Join the Movement?
                </h2>
                <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                  Take the first step towards a sustainable future. Complete our assessment
                  and add your organization to the Climate Pledge Wall.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.a
                    href="/organization"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
                  >
                    Register Organization
                  </motion.a>
                  <motion.a
                    href="/employee"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-800 transition-colors"
                  >
                    Individual Pledge
                  </motion.a>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};