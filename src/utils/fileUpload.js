import { CLOUDINARY_URL } from "./constants";

export const fileUpload = async (file) => {
  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const resp = await fetch(CLOUDINARY_URL + "/upload", {
      method: "POST",
      body: formData,
    });

    if (resp.ok) {
      const cloudResp = await resp.json();
      return cloudResp.secure_url;
    } else {
      throw await resp.json();
    }
  } catch (error) {
    throw error.message;
  }
  //return url de la img
};
