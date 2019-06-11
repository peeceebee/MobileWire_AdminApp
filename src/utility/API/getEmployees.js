import API from "./api";

export const getEmployees = async () => {
    const res = await API.get("api/settings/GetEmployees")
    return res.data;
}