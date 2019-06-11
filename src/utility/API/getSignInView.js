import API from './api';

const getSignInView = async (eventid) => {
  const res = await API.get("api/signin/GetEventView/", { params: {eventId: eventid}});
  const evId = res.data.signInEventId;
  const evDate = res.data.eventDate;
  const evType = res.data.eventType;
  const signins = res.data.signIns;   
  const employees = res.data.allEmployees;
  const positions = res.data.allPositions;
  const SignInData = 
        { 
            signins: signins, 
            employees: employees,
            positions: positions,
            eventid: evId,
            eventdate: evDate,
            eventtype: evType
        };
  return SignInData;
};

export default getSignInView;
