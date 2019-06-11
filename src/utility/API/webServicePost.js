import API from "./api";

const WebServicePost = (url, params) => {
  return API.post(url, params, {
    headers: { "Content-Type": "application/json" }
  })
    .then(function(response) {
      // console.log(response, "ws response");
      return {
        viewdata: response.data,
        successful: true,
        error: null
      };
    })
    .catch(function(err) {
      // console.log(err.response, "ws err");
      if (!(err.message === null) && err.message === "Network Error") {
        return {
          viewdata: null,
          successful: false,
          error: "Network connection is not available."
        };
      }
      if (err.response !== "undefined") {
        if (err.response.status === 400)
          return {
            viewdata: null,
            successful: false,
            error: err.response.data
          };
        else
          return {
            viewdata: null,
            successful: false,
            error: err.message
          };
      }
      return {
        viewdata: null,
        successful: false,
        error: "No internet connection or server is not available"
      };
    });
};

export default WebServicePost;
