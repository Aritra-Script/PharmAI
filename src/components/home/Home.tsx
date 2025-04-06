import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Beaker, Brain, Microscope, Database, FlaskRound as Flask, Dna, ArrowRight, Atom } from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'AI-Powered Drug Discovery',
    description: 'Leverage advanced machine learning models to accelerate the identification of potential drug candidates.',
  },
  {
    icon: Microscope,
    title: 'Molecular Analysis',
    description: 'Advanced analysis of molecular structures and properties using state-of-the-art computational methods.',
  },
  {
    icon: Database,
    title: 'Data-Driven Insights',
    description: 'Transform complex biological data into actionable insights for drug development.',
  },
  {
    icon: Flask,
    title: 'Virtual Screening',
    description: 'Screen millions of compounds virtually to identify promising drug candidates.',
  },
  {
    icon: Dna,
    title: 'Structure Optimization',
    description: 'Optimize molecular structures for improved drug-like properties and efficacy.',
  },
  {
    icon: Atom,
    title: '3D Molecular Analysis',
    description: '3D Rendering of molecule in real-time with chemical and physical properties, suitable for redesigning compounds.',
  },
];

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Beaker className="w-12 h-12 text-primary" />
              <h1 className="text-4xl font-bold text-primary glow-text">Pharm.AI</h1>
            </div>
            <h2 className="text-5xl font-bold leading-tight">
              Accelerating Drug Discovery<br />with Artificial Intelligence
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-foreground/80">
              Transform your drug discovery process with our cutting-edge AI platform. 
              Discover potential drug candidates faster and more efficiently than ever before.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Link
                to="/register"
                className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors inline-flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 rounded-lg border border-primary/50 text-foreground font-medium hover:bg-primary/10 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 -z-10 animated-gradient opacity-10"></div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glassmorphism p-8 md:p-12 text-center space-y-8"
          >
            <h2 className="text-3xl font-bold">Our Vision</h2>
            <p className="text-lg max-w-4xl mx-auto text-foreground/80">
              We envision a future where drug discovery is revolutionized through the power of artificial intelligence. 
              Our mission is to accelerate the development of life-saving medications by combining cutting-edge AI technology 
              with deep pharmaceutical expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-foreground/80">
              Comprehensive AI solutions for modern drug discovery
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05, // Slightly enlarges on hover
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Adds a shadow effect
                }}
                className="glassmorphism p-6 space-y-4 transition-transform duration-150 ease-in-out cursor-pointer hover:bg-primary/10"
              >
                <service.icon className="w-10 h-10 text-primary transition-colors duration-150 group-hover:text-primary/80" />
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-foreground/80">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
