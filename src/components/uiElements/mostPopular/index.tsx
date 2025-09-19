import { Crown } from "lucide-react"

const PopularBadge = () =>{
    return (
        <div className="rounded-lg bg-[var(--dark-amber)] text-white flex items-center justify-center gap-1 w-32 h-5">
            <Crown className="text-white h-4 w-4" />
            <p className="text-white font-semibold text-xs">Most Popular</p>
        </div>
    )
}
export default PopularBadge