import { NavLink, useLocation } from 'react-router-dom';
//import Logo from '@/assets/logo.png';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import * as Icons from "lucide-react";
import type { FC, SVGProps } from "react";

interface SidebarOptionProps {
    desktop?: boolean;
    avatar?: boolean;
    icon: string | IconComponentType;
    to: string;
    label: string;
}

type IconComponentType = FC<SVGProps<SVGSVGElement>>;

function SidebarOption({ desktop, avatar, icon, to, label }: SidebarOptionProps) {
    const location = useLocation();
    const isActive = to ? location.pathname.startsWith(to) : false;

    const IconComponent = getIconComponent(icon);

    if (desktop && avatar) {
        return (
            <NavLink 
                to={to || ''} 
                className="w-full h-full flex items-center justify-center"
            >
                <img 
                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0O6sSLyEC-5aOPjKFbZvmavGU7MgzoF-0Uw&s"} 
                    alt={label}
                    className="w-22 h-22 object-contain"
                />
            </NavLink>
        );
    }

    return (
        <>
            {!desktop ? (
                <NavLink 
                    to={to || ''} 
                    className={`flex flex-col justify-center items-center w-1/6 m-3 lg:m-6 ${isActive ? 'text-yellow' : 'text-white'}`}
                >
                    <div className={`flex justify-center items-center ${isActive ? 'text-yellow' : 'text-white'}`}>
                        {IconComponent && <IconComponent className="w-6 h-6 lg:w-10 lg:h-10" />}
                    </div>
                    <div className={`mt-1 lg:mt-2 text-xs lg:text-2xl font-semibold ${isActive ? 'text-yellow' : 'text-white'}`}>
                        {label}
                    </div>
                </NavLink>
            ) : (
                <TooltipProvider delayDuration={100} skipDelayDuration={500}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <NavLink 
                                to={to || ''} 
                                className={`flex justify-center items-center w-full aspect-square rounded-full`}
                            >    
                                {IconComponent && <IconComponent className={`w-10 h-10 ${isActive ? 'text-yellow' : 'text-white'}`} />}
                            </NavLink>
                        </TooltipTrigger>
                        <TooltipContent side="left" sideOffset={12} className="border-lightgreen border-2">
                            <div className="text-lightgreen text-md font-semibold">{label}</div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </>
    );
}

export default SidebarOption;

function getIconComponent(icon: string | IconComponentType): IconComponentType | null {
    if (typeof icon === "string") {
        // Aqui precisamos converter "Icons" para unknown antes para evitar o erro de incompatibilidade
        const lucideIcons = Icons as unknown as Record<string, IconComponentType>;
        return lucideIcons[icon] || Icons.Ellipsis;
    }
    return icon;
}
