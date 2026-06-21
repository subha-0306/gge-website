const Notification = require("../models/Notification");

/**
 * @desc    Get latest 20 notifications
 * @route   GET /api/notifications
 * @access  Admin
 */
const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("enquiryId", "fullName serviceType");

    res.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Mark a single notification as read
 * @route   PATCH /api/notifications/:id/read
 * @access  Admin
 */
const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      const error = new Error("Notification not found");
      error.statusCode = 404;
      throw error;
    }

    notification.isRead = true;
    await notification.save();

    res.json({
      success: true,
      message: "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Mark all notifications as read
 * @route   PATCH /api/notifications/read-all
 * @access  Admin
 */
const markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ isRead: false }, { isRead: true });

    res.json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
};
