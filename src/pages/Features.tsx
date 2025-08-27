import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Shield, Zap, Users, BarChart3, Clock, Globe, CheckCircle } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';

const Features: React.FC = () => {
  const mainFeatures = [
    {
      icon: Eye,
      title: "Real-time Tracking",
      description: "Monitor your food products throughout the entire supply chain journey with live updates and blockchain verification at every step."
    },
    {
      icon: Shield,
      title: "Complete Transparency",
      description: "Access immutable records of every transaction, from farm origins to quality certifications, stored securely on the blockchain."
    },
    {
      icon: Zap,
      title: "Faster Recalls",
      description: "Instantly identify affected products and their exact locations, reducing recall time from weeks to minutes and protecting public health."
    },
    {
      icon: Users,
      title: "Consumer Safety",
      description: "Empower consumers with detailed product information, allergen warnings, and verified safety certifications at their fingertips."
    }
  ];

  const additionalFeatures = [
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into supply chain performance, quality metrics, and consumer engagement patterns."
    },
    {
      icon: Clock,
      title: "Historical Records",
      description: "Complete audit trail with timestamped entries for compliance reporting and quality assurance."
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with suppliers, distributors, and retailers worldwide through our blockchain network."
    },
    {
      icon: CheckCircle,
      title: "Compliance Ready",
      description: "Built-in compliance tools for food safety regulations, organic certifications, and quality standards."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Powerful
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}Features
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover how blockchain technology transforms food traceability with 
              cutting-edge features designed for transparency, safety, and trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Core Capabilities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to ensure food safety and build consumer trust
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={index * 0.2}
                className="lg:p-8"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                See It In
                <span className="bg-gradient-to-r from-trust to-accent bg-clip-text text-transparent">
                  {" "}Action
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Experience the power of blockchain traceability with our interactive 
                demo. Scan QR codes, track products, and see real-time updates as 
                they move through the supply chain.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="wallet-button"
              >
                Try Interactive Demo
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="blockchain-card p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Products Tracked", value: "1M+", icon: "📦" },
                    { label: "Supply Chain Partners", value: "500+", icon: "🤝" },
                    { label: "Countries Covered", value: "25+", icon: "🌍" },
                    { label: "Data Points Daily", value: "10K+", icon: "📊" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="text-3xl mb-2">{stat.icon}</div>
                      <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Advanced Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Additional features that make our platform the complete solution for food traceability
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-trust/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Supply Chain?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Join thousands of businesses already using blockchain technology to 
              ensure food safety and build consumer trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="wallet-button"
              >
                Get Started Today
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-secondary/10 text-secondary border-2 border-secondary/20 px-6 py-3 rounded-lg font-medium hover:bg-secondary/20 transition-all duration-300"
              >
                Schedule Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features;