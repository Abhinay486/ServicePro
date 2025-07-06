const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.userType !== role) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
};

export default checkRole;
