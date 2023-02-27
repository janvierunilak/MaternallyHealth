const endpoints = {
    LOGIN: '/api/v1/User/login',
    LOGOUT: '/api/v1/User/logout',
    PROFILE:'/api/v1/User/profile',
    SIGNUP:'/api/v1/User/signup',
    ADDTIP:'/api/v1/HealthTips/add',
    ADDMOTHER:'/api/v1/mothers/add',
    ADDHOSPITAL:'/api/v1/hospital/add',
    GETALLTIPS:'/api/v1/HealthTips/all',
    GETALLMOTHERS:'/api/v1/mothers/all',
    GETALLHOSPITALS:'/api/v1/hospital/all',
    GETMOTHERBYPHONE:'/api/v1/mothers/phone/',
    GETMOTHERCHILDREN:'/api/v1/Baby/mother/',
    ADDCHILD:'/api/v1/Baby/add'
};

export default endpoints;