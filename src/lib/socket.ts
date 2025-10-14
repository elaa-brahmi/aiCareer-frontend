import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export const initSocket = (userId:string): Socket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL , {
      query: { userId: userId },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    socket.on('connect', () => {
      console.log(`Socket connected for user ${userId}`)
    })

    socket.on('welcome', (message: string) => {
      console.log('👋', message)
    })

    socket.on('connect_error', (error: Error) => {
      console.error('Socket connection error:', error.message)
    })

    socket.on('disconnect', () => {
      console.log(' Disconnected from Socket.IO server')
    })
  }
  return socket
}

export const getSocket = (): Socket | null => socket

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect()
    socket = null
    console.log(' Socket disconnected')
  }
}
