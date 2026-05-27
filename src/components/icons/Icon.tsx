import { Home, Flame, Library, Heart, History, LucideIcon, Settings } from "lucide-react";

const iconMap = {
  Home,
  Flame,
  Library,
  Heart,
  History,
  Settings,
} satisfies Record<string, LucideIcon>;

interface IconProps {
    icon: keyof typeof iconMap;
    size?: number;
    className?: string;
}

export function Icon({ icon, size = 24, className = '' }: IconProps) {
    const Component = iconMap[icon];

    if(!Component){
        console.warn(`Icon "${icon}" not found. Please check the icon name.`);
        return null;
    }

    return <Component size={size} className={className} strokeWidth={2} />;
}