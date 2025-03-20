const { default: mongoose } = require('mongoose')

const messagesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (email) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email),
        message: 'Please provide a valid email address',
      },
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: (phone) => /^\d{10,15}$/.test(phone),
        message: 'Please provide a valid phone number (10-15 digits)',
      },
    },
    message: {
      type: String,
      trim: true,
    },
    sentAt: {
      type: Date,
      default: Date.now, // Varsayılan olarak tarih atar
    },
    isRead: {
      type: Boolean,
      default: false, // İlk gönderimde varsayılan olarak 'okunmadı'
    },
  },
  { timestamps: true }, // Otomatik zaman damgaları
)

module.exports = mongoose.model('Message', messagesSchema)
