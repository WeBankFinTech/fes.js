
import { createFesApp } from '@webank/fes-core';

// import LayoutPlugin from '@webank/fes-plugin-layout';
// import { createRequest } from '@webank/fes-plugin-request';

// addPlugin(LayoutPlugin);

// addPlugin(createRequest({
//     options: {
//         baseURL: ''
//     },
//     // some options
//     responseDataStruct: {

//     },
//     errorHandler: {
//         404: () => {

//         },
//         403: (ctx) => {
//             ctx.router.push('/login');
//         },
//         401: () => {

//         },
//         502: () => {

//         },
//         otherCode: (error) => {
//             window.Toast(error.message);
//         }
//     }
// }));

createFesApp({
    // routes: [
    //     { path: '/', component: Home }
    // ]
    // some options
});
