import API from './api';

const WebServiceGet = (url, params) => {
  return API.get(url, params)
    .then(function(response) {
      //    console.log(response, "ws response");
      return {
        viewdata: response.data,
        successful: true,
        error: null
      };
    })
    .catch(function(err) {
      //  console.log(err, "ws err");
      if (!(err.message === null) && err.message === "Network Error") {
        return {
          viewdata: null,
          successful: false,
          error: "Network connection is not available."
        };
      }
      if (err.response !== "undefined") {
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

export default WebServiceGet;
