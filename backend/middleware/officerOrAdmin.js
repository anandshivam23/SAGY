export const officerOrAdmin = (req, res, next) => {
    if (req.user.role === "admin" || req.user.role === "officer") {
        next();
    } else {
        res.status(403).json({ message: "Admin or Officer access only" });
    }
};
