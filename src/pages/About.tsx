import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Factory, Store, User, Leaf, Shield, AlertTriangle } from 'lucide-react';

const About: React.FC = () => {
  const timelineSteps = [
    {
      icon: Leaf,
      title: "Farm",
      description: "Organic farming with sustainable practices",
      color: "text-secondary"
    },
    {
      icon: Factory,
      title: "Processing",
      description: "Quality control and food safety measures",
      color: "text-trust"
    },
    {
      icon: Truck,
      title: "Distribution",
      description: "Temperature-controlled logistics",
      color: "text-accent"
    },
    {
      icon: Store,
      title: "Retail",
      description: "Fresh products reach store shelves",
      color: "text-primary"
    },
    {
      icon: User,
      title: "Consumer",
      description: "Complete transparency and traceability",
      color: "text-secondary"
    }
  ];

  const problems = [
    {
      icon: AlertTriangle,
      title: "Food Safety Scandals",
      description: "Contaminated products cause widespread health issues"
    },
    {
      icon: Shield,
      title: "Lack of Transparency",
      description: "Consumers can't verify product origins or handling"
    },
    {
      icon: Truck,
      title: "Inefficient Recalls",
      description: "Takes weeks to trace and remove contaminated products"
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
              Revolutionizing Food
              <span className="bg-gradient-to-r from-secondary to-trust bg-clip-text text-transparent">
                {" "}Supply Chains
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our blockchain-powered solution brings complete transparency to the food industry, 
              enabling consumers to trace their food from farm to table while helping businesses 
              build trust and ensure safety.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
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
              The Problems We Solve
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Traditional food supply chains lack transparency, leading to safety concerns and consumer distrust.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="blockchain-card text-center"
              >
                <div className="mb-6 p-4 bg-destructive/10 rounded-full w-fit mx-auto">
                  <problem.icon className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supply Chain Timeline */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Supply Chain Visibility
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track every step of your food's journey with blockchain-verified transparency
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-trust via-accent to-primary transform -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="timeline-item mb-6 mx-auto w-fit">
                    <div className="p-4 bg-background rounded-full shadow-lg border-4 border-background">
                      <step.icon className={`h-8 w-8 ${step.color}`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Blockchain-Powered
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {" "}Transparency
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our platform uses immutable blockchain technology to record every step 
                of the food supply chain. From the moment a product is harvested until 
                it reaches your table, every transaction is verified and permanently recorded.
              </p>
              <div className="space-y-4">
                {[
                  "Immutable record keeping",
                  "Real-time tracking updates",
                  "Smart contract automation",
                  "Multi-stakeholder verification"
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="blockchain-card p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Benefits for Everyone
                  </h3>
                </div>
                <div className="space-y-6">
                  {[
                    { label: "Consumer Trust", value: "95%", color: "bg-secondary" },
                    { label: "Recall Efficiency", value: "75%", color: "bg-trust" },
                    { label: "Supply Chain Visibility", value: "100%", color: "bg-primary" }
                  ].map((stat, index) => (
                    <div key={stat.label}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                        <span className="text-sm font-medium text-foreground">{stat.value}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: stat.value }}
                          transition={{ duration: 1, delay: index * 0.3 }}
                          viewport={{ once: true }}
                          className={`h-full ${stat.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;