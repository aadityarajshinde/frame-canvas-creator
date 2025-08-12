// Comprehensive AI/ML Tool Database with Real Information
export interface ToolInfo {
  name: string;
  pricing: string;
  features: string[];
  description: string;
  effectiveness: string;
  category: string;
  website?: string;
}

export const TOOL_DATABASE: Record<string, ToolInfo> = {
  // Machine Learning Frameworks
  'scikit-learn': {
    name: 'Scikit-learn',
    pricing: 'Free (Open Source)',
    features: [
      'Classification algorithms (SVM, Random Forest, etc.)',
      'Regression modeling and evaluation',
      'Clustering algorithms (K-means, DBSCAN)',
      'Feature selection and preprocessing'
    ],
    description: 'The most popular Python library for machine learning, providing simple and efficient tools for data mining and analysis.',
    effectiveness: 'Extremely effective for traditional ML tasks with excellent documentation and community support.',
    category: 'Machine Learning Framework',
    website: 'https://scikit-learn.org'
  },
  
  'tensorflow': {
    name: 'TensorFlow',
    pricing: 'Free (Open Source)',
    features: [
      'Deep learning and neural networks',
      'TensorFlow Serving for production deployment',
      'TensorBoard for visualization and debugging',
      'Mobile and edge device optimization'
    ],
    description: 'Google\'s open-source machine learning framework for building and deploying ML models at scale.',
    effectiveness: 'Highly effective for deep learning with strong production capabilities and enterprise support.',
    category: 'Deep Learning Framework',
    website: 'https://tensorflow.org'
  },
  
  'pytorch': {
    name: 'PyTorch',
    pricing: 'Free (Open Source)',
    features: [
      'Dynamic computational graphs',
      'Intuitive debugging and development',
      'Strong research community support',
      'TorchScript for production deployment'
    ],
    description: 'Facebook\'s open-source deep learning framework known for its flexibility and ease of use in research.',
    effectiveness: 'Excellent for research and prototyping with growing production capabilities.',
    category: 'Deep Learning Framework',
    website: 'https://pytorch.org'
  },
  
  // AutoML Platforms
  'datarobot': {
    name: 'DataRobot',
    pricing: 'Enterprise pricing (starts ~$50k/year)',
    features: [
      'Automated machine learning pipeline',
      'MLOps and model monitoring',
      'Explainable AI and bias detection',
      'Enterprise deployment and governance'
    ],
    description: 'Leading enterprise AutoML platform that automates the machine learning workflow from data to deployment.',
    effectiveness: 'Highly effective for enterprise ML automation with strong governance and compliance features.',
    category: 'AutoML Platform',
    website: 'https://datarobot.com'
  },
  
  'h2o.ai': {
    name: 'H2O.ai',
    pricing: 'Free community / Enterprise pricing',
    features: [
      'AutoML with automatic feature engineering',
      'Distributed computing capabilities',
      'Model interpretability tools (LIME, SHAP)',
      'H2O Flow visual interface'
    ],
    description: 'Open-source AutoML platform with both free and enterprise versions for scalable machine learning.',
    effectiveness: 'Very effective for AutoML tasks with strong interpretability features.',
    category: 'AutoML Platform',
    website: 'https://h2o.ai'
  },
  
  // Data Visualization
  'tableau': {
    name: 'Tableau',
    pricing: '$75/user/month (Creator license)',
    features: [
      'Advanced data visualization and dashboards',
      'Self-service business intelligence',
      'Real-time data connectivity',
      'Collaborative analytics platform'
    ],
    description: 'Leading business intelligence and data visualization platform for creating interactive dashboards.',
    effectiveness: 'Extremely effective for business intelligence and data storytelling with intuitive interface.',
    category: 'Data Visualization',
    website: 'https://tableau.com'
  },
  
  'power bi': {
    name: 'Power BI',
    pricing: '$10/user/month (Pro license)',
    features: [
      'Microsoft ecosystem integration',
      'Real-time dashboard updates',
      'Natural language queries',
      'Mobile-first reporting capabilities'
    ],
    description: 'Microsoft\'s business analytics solution that provides interactive visualizations and business intelligence.',
    effectiveness: 'Highly effective for organizations using Microsoft ecosystem with strong cost-performance ratio.',
    category: 'Data Visualization',
    website: 'https://powerbi.microsoft.com'
  },
  
  // Development Environments
  'jupyter': {
    name: 'Jupyter Notebook',
    pricing: 'Free (Open Source)',
    features: [
      'Interactive computing notebooks',
      'Support for 40+ programming languages',
      'Rich media output (plots, HTML, images)',
      'Collaborative data science environment'
    ],
    description: 'Web-based interactive development environment for data science, machine learning, and scientific computing.',
    effectiveness: 'Essential tool for data science with excellent prototyping and collaboration capabilities.',
    category: 'Development Environment',
    website: 'https://jupyter.org'
  },
  
  // Cloud ML Platforms
  'aws sagemaker': {
    name: 'AWS SageMaker',
    pricing: 'Pay-per-use (starts $0.05/hour)',
    features: [
      'Fully managed ML lifecycle',
      'Built-in algorithms and frameworks',
      'SageMaker Studio IDE',
      'Automatic model tuning and deployment'
    ],
    description: 'Amazon\'s fully managed machine learning service for building, training, and deploying ML models.',
    effectiveness: 'Highly effective for cloud-native ML with strong AWS ecosystem integration.',
    category: 'Cloud ML Platform',
    website: 'https://aws.amazon.com/sagemaker'
  },
  
  'azure machine learning': {
    name: 'Azure Machine Learning',
    pricing: 'Pay-per-use (starts $0.10/hour)',
    features: [
      'MLOps capabilities',
      'Automated machine learning',
      'Designer visual interface',
      'Enterprise security and compliance'
    ],
    description: 'Microsoft\'s cloud-based machine learning service for the complete ML lifecycle.',
    effectiveness: 'Very effective for enterprise ML with strong integration with Microsoft services.',
    category: 'Cloud ML Platform',
    website: 'https://azure.microsoft.com/en-us/services/machine-learning'
  },
  
  'google vertex ai': {
    name: 'Google Vertex AI',
    pricing: 'Pay-per-use (starts $0.05/hour)',
    features: [
      'Unified ML platform',
      'Pre-trained APIs and custom models',
      'AutoML capabilities',
      'MLOps and model monitoring'
    ],
    description: 'Google Cloud\'s unified machine learning platform for building and deploying AI solutions.',
    effectiveness: 'Excellent for ML workflows with strong AI research backing and pre-trained models.',
    category: 'Cloud ML Platform',
    website: 'https://cloud.google.com/vertex-ai'
  },
  
  // Data Platforms
  'databricks': {
    name: 'Databricks',
    pricing: '$0.30/DBU + compute costs',
    features: [
      'Unified analytics platform',
      'Apache Spark optimization',
      'MLflow integration',
      'Delta Lake data lakehouse'
    ],
    description: 'Unified analytics platform for big data and machine learning built on Apache Spark.',
    effectiveness: 'Highly effective for large-scale data processing and collaborative ML development.',
    category: 'Data Platform',
    website: 'https://databricks.com'
  },
  
  'snowflake': {
    name: 'Snowflake',
    pricing: '$2-3/credit + storage costs',
    features: [
      'Cloud data warehouse',
      'Built-in ML functions',
      'Data sharing capabilities',
      'Automatic scaling and optimization'
    ],
    description: 'Cloud-based data warehouse with built-in machine learning and analytics capabilities.',
    effectiveness: 'Very effective for data warehousing with growing ML capabilities.',
    category: 'Data Platform',
    website: 'https://snowflake.com'
  },
  
  // Specialized Tools
  'alteryx': {
    name: 'Alteryx',
    pricing: '$5,195/user/year (Designer)',
    features: [
      'Self-service data preparation',
      'Drag-and-drop workflow designer',
      'Advanced analytics and ML',
      'Process automation capabilities'
    ],
    description: 'Self-service data analytics platform for data preparation, blending, and advanced analytics.',
    effectiveness: 'Effective for citizen data scientists with intuitive visual interface.',
    category: 'Data Preparation',
    website: 'https://alteryx.com'
  },
  
  'rapidminer': {
    name: 'RapidMiner',
    pricing: 'Free / $2,500+/user/year',
    features: [
      'Visual workflow design',
      'End-to-end data science platform',
      'Auto-model generation',
      'Deployment automation'
    ],
    description: 'Data science platform with visual workflow design for the entire data science lifecycle.',
    effectiveness: 'Good for teams needing visual ML workflows with both free and enterprise options.',
    category: 'Data Science Platform',
    website: 'https://rapidminer.com'
  },
  
  'knime': {
    name: 'KNIME',
    pricing: 'Free (Open Source) / Enterprise pricing',
    features: [
      'Visual workflow editor',
      'Extensible architecture with 300+ nodes',
      'Integration with R, Python, Spark',
      'Active open-source community'
    ],
    description: 'Open-source analytics platform for creating data science workflows through visual programming.',
    effectiveness: 'Effective for visual data science workflows with strong community and extensibility.',
    category: 'Data Science Platform',
    website: 'https://knime.com'
  }
};

// Fuzzy matching function to find tools even with slight name variations
export function findToolInfo(toolName: string): ToolInfo | null {
  const normalizedName = toolName.toLowerCase().trim();
  
  // Direct match
  if (TOOL_DATABASE[normalizedName]) {
    return TOOL_DATABASE[normalizedName];
  }
  
  // Fuzzy matching
  for (const [key, tool] of Object.entries(TOOL_DATABASE)) {
    if (
      normalizedName.includes(key) || 
      key.includes(normalizedName) ||
      tool.name.toLowerCase().includes(normalizedName) ||
      normalizedName.includes(tool.name.toLowerCase().replace(/[^a-z0-9]/g, ''))
    ) {
      return tool;
    }
  }
  
  // Check for common variations
  const variations: Record<string, string> = {
    'sklearn': 'scikit-learn',
    'tf': 'tensorflow',
    'torch': 'pytorch',
    'powerbi': 'power bi',
    'sagemaker': 'aws sagemaker',
    'vertex': 'google vertex ai',
    'h2o': 'h2o.ai'
  };
  
  for (const [variation, actualName] of Object.entries(variations)) {
    if (normalizedName.includes(variation)) {
      return TOOL_DATABASE[actualName];
    }
  }
  
  return null;
}

// Get smart defaults for unknown tools
export function getSmartDefaults(toolName: string): ToolInfo {
  const name = toolName.toLowerCase();
  
  if (name.includes('gpt') || name.includes('openai')) {
    return {
      name: toolName,
      pricing: '$20/month (ChatGPT Plus)',
      features: [
        'Natural language processing',
        'Code generation and debugging',
        'Conversational AI interface',
        'Multi-modal capabilities'
      ],
      description: 'Advanced AI language model for text generation, analysis, and conversation.',
      effectiveness: 'Highly effective for natural language tasks and code assistance.',
      category: 'Language Model'
    };
  }
  
  if (name.includes('claude')) {
    return {
      name: toolName,
      pricing: '$20/month (Claude Pro)',
      features: [
        'Advanced reasoning capabilities',
        'Long-form content analysis',
        'Ethical AI framework',
        'Constitutional AI approach'
      ],
      description: 'AI assistant focused on helpful, harmless, and honest interactions.',
      effectiveness: 'Excellent for analysis, writing, and complex reasoning tasks.',
      category: 'Language Model'
    };
  }
  
  if (name.includes('zapier')) {
    return {
      name: toolName,
      pricing: '$19.99/month (Starter)',
      features: [
        'Workflow automation',
        '5000+ app integrations',
        'No-code automation platform',
        'Conditional logic and filters'
      ],
      description: 'Automation platform connecting different apps and services without coding.',
      effectiveness: 'Highly effective for workflow automation and app integration.',
      category: 'Automation Platform'
    };
  }
  
  // Generic AI tool fallback
  return {
    name: toolName,
    pricing: 'Contact vendor for pricing',
    features: [
      'AI-powered automation',
      'Machine learning capabilities',
      'Data processing and analysis',
      'Integration with existing tools'
    ],
    description: `${toolName} is an AI/ML tool designed to enhance productivity and automation capabilities.`,
    effectiveness: 'Effective for AI/ML tasks with specialized capabilities.',
    category: 'AI/ML Tool'
  };
}