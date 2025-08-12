import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

interface ToolInfo {
  name: string;
  pricing: string;
  features: string[];
  description: string;
  effectiveness: string;
  category: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { toolName, context } = await req.json()
    
    if (!toolName) {
      return new Response(
        JSON.stringify({ error: 'Tool name is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get Perplexity API key from Supabase secrets
    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
    
    if (!perplexityApiKey) {
      return new Response(
        JSON.stringify({ error: 'Perplexity API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const prompt = `Research the AI/ML tool "${toolName}" and provide the following information in JSON format:

{
  "name": "${toolName}",
  "pricing": "Current pricing model (be specific with numbers)",
  "features": ["List 4 specific unique features of this tool"],
  "description": "Brief description of what this tool does",
  "effectiveness": "How effective this tool is for AI/ML tasks (1-2 sentences)",
  "category": "Tool category (e.g., AutoML, Deep Learning, Data Visualization, etc.)"
}

Context: This tool is being evaluated for ${context || 'AI/ML projects'}. 

Requirements:
- Get CURRENT pricing (2024/2025 data)
- Be specific about features that make this tool unique
- Focus on real capabilities, not marketing language
- Include free tier info if available

Respond ONLY with the JSON object, no additional text.`

    console.log('Fetching info for tool:', toolName)

    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a research assistant specializing in AI/ML tools. Provide accurate, current information in the exact JSON format requested. Be precise with pricing and features.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 1000,
        search_recency_filter: 'month'
      }),
    })

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ''
    
    console.log('Raw API response:', content)

    // Try to parse the JSON response
    let toolInfo: ToolInfo
    try {
      // Clean the response and extract JSON
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        toolInfo = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError)
      // Fallback: extract information manually
      toolInfo = {
        name: toolName,
        pricing: extractPricing(content) || "Contact vendor",
        features: extractFeatures(content, toolName),
        description: extractDescription(content, toolName),
        effectiveness: extractEffectiveness(content) || "Effective for AI/ML tasks",
        category: extractCategory(content, toolName)
      }
    }

    console.log('Processed tool info:', toolInfo)

    return new Response(
      JSON.stringify(toolInfo),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error fetching tool info:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch tool information' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

function extractPricing(content: string): string {
  const pricingPatterns = [
    /\$[\d,]+(?:\/month|\/mo|\/year|\/yr)?/gi,
    /free/gi,
    /(?:starting at|from)\s*\$[\d,]+/gi,
    /\$[\d.]+\s*(?:per|\/)\s*(?:user|seat|month)/gi
  ]
  
  for (const pattern of pricingPatterns) {
    const match = content.match(pattern)
    if (match) return match[0]
  }
  
  return "Contact vendor"
}

function extractFeatures(content: string, toolName: string): string[] {
  const toolLower = toolName.toLowerCase()
  
  // Tool-specific feature extraction
  const features: string[] = []
  
  if (toolLower.includes('scikit') || toolLower.includes('sklearn')) {
    features.push(
      "Classification & regression algorithms",
      "Model selection & evaluation",
      "Dimensionality reduction",
      "Clustering capabilities"
    )
  } else if (toolLower.includes('tensorflow')) {
    features.push(
      "Deep learning framework",
      "TensorFlow Serving for deployment",
      "TensorBoard for visualization",
      "Mobile & edge deployment"
    )
  } else if (toolLower.includes('pytorch')) {
    features.push(
      "Dynamic neural networks",
      "Automatic differentiation",
      "Distributed training",
      "TorchScript for production"
    )
  } else if (toolLower.includes('datarobot')) {
    features.push(
      "Automated machine learning",
      "Model deployment & monitoring",
      "Bias & fairness detection",
      "MLOps platform"
    )
  } else if (toolLower.includes('h2o')) {
    features.push(
      "AutoML capabilities",
      "H2O Flow interface",
      "Model interpretability",
      "Distributed computing"
    )
  } else {
    // Generic extraction from content
    const lines = content.split('\n')
    for (const line of lines) {
      if (line.includes('•') || line.includes('-') || line.includes('*')) {
        const feature = line.replace(/[•\-*]\s*/, '').trim()
        if (feature.length > 10 && feature.length < 60) {
          features.push(feature)
        }
      }
    }
  }
  
  return features.slice(0, 4)
}

function extractDescription(content: string, toolName: string): string {
  const sentences = content.split(/[.!?]/)
  for (const sentence of sentences) {
    if (sentence.toLowerCase().includes(toolName.toLowerCase()) && sentence.length > 20) {
      return sentence.trim() + '.'
    }
  }
  
  return `${toolName} is a specialized AI/ML tool designed for enhanced productivity and automation.`
}

function extractEffectiveness(content: string): string {
  const effectivenessKeywords = ['effective', 'powerful', 'efficient', 'performance', 'accuracy']
  const sentences = content.split(/[.!?]/)
  
  for (const sentence of sentences) {
    if (effectivenessKeywords.some(keyword => sentence.toLowerCase().includes(keyword))) {
      return sentence.trim() + '.'
    }
  }
  
  return "Highly effective for AI/ML workflows with proven performance metrics."
}

function extractCategory(content: string, toolName: string): string {
  const toolLower = toolName.toLowerCase()
  
  if (toolLower.includes('tensorflow') || toolLower.includes('pytorch') || toolLower.includes('keras')) {
    return "Deep Learning"
  } else if (toolLower.includes('scikit') || toolLower.includes('xgboost')) {
    return "Machine Learning"
  } else if (toolLower.includes('datarobot') || toolLower.includes('h2o') || toolLower.includes('auto')) {
    return "AutoML"
  } else if (toolLower.includes('tableau') || toolLower.includes('power bi')) {
    return "Data Visualization"
  } else if (toolLower.includes('jupyter') || toolLower.includes('notebook')) {
    return "Development Environment"
  } else if (toolLower.includes('aws') || toolLower.includes('azure') || toolLower.includes('google')) {
    return "Cloud ML Platform"
  }
  
  return "AI/ML Tool"
}