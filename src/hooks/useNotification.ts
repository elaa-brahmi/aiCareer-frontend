'use client'
import { useEffect, useState } from 'react'

import { initSocket } from '@/lib/socket'
import type { Notification } from '@/types/notificationType'
import {
  getNotifications,
  markNotificationAsRead,
} from '@/services/notificationService'

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // fetch notifs
  useEffect(() => {
    if (!userId) {
      return
    }

    console.log(`Fetching notifications for userId: ${userId}`)
    ;(async () => {
      try {
        const data = await getNotifications()
        console.log(' Fetched notifications:', data.notifications)
        setNotifications(data.notifications || [])
      } catch (err) {
        console.error(' Failed to load notifications:', err)
      }
    })()
  }, [userId])

  // realtime
  useEffect(() => {
    if (!userId) {
      return
    }

    console.log(`Initializing socket for userId: ${userId}`)
    const socket = initSocket(userId)

    socket.on('connect', () => {
      console.log(`Socket Connected: id=${socket.id}`)
    })

    socket.on('disconnect', reason => {
      console.log(`Socket Disconnected: reason=${reason}`)
    })

    socket.on('connect_error', (error: Error) => {
      console.error(`Socket Connection error:`, error.message)
    })

    socket.on('welcome', (message: string) => {
      console.log('Socket Welcome message received:', message)
    })

    socket.on('new-notification', (notif: Notification) => {
      setNotifications(prev => [notif, ...prev])
    })

    return () => {
      socket.removeAllListeners()
    }
  }, [userId])

  // actions
  const markAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId)
      setNotifications(prev => prev.map(n => (n.id === notificationId ? { ...n, seen: true } : n)))
    } catch (err) {
      console.error('Failed to mark as read:', err)
    }
  }

 /*  const markAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead()
      setNotifications(prev => prev.map(n => ({ ...n, seen: true })))
    } catch (err) {
      console.error('Failed to mark all as read:', err)
    }
  } */

  /* const sendTest = async () => {
    try {
      await sendTestNotification(userId)
    } catch (err) {
      console.error('Failed to send test notification:', err)
    }
  }

  const getByCategory = (category: Notification['category']) =>
    notifications.filter(n => n.category === category)

  return {
    notifications,
    markAsRead,
    markAllAsRead,
    sendTest,
    getByCategory,
  } */
}
