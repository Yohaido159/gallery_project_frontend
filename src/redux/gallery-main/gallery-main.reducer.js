import { ToggleItemOnList } from "./gallery-main.utils";

const INITIAL_STATE = {
  galleries: {},
  upload: {},
  image: undefined,
  images: undefined,
  isLoading: false,
  listCheck: [],
  check: false
};

const galleriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_GALLERIES":
      return {
        ...state,
        galleries: action.galleries
      };

    case "TOGGLE_CHECK":
      return {
        ...state,
        listCheck: ToggleItemOnList(state.listCheck, action.item)
      };

    case "CHECK":
      console.log("ddd");
      return {
        ...state,
        check: !state.check
      };

    case "UPLOAD_GALLERY":
      return {
        ...state,
        upload: {
          title: action.title,
          image_gallery: action.image_gallery,
          description: action.description,
          location: action.location,
          city: action.city,
          type_photography: action.type_photography,
          is_copyright: action.is_copyright,
          is_paid: action.is_paid,
          user: action.user
        }
      };

    case "UPLOAD_IMAGE":
      return {
        ...state,
        image: action.image
      };

    case "UPLOAD_GALLERY_IMAGES":
      return {
        ...state,
        images: action.images
      };

    case "IS_LOADING":
      return {
        ...state,
        isLoading: !state.isLoading
      };

    default:
      return state;
  }
};

export default galleriesReducer;
