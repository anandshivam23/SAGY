export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    console.log(`Access Denied for user: ${req.user?.email}, role: ${req.user?.role}`);
    return res.status(403).json({ message: "Admin only access" });
  }
  next();
};
