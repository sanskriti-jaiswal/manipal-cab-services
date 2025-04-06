const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: '*',
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

    socket.on('user-client-join', async (data) => {
      console.log("🔍 Received 'user-client-join' data type:", typeof data);
      console.log("🔍 Received data:", data);

      if (typeof data === 'string') {
        try {
          console.warn("⚠️ Received string instead of object, attempting to parse...");
          data = JSON.parse(data);
        } catch (err) {
          console.error("❌ Error processing join event:", err.message);
          return;
        }
      }

      const { userId, userType } = data || {};

      if (!userId || !userType) {
        console.warn(`⛔ Invalid payload (not an object) from ${socket.id}`);
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
