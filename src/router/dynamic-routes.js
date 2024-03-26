export default [

    // ====   摄像头管理   ====
    {path: 'deviceInfo', name: 'DeviceInfo', component: () => import('@/views/data/device/deviceInfo.vue')},

    //  ===   设备数据   ====
    {path: 'deviceInfo', name: 'DeviceInfo', component: () => import('@/views/data/device/deviceInfo.vue')},
    {path: 'editDeviceInfo', name: 'EditDeviceInfo', component: () => import('@/views/data/device/editDeviceInfo.vue')},
    {path: 'addDeviceInfo', name: 'AddDeviceInfo', component: () => import('@/views/data/device/addDeviceInfo.vue')},

    //  ===   事件数据   ===
    {path: 'eventInfo', name: 'EventInfo', component: () => import('@/views/data/event/eventInfo.vue')},
    {path: 'editEventInfo', name: 'EditEventInfo', component: () => import('@/views/data/event/editEventInfo.vue')},
    {path: 'addEventInfo', name: 'AddEventInfo', component: () => import('@/views/data/event/addEventInfo.vue')},

    //  ===   用户管理  ===
    {path: 'userManage', name: 'UserManage', component: () => import('@/views/user/userManage.vue')},
    {path: 'roleManage', name: 'RoleManage', component: () => import('@/views/user/roleManage.vue')},

    // // ===   图像管理  ===
    // {path: 'imagesList', name: 'ImagesList', component: () => import('@/views/images/imagesList.vue')},

    //  ===   系统管理  ===
    {path: 'systemMenu', name: 'SystemMenu', component: () => import('@/views/system/systemMenu.vue')},
    // {path: 'systemDictionary', name: 'SystemDictionary', component: () => import('@/views/system/systemDictionary.vue')}
]
