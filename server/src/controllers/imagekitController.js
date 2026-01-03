import imagekit from "./../configs/imagekit.js";

const getImageKitAuth = (req, res) => {
  const imagekitAuthParams = imagekit.getAuthenticationParameters();

  if (imagekitAuthParams) {
    res.status(200).json(imagekitAuthParams);
  }
};

export default getImageKitAuth;
