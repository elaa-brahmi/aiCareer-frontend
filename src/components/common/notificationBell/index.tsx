import { useNotifications } from '@/hooks/useNotification'

const NotificationBell= ({ userId }: { userId: string }) => {
  const { notifications, markAsRead } = useNotifications(userId)

  return (
    <div className="relative">
      <button className="relative">
        🔔
        {notifications.some(n => !n.seen) && (
          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
        )}
      </button>

      <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg">
        {notifications.map(n => (
          <div
            key={n.id}
            onClick={() => markAsRead(n.id)}
            className={`p-2 cursor-pointer ${n.seen ? 'opacity-60' : 'bg-gray-100'}`}
          >
            {n.message}
          </div>
        ))}
      </div>
    </div>
  )
}
export default NotificationBell
