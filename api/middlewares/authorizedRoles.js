const authorizedRoles = (allowedRoles) => {
  return async (req, res, next) => {
    const { role } = req.user;

    if (!allowedRoles.includes(role)) {
      return res
        .status(403)
        .json({ error: "Access denied. Unauthorized role." });
    }

    next();
  };
};
module.exports = authorizedRoles;
