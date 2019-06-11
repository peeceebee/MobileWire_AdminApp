import API from "./api";

export const createSignInEvent = async body => {
  const request = JSON.stringify(body);
  try {
    const response = await API.post(`api/signin/CreateSignInEvent`, request, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (e) {
    return "Error Creating Event";
  }
};
export const signInEmployee = async body => {
  const request = JSON.stringify(body);
  try {
    const response = await API.post(`api/signin/SignInEmployee`, request, {
      headers: { "Content-Type": "application/json" }
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const signInNewEmployee = async body => {
  const request = JSON.stringify(body);
  try {
    const response = await API.post(`api/signin/SignInNewEmployee`, request, {
      headers: { "Content-Type": "application/json" }
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    return "Error creating employees";
  }
};
export const updateEmployee = async body => {
  const request = JSON.stringify(body);
  try {
    const response = await API.post(`api/settings/UpdateEmployee`, request, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (e) {
    return "Error updating employee!";
  }
};
export const updatePosition = async body => {
  const request = JSON.stringify(body);
  try {
    const response = await API.post(`api/settings/UpdatePosition`, request, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (e) {
    return "Error updating position!";
  }
};

export const getEmpsAndPositns = async () => {
  const res = await API.get("api/settings/GetEmpsAndPos");
  return res.data;
};

export const getEmployees = async () => {
  const res = await API.get("api/settings/GetEmployees");
  return res.data;
};

export const getPositions = async () => {
  const res = await API.get("api/settings/GetPositions");
  return res.data;
};

export const getHomeView = async () => {
  const res = await API.get("api/signin/GetHomeView");
  const events = res.data.events;
  const stDt = res.data.missionStart;
  const endDt = res.data.missionEnd;
  const homeView = { events: events, stDt, endDt };
  return homeView;
};
export const getSignInView = async eventid => {
  const res = await API.get("api/signin/GetEventView/", {
    params: { eventId: eventid }
  });
  const evId = res.data.signInEventId;
  const evDate = res.data.eventDate;
  const evType = res.data.eventType;
  const signins = res.data.signIns;
  const employees = res.data.allEmployees;
  const positions = res.data.allPositions;
  const SignInData = {
    signins: signins,
    employees: employees,
    positions: positions,
    eventid: evId,
    eventdate: evDate,
    eventtype: evType
  };
  return SignInData;
};
