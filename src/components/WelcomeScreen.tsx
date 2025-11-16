import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, LogIn, Star } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeScreenProps {
  isLoggedIn: boolean;
}

export default function WelcomeScreen({ isLoggedIn }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-[#3d4a6e] to-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Constellation pattern */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Mandala background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
            <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1="100"
                  y1="100"
                  x2={100 + 80 * Math.cos(angle)}
                  y2={100 + 80 * Math.sin(angle)}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-secondary"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <span className="text-white text-xl">AstroKundali</span>
          </div>
          
          {!isLoggedIn && (
            <Link to="/login">
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
          )}
          
          {isLoggedIn && (
            <Link to="/dashboard">
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                My Kundalis
              </Button>
            </Link>
          )}
        </header>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Icon */}
              <motion.div
                className="inline-block mb-6"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-20 h-20 rounded-full bg-secondary/20 backdrop-blur-sm border-2 border-secondary flex items-center justify-center">
                  <Star className="w-10 h-10 text-secondary" fill="currentColor" />
                </div>
              </motion.div>

              <h1 className="text-white mb-4">
                Discover Your Cosmic Blueprint
              </h1>
              
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Generate your personalized Vedic birth chart with accurate planetary positions, 
                dasha timelines, and detailed astrological insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/create" className="w-full sm:w-auto">
                  <Button 
                    className="bg-accent-teal hover:bg-accent-teal/90 text-primary w-full sm:w-auto px-8 py-6"
                    size="lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create New Kundali
                  </Button>
                </Link>
                
                {!isLoggedIn && (
                  <Link to="/login" className="w-full sm:w-auto">
                    <Button 
                      variant="outline"
                      className="bg-white/10 text-white border-white/30 hover:bg-white/20 w-full sm:w-auto px-8 py-6 backdrop-blur-sm"
                      size="lg"
                    >
                      Sign Up Free
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {[
                { title: 'Accurate Charts', desc: 'North, South & East Indian styles' },
                { title: 'Detailed Insights', desc: 'Planets, Nakshatras & Dashas' },
                { title: 'Save & Share', desc: 'Access anytime, download PDF' },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center"
                >
                  <h4 className="text-secondary mb-2">{feature.title}</h4>
                  <p className="text-white/70 text-sm">{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-6 text-center text-white/50 text-sm">
          <p>© 2025 AstroKundali • Your trusted companion for Vedic astrology</p>
        </footer>
      </div>
    </div>
  );
}
