const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'Forbidden: Insufficient role' });
    }
    next();
  };
};

export default allowRoles;
// This middleware checks if the user's role is allowed to access the route