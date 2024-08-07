import mongoose from 'mongoose';

const UserNotificationSchema = new mongoose.Schema({
  noticeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notice',
  },
  userId: String,
  seen: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.UserNotification || mongoose.model('UserNotification', UserNotificationSchema);
