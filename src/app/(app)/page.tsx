'use client';

import React from 'react';
import { Shield, Brain, Lock, Zap, Send, UserCheck, MessageSquare, Linkedin, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { CodeXml } from 'lucide-react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-700 to-purple-400 text-white"
    >

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 md:px-32 py-16">
        <motion.section
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-purple-100 mb-4">
            Dive into Anonymous Feedback
          </h1>
          <p className="mt-4 text-lg md:text-xl text-purple-200">
            True Feedback - Where your identity remains a secret.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8"
          >
            <Link href="/sign-up">
              <Button className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-full text-lg transition duration-300 ease-in-out transform hover:shadow-lg">
                 Get Started <ChevronRight className="ml-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.section>


        {/* Carousel for Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full max-w-lg md:max-w-xl"
        >
          <Carousel
            plugins={[Autoplay({ delay: 3000 })]}
            className="w-full"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index} className="p-4">
                  <Card className="bg-white border-purple-700 shadow-2xl backdrop-blur-lg text-black p-6 rounded-xl transition-transform duration-300 ">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">{message.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                      <MessageSquare className="flex-shrink-0 text-black" />
                      <div>
                        <p className="text-black">{message.content}</p>
                        <p className="text-xs text-black font-bold mt-2">
                          {message.received}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-black" />
            <CarouselNext className="text-black" />
          </Carousel>
        </motion.div>

        {/* Key Features Section */}
        <section className="py-29 px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Experience the Future of Communication</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Shield className="text-blue-900 w-12 h-12 " />}
              title="100% Anonymous"
              description="Your identity remains completely protected"
            />
            <FeatureCard
              icon={<Brain className="text-blue-900 w-12 h-12" />}
              title="AI-Assisted Responses"
              description="Get intelligent reply suggestions"
            />
            <FeatureCard
              icon={<Lock className="text-blue-900 w-12 h-12" />}
              title="Secure Platform"
              description="State-of-the-art encryption for your messages"
            />
            <FeatureCard
              icon={<Zap className="text-blue-900 w-12 h-12" />}
              title="Easy to Use"
              description="Simple interface for quick communication"
            />
          </div>
        </section>
        {/* How It Works Section */}
        <h2 className="text-3xl font-bold text-center mb-8">Revolutionizing the Way You Connect</h2>

        <section className="bg-gray-900 py-18 px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProcessStep
              icon={<Send className="text-blue-400 w-12 h-12" />}
              title="Compose Your Message"
              description="Write your message anonymously"
            />
            <ProcessStep
              icon={<Brain className="text-blue-400 w-12 h-12" />}
              title="AI Analysis"
              description="Our AI suggests appropriate responses"
            />
            <ProcessStep
              icon={<UserCheck className="text-blue-400 w-12 h-12" />}
              title="Admin Review"
              description="A human admin reads and responds"
            />
            <ProcessStep
              icon={<Lock className="text-blue-400 w-12 h-12" />}
              title="Secure Delivery"
              description="Responses are safely delivered to you"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-58 px-2  ">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 cursor-pointer ">
            <FAQItem
              
              question="Is my identity really anonymous?"
              answer="Yes, we use advanced encryption and never store personally identifiable information."
            />
            <FAQItem
              question="How does the AI assistance work?"
              answer="Our AI analyzes the content of your message and suggests appropriate responses based on context."
            />
            <FAQItem
              question="Can I trust the human admins?"
              answer="All our admins are thoroughly vetted and bound by strict confidentiality agreements."
            />
            <FAQItem
              question="Is there a limit to message length?"
              answer="Messages can be up to 5000 characters long to ensure comprehensive communication."
            />
            <FAQItem
              question="Is there a limit to message length?"
              answer="Messages can be up to 5000 characters long to ensure comprehensive communication."
            />
            <FAQItem
              question="Is there a limit to message length?"
              answer="Messages can be up to 5000 characters long to ensure comprehensive communication."
            />
            <FAQItem
              question="Is there a limit to message length?"
              answer="Messages can be up to 5000 characters long to ensure comprehensive communication."
            />
            <FAQItem
              question="Is there a limit to message length?"
              answer="Messages can be up to 5000 characters long to ensure comprehensive communication."
            />
          </div>
          <div className="text-center mt-8">
            <Link href="/" className="text-blue-400 hover:underline">View Full FAQ</Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Secret Message ❤️</h3>
            <p>&copy; {year} Secret Message. All rights reserved.</p>
          </div>
          <div>
  <h3 className="text-xl font-bold mb-4">Quick Links</h3>
  <ul className="flex space-x-4">
    <li><Link href="./" className="hover:text-blue-400">Privacy Policy</Link></li>
    <li><Link href="./" className="hover:text-blue-400">Terms of Service</Link></li>
    <li><Link href="./" className="hover:text-blue-400">Full FAQ</Link></li>
  </ul>
</div>

          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="https://www.linkedin.com/in/aaanjalisharma/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-6 h-6 text-blue-400 hover:text-blue-300" />
              </Link>
              <Link href="https://www.linkedin.com/in/aaanjalisharma/" target="_blank" rel="noopener noreferrer">
                <User className="w-6 h-6 text-blue-400 hover:text-blue-300" />
              </Link>
              <Link href="https://leetcode.com/u/Aaannjali/" target="_blank" rel="noopener noreferrer">
                <CodeXml  className="w-6 h-6 text-blue-400 hover:text-blue-300" />
              </Link>
              <Link href="https://github.com/aaannjali" target="_blank" rel="noopener noreferrer">
                <Github className="w-6 h-6 text-blue-400 hover:text-blue-300" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

interface ProcessStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ProcessStep({ icon, title, description }: ProcessStepProps) {
  return (
    <div className="text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">{question}</h3>
      <p className="text-gray-400">{answer}</p>
    </div>
  );
}