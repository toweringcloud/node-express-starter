export const localsMiddleware = (req, res, next) => {
  console.log(req.sessionID);
  res.locals.siteTitle = "The Movies";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  next();
};
