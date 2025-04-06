const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: '*', // Allow all origins for now
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    const origin = socket.handshake.headers.origin;
    const userAgent = socket.handshake.headers['user-agent'];

    console.log(`✅ Client connected: ${socket.id}`);
    console.log(`🌐 Origin header: ${origin}`);
    console.log(`🧠 User-Agent: ${userAgent}`);
    console.log(`📦 Full headers:`, socket.handshake.headers);

    // 🔓 TEMPORARILY DISABLED: Block unknown origins
    /*
    const allowedOrigins = ['http://localhost:5173'];
    if (!origin || !allowedOrigins.includes(origin)) {
      console.warn(`⛔ Blocked connection from untrusted origin: ${origin}`);
      socket.disconnect(true);
      return;
    }
    */

    // Handle custom join event
    socket.on('user-client-join', async (data) => {
      console.log("🔍 Type of received data:", typeof data);
      console.log("🔍 Raw data:", data);
      console.log("📡 From socket:", socket.id);

      const { userId, userType } = data || {};
      if (!userId || !userType) {
        console.warn(`⛔ Invalid 'user-client-join' from ${socket.id}:`, data);
        return;
      }

      console.log(`➡️ ${userType} ${userId} joined via ${socket.id}`);

      try {
        const model = userType === 'user' ? userModel : captainModel;
        const updated = await model.findByIdAndUpdate(
          userId,
          { socketId: socket.id },
          { new: true }
        );

        if (updated) {
          console.log(`✅ Saved socketId for ${userType}: ${updated._id}`);
        } else {
          console.warn(`⚠️ Could not find ${userType} with ID: ${userId}`);
        }
      } catch (err) {
        console.error(`❌ Error saving socket ID:`, err.message);
      }
    });

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });
}

module.exports = { initializeSocket };
