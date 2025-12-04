const UserAuth = (req, res, next) => {
  console.log("User Auth is being checked");
  const userToken = "xyz";
  const isUser = userToken === "xyz";
  if (!isUser) {
    return res.status(401).send("Unauthorized Access");
  } else {
    next();
  }
};

const adminAuth = (req, res, next) => {
  console.log("Admin Auth is being checked");
  const userToken = "xyz";
  const isUser = userToken === "xyz";
  if (!isUser) {
    return res.status(401).send("Unauthorized Access");
  } else {
    next();
  }
};

module.exports = {
  UserAuth,
  adminAuth,
};
