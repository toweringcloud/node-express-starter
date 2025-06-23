export const localsMiddleware = (req, res, next) => {
  console.log(`${Date.now()} | ${req.sessionID}`);
  res.locals.siteTitle = "Nomad Movies";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  next();
};
