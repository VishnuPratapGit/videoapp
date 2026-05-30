import {
  Home,
  Flame,
  Library,
  Heart,
  History,
  LucideIcon,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import { SVGProps } from "react";

const iconMap = {
  Home,
  Flame,
  Library,
  Heart,
  History,
  Settings,
  Moon,
  Sun,
} satisfies Record<string, LucideIcon>;

interface IconProps extends SVGProps<SVGSVGElement> {
  icon: keyof typeof iconMap;
  size?: number;
}

export function Icon({ icon, size = 24, ...props }: IconProps) {
  const Component = iconMap[icon];

  if (!Component) {
    console.warn(`Icon "${icon}" not found. Please check the icon name.`);
    return null;
  }

  return <Component size={size} className={""} strokeWidth={2} {...props} />;
}