import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Eye, Zap } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-trust bg-clip-text text-transparent">
                Blockchain
              </span>
              <br />
              <span className="text-foreground">Food Traceability</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Track every step of your food's journey from farm to table with 
              complete transparency and blockchain-powered verification.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/wallet">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="wallet-button flex items-center space-x-2 text-lg px-8 py-4"
                >
                  <span>Connect Wallet</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
              
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-secondary/10 text-secondary border-2 border-secondary/20 px-8 py-4 rounded-lg font-medium text-lg hover:bg-secondary/20 transition-all duration-300"
                >
                  View Dashboard
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Floating Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { icon: Shield, title: "Secure", desc: "Blockchain-verified data" },
              { icon: Eye, title: "Transparent", desc: "Full supply chain visibility" },
              { icon: Zap, title: "Fast", desc: "Instant product verification" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                whileHover={{ y: -5 }}
                className="blockchain-card bg-card/80 backdrop-blur-sm"
              >
                <feature.icon className="h-8 w-8 text-primary mb-4 mx-auto" />
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;