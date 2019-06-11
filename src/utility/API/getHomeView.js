import API from "./api";
const getHomeView = async () => {
  const res = await API.get("api/signin/GetHomeView");
  const events = res.data.events;
  const stDt = res.data.missionStart;
  const endDt = res.data.missionEnd;
  const homeView = { events: events, startDate: stDt, endDate: endDt };
  console.log(homeView); 
  return homeView;
};
export default getHomeView;
