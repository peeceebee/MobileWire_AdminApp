import API from "./api";

export const getPositions = async () => {
  const res = await API.get("api/settings/GetPositions");
  return res.data;
};
