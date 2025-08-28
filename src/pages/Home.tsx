import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Eye, Zap } from 'lucide-react';
import farmerImage from '@/assets/supply-chain-farmer.jpg';
import factoryImage from '@/assets/supply-chain-factory.jpg';
import distributorImage from '@/assets/supply-chain-distributor.jpg';
import retailerImage from '@/assets/supply-chain-retailer.jpg';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: farmerImage,
      title: "Farm to Fork",
      subtitle: "Starting with sustainable farming practices"
    },
    {
      image: factoryImage,
      title: "Processing & Quality",
      subtitle: "Advanced processing with quality control"
    },
    {
      image: distributorImage,
      title: "Smart Distribution",
      subtitle: "Efficient logistics and supply chain management"
    },
    {
      image: retailerImage,
      title: "Consumer Trust",
      subtitle: "Transparent retail and consumer confidence"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-trust/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-secondary/15 to-accent/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-1/4 w-64 h-64 bg-gradient-to-br from-trust/10 to-primary/10 rounded-full blur-2xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Animated Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Image Slider Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>

        {/* Enhanced Dark Overlay with Dynamic Gradient */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(135deg, hsl(210 24% 8% / 0.95), hsl(210 100% 12% / 0.9), hsl(174 62% 25% / 0.85))",
              "linear-gradient(135deg, hsl(174 62% 25% / 0.95), hsl(142 72% 29% / 0.9), hsl(210 24% 8% / 0.85))",
              "linear-gradient(135deg, hsl(142 72% 29% / 0.95), hsl(210 100% 12% / 0.9), hsl(174 62% 25% / 0.85))",
              "linear-gradient(135deg, hsl(210 24% 8% / 0.95), hsl(210 100% 12% / 0.9), hsl(174 62% 25% / 0.85))"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Animated Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-4"
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold tracking-tight"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <span className="bg-gradient-to-r from-primary via-secondary to-trust bg-clip-text text-transparent">
                  Blockchain
                </span>
              </motion.h1>
              
              <motion.h2
                className="text-4xl md:text-6xl font-bold text-foreground"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                Food Supply Chain
              </motion.h2>
              
              <motion.h3
                className="text-3xl md:text-5xl font-bold text-muted-foreground"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                Traceability
              </motion.h3>
            </motion.div>

            {/* Current Slide Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="space-y-2"
              >
                <h4 className="text-2xl md:text-3xl font-semibold text-primary">
                  {slides[currentSlide].title}
                </h4>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  {slides[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="pt-8"
            >
              <Link to="/wallet">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="wallet-button flex items-center space-x-3 text-xl px-12 py-6 mx-auto"
                >
                  <span>Connect Wallet</span>
                  <ArrowRight className="h-6 w-6" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Slide Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex justify-center space-x-3 pt-8"
            >
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-primary scale-125' : 'bg-muted-foreground/40'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </motion.div>
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
            className="w-6 h-10 border-2 border-muted-foreground/60 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-muted-foreground/60 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-card/50 via-background to-muted/30">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { icon: Shield, title: "Secure", desc: "Blockchain-verified data integrity" },
              { icon: Eye, title: "Transparent", desc: "Full supply chain visibility" },
              { icon: Zap, title: "Fast", desc: "Instant product verification" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="blockchain-card bg-card/90 backdrop-blur-sm"
              >
                <feature.icon className="h-10 w-10 text-primary mb-6 mx-auto" />
                <h3 className="font-semibold text-foreground mb-3 text-xl">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;