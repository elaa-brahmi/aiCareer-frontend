const BotLoader = () => {
  return (
    <div className="flex flex-row gap-1">
    <div className="w-1 h-1 rounded-full bg-[var(--dark-amber)] animate-bounce"></div>
    <div className="w-1 h-1 rounded-full bg-[var(--dark-amber)] animate-bounce [animation-delay:-.3s]"></div>
    <div className="w-1 h-1 rounded-full bg-[var(--dark-amber)] animate-bounce [animation-delay:-.5s]"></div>
    </div>
    );
};

export default BotLoader;