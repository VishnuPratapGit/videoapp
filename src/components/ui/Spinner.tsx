import { twMerge } from "tailwind-merge";

const Spinner = ({className}:{className?: string}) => {
    return (
        <div className={twMerge("animate-spin rounded-full h-6 w-6 border-2 border-t-transparent", className)}></div>
    )
}

export default Spinner;