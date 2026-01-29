
import { Service, Category } from './types';

export const CATEGORIES: Category[] = ['Development', 'Design', 'Marketing', 'Writing', 'Business'];

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Custom Web Application',
    description: 'Scalable, modern web apps built with React and Node.js.',
    longDescription: 'Our team of expert developers will build a custom, responsive, and high-performance web application tailored to your specific business needs. From planning to deployment, we handle the full development lifecycle.',
    price: 2499,
    category: 'Development',
    rating: 4.9,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    features: ['Responsive UI/UX', 'Cloud Integration', 'SEO Optimized', '3 Months Support']
  },
  {
    id: '2',
    title: 'Brand Identity Design',
    description: 'Logo, typography, and color palette for your brand.',
    longDescription: 'Create a lasting impression with a unique brand identity. We provide a comprehensive design package including a logo, brand guidelines, and social media assets that resonate with your target audience.',
    price: 899,
    category: 'Design',
    rating: 4.8,
    reviews: 86,
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&q=80&w=800',
    features: ['3 Design Concepts', 'Source Files Included', 'Social Media Kit', 'Unlimited Revisions']
  },
  {
    id: '3',
    title: 'Digital Marketing Package',
    description: 'Comprehensive SEO, SEM, and social media growth.',
    longDescription: 'Boost your online presence and drive traffic with our integrated digital marketing strategy. We focus on ROI-driven campaigns that help your business scale through organic and paid channels.',
    price: 1500,
    category: 'Marketing',
    rating: 4.7,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=800',
    features: ['Keyword Research', 'Ad Campaign Management', 'Monthly Analytics', 'Content Strategy']
  },
  {
    id: '4',
    title: 'UI/UX Mobile Design',
    description: 'Modern and intuitive app interfaces for iOS and Android.',
    longDescription: 'User-centric mobile app design that ensures your customers have a seamless experience. We create high-fidelity prototypes and developer-ready handoff files using Figma.',
    price: 1200,
    category: 'Design',
    rating: 4.9,
    reviews: 54,
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
    features: ['Interactive Prototypes', 'User Journey Mapping', 'Design System', 'Handoff Files']
  },
  {
    id: '5',
    title: 'Content Writing & Strategy',
    description: 'High-quality articles and website copy that converts.',
    longDescription: 'Engage your audience with professionally written content. Our writers specialize in creating SEO-friendly articles, landing page copy, and blog posts that drive authority and conversions.',
    price: 450,
    category: 'Writing',
    rating: 4.6,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
    features: ['SEO Optimized', 'Plagiarism Free', '2 Rounds of Edits', 'Market Research']
  },
  {
    id: '6',
    title: 'Business Cloud Migration',
    description: 'Transition your infrastructure to AWS or Azure safely.',
    longDescription: 'Modernize your business by moving to the cloud. We handle infrastructure assessment, migration strategy, and execution to ensure zero downtime and improved scalability.',
    price: 3500,
    category: 'Business',
    rating: 5.0,
    reviews: 31,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    features: ['Zero Downtime', 'Cost Optimization', 'Security Hardening', 'Training Session']
  }
];
