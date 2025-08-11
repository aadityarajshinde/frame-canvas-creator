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

const toolSchema = z.object({
  name: z.string().min(1, "Tool name is required"),
  description: z.string().min(1, "Description is required"),
  logoUrl: z.string().optional(),
  comparisonPoints: z.string().min(1, "Comparison points are required"),
});

const formSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  businessFundamentals: z.string().min(1, "Business Fundamentals is required"),
  currentSolutionLandscape: z.string().min(1, "Current Solution Landscape is required"),
  aiFundamentals: z.string().min(1, "AI Fundamentals is required"),
  aiSolutionAndTools: z.string().min(1, "AI Solution and Tools is required"),
  aiToolsAppendix: z.array(toolSchema).min(1, "At least one tool is required"),
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
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "aiToolsAppendix"
  });

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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`aiToolsAppendix.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">Tool Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., n8n"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
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
                            <FormLabel className="text-white/80">Logo URL (optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://example.com/logo.png"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`aiToolsAppendix.${index}.description`}
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-white/80">Short Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Brief description of the tool's purpose and capabilities"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
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
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-white/80">Comparison Points</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="• Key features and capabilities&#10;• Pricing information&#10;• Use cases and benefits"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
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