const { getUser } = require("../service.js/auth");

async function restrictToLoggedinAdminOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  console.log("all cookie", req.cookies);
  console.log("useruid", userUid);
  if (!userUid)
    return res.status(400).json({ error: "You should login First" });
  const user = getUser(userUid);
  if (!user) return res.status(400).json({ error: "You should login First" });

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinAdminOnly,
  checkAuth,
};
