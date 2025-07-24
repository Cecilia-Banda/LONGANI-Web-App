const allowRoles = (...allowedRoles) => (req, res, next) => {
  const userRole = req.user.role?.toLowerCase();
  const isAllowed = allowedRoles.map(role =>
    role.toLowerCase() === userRole
  );

  if (!isAllowed) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

export default allowRoles;