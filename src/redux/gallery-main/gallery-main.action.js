export const fetchGalleries = galleries => ({
  type: "FETCH_GALLERIES",
  galleries: galleries
});

export const upload_gallery = (
  title,
  description,
  location,
  city,
  type_photography,
  is_copyright,
  is_paid,
  user
) => ({
  type: "UPLOAD_GALLERY",
  title: title,
  description: description,
  location: location,
  city: city,
  type_photography: type_photography,
  is_copyright: is_copyright,
  is_paid: is_paid,
  user: parseInt(user)
});

export const upload_image = image => ({
  type: "UPLOAD_IMAGE",
  image: image
});

export const uploadGalleryImages = images => ({
  type: "UPLOAD_GALLERY_IMAGES",
  images: images
});

export const isLoading = () => ({
  type: "IS_LOADING"
});

export const toggleCheck = item => ({
  type: "TOGGLE_CHECK",
  item: item
});

export const check = () => ({
  type: "CHECK"
});
