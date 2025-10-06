import { Briefcase, FileChartColumnIncreasing, MessageCircle, TrendingUp } from "lucide-react"

const PopularTopics = async () => {
    return (
        <div className="flex flex-col gap-4 bg-white p-3 rounded-lg shadow-md">
            <h3>Popular Topics</h3>
            <div>
                <Briefcase className="inline text-[var(--dark-amber)] mr-2" size={7} />
                <span>Interview Preparation</span>
            </div>
            <div>
                <FileChartColumnIncreasing className="inline text-[var(--dark-amber)] mr-2" size={7} />
                <span>Resume Optimization</span>
            </div>
            <div>
                <TrendingUp className="inline text-[var(--dark-amber)] mr-2" size={7} />
                <span>Career Development</span>
            </div>
            <div>
                <MessageCircle className="inline text-[var(--dark-amber)] mr-2" size={7} />
                <span>Networking Tips</span>
            </div>

        </div>
    )
}
export default PopularTopics