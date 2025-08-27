import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Github, Twitter, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@foodchain.io",
      description: "Send us an email for general inquiries"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Speak directly with our support team"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Blockchain Ave, Tech City",
      description: "Our headquarters location"
    }
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-foreground' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-primary' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-secondary' }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Touch
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about blockchain food traceability? We're here to help you 
            transform your supply chain with cutting-edge technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="blockchain-card">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Send us a message
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsSubmitted(false)}
                    className="wallet-button"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="demo">Request Demo</option>
                      <option value="pricing">Pricing Information</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-vertical"
                      placeholder="Tell us more about your needs..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full wallet-button disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground" />
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>

                  <p className="text-sm text-muted-foreground">
                    * Required fields. We respect your privacy and will never share your information.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={contact.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="blockchain-card"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                        <contact.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {contact.title}
                        </h3>
                        <p className="text-lg text-foreground mb-1">
                          {contact.details}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {contact.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="blockchain-card"
            >
              <h3 className="font-semibold text-foreground mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-muted-foreground ${color} transition-all duration-300`}
                    aria-label={label}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Office Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="blockchain-card bg-gradient-to-br from-secondary/5 to-trust/5"
            >
              <h3 className="font-semibold text-foreground mb-4">
                Office Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="text-foreground">9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="text-foreground">10:00 AM - 4:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="text-foreground">Closed</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  For urgent technical issues, our 24/7 support system is available through the dashboard.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;