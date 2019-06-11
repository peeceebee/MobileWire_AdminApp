import API from "./api";

const createSignInEvent = async body => {
  const request = JSON.stringify(body);
  try {
    const response = await API.post(`api/signin/CreateSignInEvent`, request, {
      headers: { "Content-Type": "application/json" }
    });
    console.log(response); 
    return response.data;
  } catch (e) {
    return 'Error Creating Event'
  }
};

export default createSignInEvent;
