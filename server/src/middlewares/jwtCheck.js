import jwt from "jsonwebtoken";

const jwtCheck = (req, res, next) => {
  req.user = null;

  const { authorization } = req.headers; // Authorization: Bearer accessToken

  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: "Authentication token missing",
    });
  }
  try {
    const accessToken = authorization.split(" ")[1];
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token. Authentication failed.",
    });
  }
};

export default jwtCheck;
