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
  CircleUserRound,
  ArrowLeft,
  Plus,
  TvMinimalPlay,
  X,
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
  CircleUserRound,
  ArrowLeft,
  Plus,
  TvMinimalPlay,
  X
} satisfies Record<string, LucideIcon>;

interface IconProps extends SVGProps<SVGSVGElement> {
  icon: string;
  size?: number;
}

export function Icon({ icon, size = 24, ...props }: IconProps) {
  const normalizedIcon = icon as keyof typeof iconMap;
  const Component = iconMap[normalizedIcon];

  if (!Component) {
    console.warn(`Icon "${icon}" not found. Please check the icon name.`);
    return null;
  }

  return <Component size={size} className={""} strokeWidth={2} {...props} />;
}
