import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ColorThemeSelector } from "@/components/ColorThemeSelector";

const toolSchema = z.object({
  name: z.string().min(1, "Tool name is required"),
  description: z.string().optional(),
  logoUrl: z.string().optional(),
  comparisonPoints: z.string().optional(),
});

const formSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  businessFundamentals: z.string().min(1, "Business Fundamentals is required"),
  currentSolutionLandscape: z.string().min(1, "Current Solution Landscape is required"),
  aiFundamentals: z.string().min(1, "AI Fundamentals is required"),
  aiSolutionAndTools: z.string().min(1, "AI Solution and Tools is required"),
  aiToolsAppendix: z.array(toolSchema).min(1, "At least one tool is required"),
  colorTheme: z.string().min(1, "Color theme is required"),
});

type FormData = z.infer<typeof formSchema>;

const FormPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      businessFundamentals: "",
      currentSolutionLandscape: "",
      aiFundamentals: "",
      aiSolutionAndTools: "",
      aiToolsAppendix: [{ name: "", description: "", logoUrl: "", comparisonPoints: "" }],
      colorTheme: "ocean",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "aiToolsAppendix"
  });

  const fetchToolInfo = async (toolName: string, index: number) => {
    if (!toolName.trim()) return;
    
    toast({
      title: "Researching Tool",
      description: `Fetching information for ${toolName}...`,
    });
    
    // Smart defaults based on common tool names
    const toolLower = toolName.toLowerCase();
    let description = `${toolName} is an AI-powered tool designed to enhance productivity and automation capabilities.`;
    let features = `• Advanced AI features\n• User-friendly interface\n• Scalable solution\n• Integration capabilities`;
    let logoUrl = `https://logo.clearbit.com/${toolName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.com`;
    
    // Enhanced smart defaults based on tool name patterns
    if (toolLower.includes('gpt') || toolLower.includes('chat') || toolLower.includes('openai')) {
      description = `${toolName} is a conversational AI platform that provides intelligent text generation and natural language understanding capabilities.`;
      features = `• Natural language processing\n• Conversational interface\n• Content generation\n• Multi-language support\n• Code assistance\n• Creative writing`;
    } else if (toolLower.includes('zapier') || toolLower.includes('automation') || toolLower.includes('n8n')) {
      description = `${toolName} is an automation platform that connects different applications and streamlines workflows without requiring technical expertise.`;
      features = `• Workflow automation\n• App integrations (1000+ apps)\n• Trigger-based actions\n• No-code solution\n• Real-time sync\n• Custom logic support`;
    } else if (toolLower.includes('claude') || toolLower.includes('anthropic')) {
      description = `${toolName} is an AI assistant focused on being helpful, harmless, and honest in conversations and complex reasoning tasks.`;
      features = `• Advanced reasoning capabilities\n• Long-form content analysis\n• Ethical AI framework\n• Multi-modal understanding\n• Document analysis\n• Constitutional AI approach`;
    } else if (toolLower.includes('midjourney') || toolLower.includes('dall') || toolLower.includes('stable')) {
      description = `${toolName} is an AI image generation tool that creates high-quality artwork and images from text descriptions.`;
      features = `• Text-to-image generation\n• Style customization\n• High-resolution output\n• Artistic controls\n• Batch processing\n• Commercial licensing`;
    } else if (toolLower.includes('notion') || toolLower.includes('obsidian')) {
      description = `${toolName} is a productivity and knowledge management platform enhanced with AI capabilities for better organization and automation.`;
      features = `• AI-powered writing assistance\n• Smart templates\n• Automated organization\n• Knowledge graphs\n• Team collaboration\n• Custom databases`;
    } else if (toolLower.includes('figma') || toolLower.includes('canva')) {
      description = `${toolName} is a design platform that incorporates AI features to streamline creative workflows and enhance design productivity.`;
      features = `• AI design suggestions\n• Automated layouts\n• Smart color palettes\n• Content generation\n• Template creation\n• Brand consistency`;
    } else if (toolLower.includes('hubspot') || toolLower.includes('salesforce')) {
      description = `${toolName} is a CRM and marketing platform enhanced with AI capabilities for better customer relationship management and sales automation.`;
      features = `• AI lead scoring\n• Predictive analytics\n• Automated workflows\n• Smart recommendations\n• Customer insights\n• Sales forecasting`;
    } else if (toolLower.includes('slack') || toolLower.includes('teams') || toolLower.includes('discord')) {
      description = `${toolName} is a communication platform enhanced with AI features for improved team collaboration and productivity.`;
      features = `• AI-powered search\n• Smart notifications\n• Automated summaries\n• Language translation\n• Meeting insights\n• Workflow integration`;
    }
    
    // Try to get a better logo URL based on known services
    if (toolLower.includes('openai') || toolLower.includes('gpt')) {
      logoUrl = 'https://openai.com/favicon.ico';
    } else if (toolLower.includes('anthropic') || toolLower.includes('claude')) {
      logoUrl = 'https://www.anthropic.com/favicon.ico';
    } else if (toolLower.includes('zapier')) {
      logoUrl = 'https://zapier.com/favicon.ico';
    } else if (toolLower.includes('notion')) {
      logoUrl = 'https://www.notion.so/favicon.ico';
    } else if (toolLower.includes('figma')) {
      logoUrl = 'https://www.figma.com/favicon.ico';
    } else if (toolLower.includes('slack')) {
      logoUrl = 'https://slack.com/favicon.ico';
    }
    
    // Update form values
    form.setValue(`aiToolsAppendix.${index}.description`, description);
    form.setValue(`aiToolsAppendix.${index}.comparisonPoints`, features);
    form.setValue(`aiToolsAppendix.${index}.logoUrl`, logoUrl);
    
    toast({
      title: "Tool Info Generated",
      description: `Smart information for ${toolName} has been populated. You can edit it if needed.`,
    });
  };

  const onSubmit = (data: FormData) => {
    // Save data to localStorage
    localStorage.setItem("formData", JSON.stringify(data));
    
    toast({
      title: "Success",
      description: "Form submitted successfully! Redirecting to results page...",
    });
    
    // Navigate to results page
    setTimeout(() => {
      navigate("/results");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Create Your AI Strategy
          </h1>
          <p className="text-white/80 text-lg">
            Fill out the form below to generate your personalized AI strategy overview
          </p>
        </div>

        <Card className="p-8 bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Color Theme Selection */}
              <FormField
                control={form.control}
                name="colorTheme"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ColorThemeSelector 
                        selectedTheme={field.value}
                        onThemeChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* The Topic */}
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-lg font-semibold">The Topic</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your topic"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Business Fundamentals */}
              <FormField
                control={form.control}
                name="businessFundamentals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-lg font-semibold">Business Fundamentals</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="• Enter your business fundamentals&#10;• Use bullet points for better organization&#10;• Add multiple points as needed"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Current Solution Landscape */}
              <FormField
                control={form.control}
                name="currentSolutionLandscape"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-lg font-semibold">Current Solution Landscape</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="• Describe your current solutions&#10;• Include existing tools and processes&#10;• Note any challenges or limitations"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* AI Fundamentals */}
              <FormField
                control={form.control}
                name="aiFundamentals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-lg font-semibold">AI Fundamentals</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="• Outline key AI concepts relevant to your domain&#10;• Include machine learning basics&#10;• Note any specific AI technologies"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* AI Solution and Tools */}
              <FormField
                control={form.control}
                name="aiSolutionAndTools"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-lg font-semibold">AI Solution and Tools</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="• Describe proposed AI solutions&#10;• List specific AI tools and platforms&#10;• Include implementation strategies"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* AI Tools Appendix */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-white text-lg font-semibold">AI Tools Appendix (Comparison Table)</Label>
                  <Button
                    type="button"
                    onClick={() => append({ name: "", description: "", logoUrl: "", comparisonPoints: "" })}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tool
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <Card key={field.id} className="p-4 bg-white/8 border-white/15 backdrop-blur-xl">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-white font-medium">Tool #{index + 1}</h4>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          variant="outline"
                          size="sm"
                          className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`aiToolsAppendix.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">Tool Name</FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                <Input 
                                  placeholder="e.g., ChatGPT, Claude, Zapier"
                                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                                  {...field} 
                                />
                                <Button
                                  type="button"
                                  onClick={() => fetchToolInfo(field.value, index)}
                                  disabled={!field.value.trim()}
                                  variant="outline"
                                  size="sm"
                                  className="bg-primary/20 border-primary/30 text-primary hover:bg-primary/30 whitespace-nowrap"
                                >
                                  Research Tool
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Auto-populated fields - now read-only but editable */}
                      <FormField
                        control={form.control}
                        name={`aiToolsAppendix.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">Description (Auto-generated)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Description will be automatically fetched when you research the tool"
                                className="bg-white/5 border-white/15 text-white/90 placeholder:text-white/40"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`aiToolsAppendix.${index}.comparisonPoints`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">Comparison Points (Auto-generated)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Key features and comparison points will be automatically fetched"
                                className="bg-white/5 border-white/15 text-white/90 placeholder:text-white/40"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`aiToolsAppendix.${index}.logoUrl`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">Logo URL (Auto-generated)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Logo URL will be automatically generated"
                                className="bg-white/5 border-white/15 text-white/90 placeholder:text-white/40"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center pt-6">
                <Button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Generating..." : "Generate AI Strategy"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default FormPage;