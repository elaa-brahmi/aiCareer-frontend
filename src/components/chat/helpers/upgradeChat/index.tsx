import Link from "next/link";

const UpgradeChat = () => {
    return(
        <div className=" mx-auto p-6 bg-white rounded-xl w-[300px] shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Need More Help?</h2>
            <p className="text-gray-600 mb-4">
                rate limit up to 15 messages, consider upgrading to premium.
            </p>
            <button className="bg-[var(--dark-amber)] text-white font-semibold py-2 px-4 rounded-md transition-colors">
                <Link href="/pricing">
                Upgrade to Premium</Link>
            </button>
        </div>

    )
}
export default UpgradeChat;