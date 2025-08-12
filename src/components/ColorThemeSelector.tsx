import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Palette } from "lucide-react";

export interface ColorTheme {
  name: string;
  label: string;
  background: string;
  primary: string;
  secondary: string;
  accent: string;
  preview: {
    bg: string;
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const colorThemes: ColorTheme[] = [
  {
    name: "ocean",
    label: "Ocean Blue",
    background: "linear-gradient(135deg, hsl(220, 70%, 15%) 0%, hsl(200, 80%, 25%) 100%)",
    primary: "hsl(200, 100%, 60%)",
    secondary: "hsl(180, 80%, 70%)",
    accent: "hsl(160, 90%, 55%)",
    preview: {
      bg: "bg-gradient-to-br from-blue-900 to-cyan-700",
      primary: "bg-blue-400",
      secondary: "bg-cyan-300",
      accent: "bg-emerald-400"
    }
  },
  {
    name: "sunset",
    label: "Sunset Orange",
    background: "linear-gradient(135deg, hsl(15, 80%, 20%) 0%, hsl(35, 85%, 35%) 100%)",
    primary: "hsl(25, 100%, 65%)",
    secondary: "hsl(45, 95%, 75%)",
    accent: "hsl(5, 90%, 60%)",
    preview: {
      bg: "bg-gradient-to-br from-orange-900 to-amber-600",
      primary: "bg-orange-400",
      secondary: "bg-yellow-300",
      accent: "bg-red-400"
    }
  },
  {
    name: "forest",
    label: "Forest Green",
    background: "linear-gradient(135deg, hsl(140, 60%, 15%) 0%, hsl(120, 70%, 25%) 100%)",
    primary: "hsl(130, 80%, 55%)",
    secondary: "hsl(150, 70%, 65%)",
    accent: "hsl(110, 85%, 50%)",
    preview: {
      bg: "bg-gradient-to-br from-green-900 to-emerald-600",
      primary: "bg-green-400",
      secondary: "bg-emerald-300",
      accent: "bg-lime-400"
    }
  },
  {
    name: "royal",
    label: "Royal Purple",
    background: "linear-gradient(135deg, hsl(260, 70%, 20%) 0%, hsl(280, 80%, 30%) 100%)",
    primary: "hsl(270, 90%, 65%)",
    secondary: "hsl(290, 85%, 75%)",
    accent: "hsl(250, 95%, 70%)",
    preview: {
      bg: "bg-gradient-to-br from-purple-900 to-violet-600",
      primary: "bg-purple-400",
      secondary: "bg-violet-300",
      accent: "bg-indigo-400"
    }
  },
  {
    name: "midnight",
    label: "Midnight Dark",
    background: "linear-gradient(135deg, hsl(240, 30%, 8%) 0%, hsl(220, 40%, 15%) 100%)",
    primary: "hsl(210, 80%, 60%)",
    secondary: "hsl(240, 60%, 70%)",
    accent: "hsl(180, 70%, 55%)",
    preview: {
      bg: "bg-gradient-to-br from-slate-900 to-gray-700",
      primary: "bg-blue-400",
      secondary: "bg-slate-300",
      accent: "bg-cyan-400"
    }
  }
];

interface ColorThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

export const ColorThemeSelector = ({ selectedTheme, onThemeChange }: ColorThemeSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Palette className="h-5 w-5 text-primary" />
        <Label className="text-white text-lg font-semibold">Choose Color Theme</Label>
      </div>
      <RadioGroup value={selectedTheme} onValueChange={onThemeChange}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorThemes.map((theme) => (
            <div key={theme.name} className="relative">
              <RadioGroupItem 
                value={theme.name} 
                id={theme.name}
                className="sr-only"
              />
              <Label
                htmlFor={theme.name}
                className="cursor-pointer"
              >
                <Card className={`p-4 border-2 transition-all duration-300 ${
                  selectedTheme === theme.name 
                    ? 'border-primary bg-white/20' 
                    : 'border-white/20 bg-white/10 hover:bg-white/15'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-full ${theme.preview.bg}`} />
                    <span className="text-white font-medium">{theme.label}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className={`h-3 rounded ${theme.preview.primary}`} />
                    <div className={`h-3 rounded ${theme.preview.secondary}`} />
                    <div className={`h-3 rounded ${theme.preview.accent}`} />
                  </div>
                </Card>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};