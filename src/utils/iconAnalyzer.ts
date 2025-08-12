import { 
  // Business & Finance
  Building2, DollarSign, TrendingUp, BarChart3, Target, Users, Briefcase, 
  PieChart, Calculator, CreditCard, Banknote, Wallet, Receipt, ChartBar,
  
  // Technology & AI
  Brain, Cpu, Bot, Database, Code, Terminal, Smartphone, Laptop, Monitor,
  Wifi, Cloud, Server, HardDrive, Zap, Lightbulb, Cog, Settings, Wrench,
  
  // Communication & Collaboration
  MessageSquare, Mail, Phone, Video, Users2, UserCheck, Handshake, Share2,
  Link, Globe, Network, Rss, Megaphone, Bell, Calendar, Clock,
  
  // Productivity & Tools
  FileText, Folder, Search, Filter, Edit, Save, Download, Upload, 
  Copy, Clipboard, CheckSquare, ListTodo, Timer, Clock3, PlayCircle,
  
  // Security & Protection
  Shield, Lock, Key, Eye, EyeOff, Fingerprint, AlertTriangle, AlertCircle,
  
  // Growth & Analytics
  TrendingDown, ArrowUp, ArrowRight, Activity, Pause, Gauge, Radar,
  
  // Innovation & Creativity
  Sparkles, Wand2, Palette, Brush, Camera, Image, Film, Music, 
  
  // Operations & Workflow
  Workflow, GitBranch, Route, MapPin, Navigation, Compass, Flag, 
  CheckCircle, XCircle, Info, HelpCircle,
  
  // Industry Specific
  ShoppingCart, Package, Truck, Factory, Wrench as Tool, Hammer, 
  Stethoscope, GraduationCap, BookOpen, Newspaper, Coffee, Home,
  
  // Social & Marketing
  Heart, ThumbsUp, Star, Award, Trophy, Medal, Gift, Tag, 
  
  // Data & Research
  BarChart, LineChart, Archive, FolderOpen, File, Files, Bookmark
} from "lucide-react";

interface IconSuggestion {
  icon: any;
  relevance: number;
  category: string;
}

const iconKeywords = {
  // Business & Finance
  business: [Building2, Users, Briefcase, Target, TrendingUp],
  finance: [DollarSign, Calculator, CreditCard, Banknote, Wallet],
  analytics: [BarChart3, PieChart, ChartBar, TrendingUp, Gauge],
  
  // Technology & AI
  ai: [Brain, Bot, Cpu, Sparkles, Lightbulb],
  technology: [Code, Terminal, Laptop, Monitor, Database],
  automation: [Cog, Settings, Workflow, Bot, Zap],
  cloud: [Cloud, Server, Database, Network, Globe],
  
  // Communication
  communication: [MessageSquare, Mail, Phone, Video, Share2],
  collaboration: [Users2, Handshake, UserCheck, Network, Link],
  social: [Heart, ThumbsUp, Star, Share2, Users],
  
  // Productivity
  productivity: [CheckSquare, ListTodo, Timer, Calendar, Clock3],
  management: [Folder, FileText, Edit, Save, Clipboard],
  workflow: [Workflow, GitBranch, Route, CheckCircle, ArrowRight],
  
  // Security
  security: [Shield, Lock, Key, Eye, Fingerprint],
  privacy: [EyeOff, Shield, Lock, AlertTriangle, AlertCircle],
  
  // Innovation
  innovation: [Lightbulb, Sparkles, Wand2, TrendingUp, ArrowUp],
  creative: [Palette, Brush, Camera, Image, Film],
  
  // Industry
  retail: [ShoppingCart, Package, Tag, Receipt, Truck],
  healthcare: [Stethoscope, Heart, Shield, Users, HelpCircle],
  education: [GraduationCap, BookOpen, Users, TrendingUp, Award],
  manufacturing: [Factory, Tool, Hammer, Cog, Package],
  
  // Data & Research
  data: [Database, BarChart, Archive, File, Search],
  research: [Search, BookOpen, Archive, Bookmark, Info],
  reporting: [FileText, BarChart3, PieChart, LineChart, TrendingUp]
};

export function analyzeTextForIcons(text: string): IconSuggestion[] {
  const lowercaseText = text.toLowerCase();
  const suggestions: IconSuggestion[] = [];
  
  // Check for keyword matches
  Object.entries(iconKeywords).forEach(([category, icons]) => {
    icons.forEach(icon => {
      let relevance = 0;
      
      // Direct keyword match
      if (lowercaseText.includes(category)) {
        relevance += 10;
      }
      
      // Related word analysis
      const relatedWords = getRelatedWords(category);
      relatedWords.forEach(word => {
        if (lowercaseText.includes(word)) {
          relevance += 5;
        }
      });
      
      // Common business terms
      const businessTerms = ['solution', 'platform', 'system', 'tool', 'service', 'process'];
      businessTerms.forEach(term => {
        if (lowercaseText.includes(term) && ['business', 'technology', 'productivity'].includes(category)) {
          relevance += 3;
        }
      });
      
      if (relevance > 0) {
        suggestions.push({ icon, relevance, category });
      }
    });
  });
  
  // Add default icons for common concepts
  const defaultMappings = [
    { keywords: ['customer', 'client', 'user'], icons: [Users, UserCheck, Heart] },
    { keywords: ['market', 'sales', 'revenue'], icons: [TrendingUp, DollarSign, Target] },
    { keywords: ['strategy', 'plan', 'goal'], icons: [Target, Flag, Route] },
    { keywords: ['efficiency', 'optimize', 'improve'], icons: [Zap, TrendingUp, Gauge] },
    { keywords: ['integration', 'connect', 'api'], icons: [Link, Network, Workflow] },
    { keywords: ['mobile', 'app', 'application'], icons: [Smartphone, Monitor, Code] },
    { keywords: ['dashboard', 'interface', 'ui'], icons: [Monitor, BarChart3, Settings] },
    { keywords: ['machine learning', 'ml', 'algorithm'], icons: [Brain, Cpu, Bot] },
    { keywords: ['chatbot', 'chat', 'conversation'], icons: [MessageSquare, Bot, Users] },
    { keywords: ['document', 'file', 'content'], icons: [FileText, Folder, Edit] }
  ];
  
  defaultMappings.forEach(({ keywords, icons }) => {
    keywords.forEach(keyword => {
      if (lowercaseText.includes(keyword)) {
        icons.forEach(icon => {
          suggestions.push({ icon, relevance: 8, category: 'contextual' });
        });
      }
    });
  });
  
  // Remove duplicates and sort by relevance
  const uniqueSuggestions = suggestions.reduce((acc, current) => {
    const existing = acc.find(item => item.icon === current.icon);
    if (existing) {
      existing.relevance += current.relevance;
    } else {
      acc.push(current);
    }
    return acc;
  }, [] as IconSuggestion[]);
  
  return uniqueSuggestions
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 15); // Limit to top 15 most relevant icons
}

function getRelatedWords(category: string): string[] {
  const relatedWordsMap: Record<string, string[]> = {
    business: ['company', 'enterprise', 'organization', 'corporate', 'commercial', 'strategy', 'operations'],
    finance: ['money', 'cost', 'budget', 'revenue', 'profit', 'investment', 'financial', 'economic'],
    analytics: ['metrics', 'data', 'insights', 'statistics', 'performance', 'measurement', 'tracking'],
    ai: ['artificial intelligence', 'machine learning', 'neural', 'smart', 'intelligent', 'cognitive'],
    technology: ['digital', 'software', 'hardware', 'tech', 'system', 'platform', 'solution'],
    automation: ['automatic', 'streamline', 'optimize', 'efficient', 'process', 'workflow'],
    communication: ['messaging', 'chat', 'email', 'contact', 'discussion', 'conversation'],
    security: ['protection', 'safe', 'secure', 'privacy', 'encryption', 'authentication'],
    productivity: ['efficient', 'effective', 'performance', 'optimization', 'streamline', 'organize'],
    innovation: ['creative', 'new', 'innovative', 'breakthrough', 'advanced', 'cutting-edge']
  };
  
  return relatedWordsMap[category] || [];
}

// Helper function to get a random selection of icons for visual variety
export function getRandomIcons(count: number = 5) {
  const allIcons = [
    Building2, DollarSign, TrendingUp, BarChart3, Brain, Cpu, Bot, Users,
    MessageSquare, Shield, Lightbulb, Workflow, CheckSquare, ArrowUp,
    Code, Cloud, Target, Zap, Heart, Star, Award, Search, Calendar
  ];
  
  const shuffled = [...allIcons].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}