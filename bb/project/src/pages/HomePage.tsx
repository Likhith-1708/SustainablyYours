import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Play, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { scrollRevealVariants, staggerContainer } from '../utils/animations';

export const HomePage: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<'organization' | 'employee' | null>(null);
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);

  const organizations = [
    'Tech Corp International',
    'Green Energy Solutions',
    'Sustainable Manufacturing Co.',
    'EcoLogistics Ltd.',
    'CleanTech Innovations'
  ];

  const handleCardClick = (path: 'organization' | 'employee') => {
    if (path === 'employee') {
      setShowOrgDropdown(true);
    } else {
      window.location.href = '/organization';
    }
    setSelectedPath(path);
  };

  const handleOrgSelection = (orgName: string) => {
    if (orgName === 'not-found') {
      setShowOrgDropdown(false);
      setSelectedPath(null);
    } else {
      window.location.href = `/employee?org=${encodeURIComponent(orgName)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header currentPage="/" />

      <main>
        {/* HERO: left intro + right dashboard card */}
        <section className="px-6 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left column */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8"
            >
              <motion.h1
                variants={scrollRevealVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight"
              >
                Lead with<span className="text-emerald-500"> Purpose. </span>Grow with <span className="text-emerald-500">Impact</span>
              </motion.h1>

              <motion.p
                variants={scrollRevealVariants}
                className="text-lg text-slate-600 max-w-2xl"
              >
                Take measurable climate action and strengthen your brand reputation.
                Join a trusted network of businesses committed to a sustainable future.
              </motion.p>

              <div className="flex items-center space-x-4">
                <Button
                  as="button"
                  onClick={() => {
                    document.getElementById("organization-section").scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                >
  Start Your Journey →
</Button>
              </div>

              {/* <div className="text-sm text-slate-500">2,500+ organizations trust us</div> */}
            </motion.div>

            {/* Right column: Live Impact Dashboard card */}
            <motion.div
              variants={scrollRevealVariants}
              className="lg:col-span-5"
            >
              <Card className="p-6 shadow-lg">
                <div className="ml-4 hidden md:block">
                  <img
                    src="https://cdn.pixabay.com/photo/2024/02/24/10/48/solar-panels-8593759_1280.png"
                    alt="dashboard"
                    className="rounded-md opacity-80 max-w-full h-auto"
                  />
                </div>


              </Card>
            </motion.div>
          </div>
        </section>

        {/* Key stats bar */}
        <section className="bg-emerald-50">
  <div className="max-w-6xl mx-auto px-6 py-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
      
      {/* Card 1 */}
      <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-100">
        <div className="text-2xl md:text-3xl font-bold text-emerald-600">2,500+</div>
        <div className="text-sm text-slate-600">Organizations</div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-100">
        <div className="text-2xl md:text-3xl font-bold text-slate-800">42%</div>
        <div className="text-sm text-slate-600">Climate Score Boost in 1 Year</div>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-100">
        <div className="text-2xl md:text-3xl font-bold text-slate-800">160+</div>
        <div className="text-sm text-slate-600">Industries</div>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-100">
        <div className="text-2xl md:text-3xl font-bold text-slate-800">100%</div>
        <div className="text-sm text-slate-600">Certified Climate Commitments</div>
      </div>
    </div>

    <div className="mt-8 text-center text-sm text-slate-600 max-w-4xl mx-auto">
      We provide a trusted, easy-to-use platform where organizations can pledge climate commitments
      tailored to their industry, receive a sustainability score, and showcase their dedication
      through an official certificate. Companies making financial contributions are also featured
      on our Pledge Wall, joining a visible network of climate leaders.
    </div>
  </div>
</section>


        {/* Three benefits with blue card */}
        <section className="px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <Card className="p-6 bg-sky-50 border-0">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl font-semibold text-slate-800">01</div>
                  <h4 className="font-semibold text-slate-900 mt-2">Pledge with Purpose</h4>
                  <p className="text-slate-600 mt-2">Select commitments aligned to your industry and sustainability goals.</p>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-slate-800">02</div>
                  <h4 className="font-semibold text-slate-900 mt-2">Earn Your Score & Certificate</h4>
                  <p className="text-slate-600 mt-2">Get recognized with an official score and certificate reflecting your pledges.</p>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-slate-800">03</div>
                  <h4 className="font-semibold text-slate-900 mt-2">Get Featured as a Leader</h4>
                  <p className="text-slate-600 mt-2">Top companies and industries shine on our leaderboards, inspiring others to join.</p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button as="a" href="/about" className="bg-amber-400 hover:bg-amber-500 text-slate-900">Find out more</Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Why commit (icon grid) */}
        <section className="px-6 py-12 bg-white">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-slate-900 mb-8">Why commit?</h2>

    <div className="grid md:grid-cols-3 gap-8 text-left">
      {/* Card 1 */}
      <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow space-y-3 border border-slate-100">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-xl">
          ♦
        </div>
        <h4 className="font-semibold text-lg">Showcase Your Climate Leadership</h4>
        <p className="text-slate-600 text-sm">
          Pledge meaningful climate commitments tailored to your industry and gain recognition
          through our official certificate and public pledge wall.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow space-y-3 border border-slate-100">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-xl">
          ⚙
        </div>
        <h4 className="font-semibold text-lg">Stand Out in Your Industry</h4>
        <p className="text-slate-600 text-sm">
          Climb the leaderboard as one of the top-performing companies in your sector and inspire
          others to follow your example.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow space-y-3 border border-slate-100">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-xl">
          🏆
        </div>
        <h4 className="font-semibold text-lg">Join a Community of Changemakers</h4>
        <p className="text-slate-600 text-sm">
          Be part of a growing network of organizations taking measurable climate action and sharing
          best practices.
        </p>
      </div>
    </div>
  </div>
</section>


        {/* SME Hub info */}
        <section className="px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <Card className="p-6 bg-emerald-50">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h3 className="font-semibold text-slate-900">About Sustainably Yours®</h3>
                  <p className="text-slate-600 text-sm mt-2 max-w-2xl text-justify">
                    Sustainably Yours is a trusted digital platform that helps organizations make industry-specific climate commitments, earn a sustainability score, and receive a certificate for their efforts.
                    We showcase climate leaders through an industry leaderboard and public pledge wall, turning pledges into visible credentials for customers, employees, investors, and partners.
                    Every commitment counts, together, we can create a more sustainable future.
                  </p>
                </div>
                <div>
                  <Button as="a" href="/sme" className="bg-emerald-600 text-white">Get to know about Sustainably Yours®</Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Choose Your Path to Impact (cards) */}
        <section id="organization-section">
  {/* target content */}
</section>
        <section className="px-6 py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Choose Your Path to Impact</h2>
            <p className="text-slate-600 mb-8">Select how you'd like to participate in the Climate Pledge</p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card
                clickable
                // onClick={() => handleCardClick('organization')}
                className="p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900">Organization</h3>
                  <p className="text-slate-600">Register your organization and commit to comprehensive climate action.</p>
                  <div className="mt-4">
                    <a href="/login" className="text-emerald-600 font-medium inline-flex items-center">
                      Get Started<ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Card>

              <Card
                clickable
                onClick={() => handleCardClick('employee')}
                className="p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-800" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900">Employee</h3>
                  <p className="text-slate-600">Join as an individual employee and make your personal commitment to climate action.</p>
                  <div className="mt-4">
                    <button className="text-blue-800 font-medium inline-flex items-center" onClick={() => handleCardClick('employee')}>
                      Get Started<ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Organization Dropdown */}
            {showOrgDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 max-w-md mx-auto"
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Your Organization</h3>
                  <div className="space-y-3">
                    {organizations.map((org, index) => (
                      <motion.button
                        key={org}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleOrgSelection(org)}
                        className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all"
                      >
                        {org}
                      </motion.button>
                    ))}
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: organizations.length * 0.05 }}
                      onClick={() => handleOrgSelection('not-found')}
                      className="w-full text-left p-3 rounded-lg border-2 border-dashed border-slate-300 hover:border-amber-400 hover:bg-amber-50 transition-all text-slate-600"
                    >
                      My organization is not listed
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </section>

        {/* Industry leaderboard teaser */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">Influence the industry leaderboard</h3>
            <div className="space-y-3">
              {[
                { rank: '1st', q: "Renewable Energy & Clean Tech", sign: 72 },
                { rank: '2nd', q: "Manufacturing & Engineering", sign: 54 },
                { rank: '3rd', q: "Transport & Logistics", sign: 33 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white border shadow-sm rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-sm font-semibold">{item.rank}</div>
                    <div className="text-sm text-slate-700">{item.q}</div>
                  </div>
                  <div className="text-sm text-slate-500">{item.sign} Committed Companies</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stories cards */}
        <section className="px-6 py-12 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">Get inspired by their stories</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Vianova', sector: 'Transportation', img: 'https://images.pexels.com/photos/3757946/pexels-photo-3757946.jpeg?auto=compress&cs=tinysrgb&w=800' },
                { title: 'Clif Family Winery & Farm', sector: 'Wine and food', img: 'https://images.pexels.com/photos/358482/pexels-photo-358482.jpeg?auto=compress&cs=tinysrgb&w=800' },
                { title: 'Talis Capital', sector: 'Venture capital fund', img: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800' },
              ].map((s) => (
                <Card key={s.title} className="p-4">
                  <img src={s.img} alt={s.title} className="w-full h-40 object-cover rounded-md" />
                  <div className="mt-4">
                    <h4 className="font-semibold text-slate-900">{s.title}</h4>
                    <div className="text-xs text-slate-500 mb-2">{s.sector}</div>
                    <p className="text-sm text-slate-600">“Our work supports low-carbon mobility solutions that help remove little cars out of the equation in cities.”</p>
                    <a href="#" className="text-emerald-600 text-sm inline-flex items-center mt-3">Read their story →</a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
