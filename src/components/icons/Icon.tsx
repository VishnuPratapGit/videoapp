import *  as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    Home: Icons.Home,
    Flame: Icons.Flame,
    Library: Icons.Library,
    Heart: Icons.Heart,
    History: Icons.History,
};

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