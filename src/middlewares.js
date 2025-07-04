import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  console.log(`${Date.now()} | ${req.sessionID}`);
  res.locals.siteTitle = "Vanilla Movies";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  next();
};

export const protector = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnly = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "files/avatars/",
  limits: { fileSize: 3000000 },
});

export const movieUpload = multer({
  dest: "files/movies/",
  limits: { fileSize: 30000000 },
});
