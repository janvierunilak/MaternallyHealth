const settings = {
    backendURLLocal: "http://localhost:8080",
    backendURLRemote:"http://197.243.25.120:8080/api/v1/"
}
const status = {
    LOADING: 1,
    DONE: 2,
    ERROR: 3,
    NOTHING: 4
};
const dasBoardMenu = {
    USERS: 1,
    DASHBOARD: 2,
    ERROR: 3,
    NOTHING: 4
};
export default {
    backendURL:settings.backendURLRemote,
    status,
    dasBoardMenu
}