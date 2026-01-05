const refreshCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export { refreshCookieOptions };
