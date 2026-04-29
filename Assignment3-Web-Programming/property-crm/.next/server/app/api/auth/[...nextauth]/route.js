"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fhome%2Fnida-azam%2Fweb_programming%2FWeb-Programming-Tasks%2Fproperty-crm%2Fproperty-crm%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fnida-azam%2Fweb_programming%2FWeb-Programming-Tasks%2Fproperty-crm%2Fproperty-crm&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fhome%2Fnida-azam%2Fweb_programming%2FWeb-Programming-Tasks%2Fproperty-crm%2Fproperty-crm%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fnida-azam%2Fweb_programming%2FWeb-Programming-Tasks%2Fproperty-crm%2Fproperty-crm&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_nida_azam_web_programming_Web_Programming_Tasks_property_crm_property_crm_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"/home/nida-azam/web_programming/Web-Programming-Tasks/property-crm/property-crm/src/app/api/auth/[...nextauth]/route.ts\",\n    nextConfigOutput,\n    userland: _home_nida_azam_web_programming_Web_Programming_Tasks_property_crm_property_crm_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGbmlkYS1hemFtJTJGd2ViX3Byb2dyYW1taW5nJTJGV2ViLVByb2dyYW1taW5nLVRhc2tzJTJGcHJvcGVydHktY3JtJTJGcHJvcGVydHktY3JtJTJGc3JjJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZob21lJTJGbmlkYS1hemFtJTJGd2ViX3Byb2dyYW1taW5nJTJGV2ViLVByb2dyYW1taW5nLVRhc2tzJTJGcHJvcGVydHktY3JtJTJGcHJvcGVydHktY3JtJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUN1RTtBQUNwSjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb3BlcnR5LWRlYWxlci1jcm0vPzdkZTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL2hvbWUvbmlkYS1hemFtL3dlYl9wcm9ncmFtbWluZy9XZWItUHJvZ3JhbW1pbmctVGFza3MvcHJvcGVydHktY3JtL3Byb3BlcnR5LWNybS9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL2hvbWUvbmlkYS1hemFtL3dlYl9wcm9ncmFtbWluZy9XZWItUHJvZ3JhbW1pbmctVGFza3MvcHJvcGVydHktY3JtL3Byb3BlcnR5LWNybS9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fhome%2Fnida-azam%2Fweb_programming%2FWeb-Programming-Tasks%2Fproperty-crm%2Fproperty-crm%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fnida-azam%2Fweb_programming%2FWeb-Programming-Tasks%2Fproperty-crm%2Fproperty-crm&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_db_mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db/mongoose */ \"(rsc)/./src/lib/db/mongoose.ts\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./src/models/User.ts\");\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"Email and password are required\");\n                }\n                await (0,_lib_db_mongoose__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n                const user = await _models_User__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findOne({\n                    email: credentials.email\n                }).select(\"+password\");\n                if (!user) throw new Error(\"No account found with this email\");\n                if (!user.isActive) throw new Error(\"Account is disabled\");\n                const isValid = await user.comparePassword(credentials.password);\n                if (!isValid) throw new Error(\"Invalid password\");\n                return {\n                    id: user._id.toString(),\n                    email: user.email,\n                    name: user.name,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 24 * 60 * 60\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBc0Q7QUFDWTtBQUN4QjtBQUNUO0FBRTFCLE1BQU1JLGNBQStCO0lBQzFDQyxXQUFXO1FBQ1RKLDJFQUFtQkEsQ0FBQztZQUNsQkssTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLElBQUksQ0FBQ0EsYUFBYUMsU0FBUyxDQUFDRCxhQUFhSSxVQUFVO29CQUNqRCxNQUFNLElBQUlFLE1BQU07Z0JBQ2xCO2dCQUVBLE1BQU1YLDREQUFTQTtnQkFFZixNQUFNWSxPQUFPLE1BQU1YLG9EQUFJQSxDQUFDWSxPQUFPLENBQUM7b0JBQUVQLE9BQU9ELFlBQVlDLEtBQUs7Z0JBQUMsR0FBR1EsTUFBTSxDQUFDO2dCQUVyRSxJQUFJLENBQUNGLE1BQU0sTUFBTSxJQUFJRCxNQUFNO2dCQUMzQixJQUFJLENBQUNDLEtBQUtHLFFBQVEsRUFBRSxNQUFNLElBQUlKLE1BQU07Z0JBRXBDLE1BQU1LLFVBQVUsTUFBTUosS0FBS0ssZUFBZSxDQUFDWixZQUFZSSxRQUFRO2dCQUMvRCxJQUFJLENBQUNPLFNBQVMsTUFBTSxJQUFJTCxNQUFNO2dCQUU5QixPQUFPO29CQUNMTyxJQUFJTixLQUFLTyxHQUFHLENBQUNDLFFBQVE7b0JBQ3JCZCxPQUFPTSxLQUFLTixLQUFLO29CQUNqQkYsTUFBTVEsS0FBS1IsSUFBSTtvQkFDZmlCLE1BQU1ULEtBQUtTLElBQUk7Z0JBQ2pCO1lBQ0Y7UUFDRjtLQUNEO0lBQ0RDLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRVosSUFBSSxFQUFFO1lBQ3ZCLElBQUlBLE1BQU07Z0JBQ1JZLE1BQU1OLEVBQUUsR0FBR04sS0FBS00sRUFBRTtnQkFDbEJNLE1BQU1ILElBQUksR0FBRyxLQUFjQSxJQUFJO1lBQ2pDO1lBQ0EsT0FBT0c7UUFDVDtRQUNBLE1BQU1DLFNBQVEsRUFBRUEsT0FBTyxFQUFFRCxLQUFLLEVBQUU7WUFDOUIsSUFBSUEsT0FBTztnQkFDVEMsUUFBUWIsSUFBSSxDQUFDTSxFQUFFLEdBQUdNLE1BQU1OLEVBQUU7Z0JBQzFCTyxRQUFRYixJQUFJLENBQUNTLElBQUksR0FBR0csTUFBTUgsSUFBSTtZQUNoQztZQUNBLE9BQU9JO1FBQ1Q7SUFDRjtJQUNBQyxPQUFPO1FBQ0xDLFFBQVE7UUFDUkMsT0FBTztJQUNUO0lBQ0FILFNBQVM7UUFDUEksVUFBVTtRQUNWQyxRQUFRLEtBQUssS0FBSztJQUNwQjtJQUNBQyxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLGVBQWU7QUFDckMsRUFBRTtBQUVGLE1BQU1DLFVBQVVyQyxnREFBUUEsQ0FBQ0k7QUFDa0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9wZXJ0eS1kZWFsZXItY3JtLy4vc3JjL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzPzAwOTgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoLCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCI7XG5pbXBvcnQgY29ubmVjdERCIGZyb20gXCJAL2xpYi9kYi9tb25nb29zZVwiO1xuaW1wb3J0IFVzZXIgZnJvbSBcIkAvbW9kZWxzL1VzZXJcIjtcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIHByb3ZpZGVyczogW1xuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogXCJjcmVkZW50aWFsc1wiLFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRW1haWwgYW5kIHBhc3N3b3JkIGFyZSByZXF1aXJlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGNvbm5lY3REQigpO1xuXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfSkuc2VsZWN0KFwiK3Bhc3N3b3JkXCIpO1xuXG4gICAgICAgIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKFwiTm8gYWNjb3VudCBmb3VuZCB3aXRoIHRoaXMgZW1haWxcIik7XG4gICAgICAgIGlmICghdXNlci5pc0FjdGl2ZSkgdGhyb3cgbmV3IEVycm9yKFwiQWNjb3VudCBpcyBkaXNhYmxlZFwiKTtcblxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gYXdhaXQgdXNlci5jb21wYXJlUGFzc3dvcmQoY3JlZGVudGlhbHMucGFzc3dvcmQpO1xuICAgICAgICBpZiAoIWlzVmFsaWQpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcGFzc3dvcmRcIik7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpZDogdXNlci5faWQudG9TdHJpbmcoKSxcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkO1xuICAgICAgICB0b2tlbi5yb2xlID0gKHVzZXIgYXMgYW55KS5yb2xlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH0sXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmc7XG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmc7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9LFxuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogXCIvbG9naW5cIixcbiAgICBlcnJvcjogXCIvbG9naW5cIixcbiAgfSxcbiAgc2Vzc2lvbjoge1xuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxuICAgIG1heEFnZTogMjQgKiA2MCAqIDYwLCAvLyAyNCBob3Vyc1xuICB9LFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbn07XG5cbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aChhdXRoT3B0aW9ucyk7XG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH07XG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiY29ubmVjdERCIiwiVXNlciIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsIkVycm9yIiwidXNlciIsImZpbmRPbmUiLCJzZWxlY3QiLCJpc0FjdGl2ZSIsImlzVmFsaWQiLCJjb21wYXJlUGFzc3dvcmQiLCJpZCIsIl9pZCIsInRvU3RyaW5nIiwicm9sZSIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsInBhZ2VzIiwic2lnbkluIiwiZXJyb3IiLCJzdHJhdGVneSIsIm1heEFnZSIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/db/mongoose.ts":
/*!********************************!*\
  !*** ./src/lib/db/mongoose.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable in .env\");\n}\nlet cached = global.mongooseCache;\nif (!cached) {\n    cached = global.mongooseCache = {\n        conn: null,\n        promise: null\n    };\n}\nasync function connectDB() {\n    if (cached.conn) return cached.conn;\n    if (!cached.promise) {\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, {\n            bufferCommands: false\n        });\n    }\n    cached.conn = await cached.promise;\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectDB);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2RiL21vbmdvb3NlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFnQztBQUVoQyxNQUFNQyxjQUFjQyxRQUFRQyxHQUFHLENBQUNGLFdBQVc7QUFFM0MsSUFBSSxDQUFDQSxhQUFhO0lBQ2hCLE1BQU0sSUFBSUcsTUFBTTtBQUNsQjtBQVlBLElBQUlDLFNBQXdCQyxPQUFPQyxhQUFhO0FBRWhELElBQUksQ0FBQ0YsUUFBUTtJQUNYQSxTQUFTQyxPQUFPQyxhQUFhLEdBQUc7UUFBRUMsTUFBTTtRQUFNQyxTQUFTO0lBQUs7QUFDOUQ7QUFFQSxlQUFlQztJQUNiLElBQUlMLE9BQU9HLElBQUksRUFBRSxPQUFPSCxPQUFPRyxJQUFJO0lBRW5DLElBQUksQ0FBQ0gsT0FBT0ksT0FBTyxFQUFFO1FBQ25CSixPQUFPSSxPQUFPLEdBQUdULHVEQUFnQixDQUFDQyxhQUFhO1lBQzdDVyxnQkFBZ0I7UUFDbEI7SUFDRjtJQUVBUCxPQUFPRyxJQUFJLEdBQUcsTUFBTUgsT0FBT0ksT0FBTztJQUNsQyxPQUFPSixPQUFPRyxJQUFJO0FBQ3BCO0FBRUEsaUVBQWVFLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9wZXJ0eS1kZWFsZXItY3JtLy4vc3JjL2xpYi9kYi9tb25nb29zZS50cz82MzQ3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcblxuY29uc3QgTU9OR09EQl9VUkkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSSE7XG5cbmlmICghTU9OR09EQl9VUkkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGRlZmluZSB0aGUgTU9OR09EQl9VUkkgZW52aXJvbm1lbnQgdmFyaWFibGUgaW4gLmVudlwiKTtcbn1cblxuaW50ZXJmYWNlIE1vbmdvb3NlQ2FjaGUge1xuICBjb25uOiB0eXBlb2YgbW9uZ29vc2UgfCBudWxsO1xuICBwcm9taXNlOiBQcm9taXNlPHR5cGVvZiBtb25nb29zZT4gfCBudWxsO1xufVxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby12YXJcbiAgdmFyIG1vbmdvb3NlQ2FjaGU6IE1vbmdvb3NlQ2FjaGU7XG59XG5cbmxldCBjYWNoZWQ6IE1vbmdvb3NlQ2FjaGUgPSBnbG9iYWwubW9uZ29vc2VDYWNoZTtcblxuaWYgKCFjYWNoZWQpIHtcbiAgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlQ2FjaGUgPSB7IGNvbm46IG51bGwsIHByb21pc2U6IG51bGwgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY29ubmVjdERCKCk6IFByb21pc2U8dHlwZW9mIG1vbmdvb3NlPiB7XG4gIGlmIChjYWNoZWQuY29ubikgcmV0dXJuIGNhY2hlZC5jb25uO1xuXG4gIGlmICghY2FjaGVkLnByb21pc2UpIHtcbiAgICBjYWNoZWQucHJvbWlzZSA9IG1vbmdvb3NlLmNvbm5lY3QoTU9OR09EQl9VUkksIHtcbiAgICAgIGJ1ZmZlckNvbW1hbmRzOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNhY2hlZC5jb25uID0gYXdhaXQgY2FjaGVkLnByb21pc2U7XG4gIHJldHVybiBjYWNoZWQuY29ubjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdERCO1xuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiTU9OR09EQl9VUkkiLCJwcm9jZXNzIiwiZW52IiwiRXJyb3IiLCJjYWNoZWQiLCJnbG9iYWwiLCJtb25nb29zZUNhY2hlIiwiY29ubiIsInByb21pc2UiLCJjb25uZWN0REIiLCJjb25uZWN0IiwiYnVmZmVyQ29tbWFuZHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db/mongoose.ts\n");

/***/ }),

/***/ "(rsc)/./src/models/User.ts":
/*!****************************!*\
  !*** ./src/models/User.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    name: {\n        type: String,\n        required: [\n            true,\n            \"Name is required\"\n        ],\n        trim: true,\n        minlength: [\n            2,\n            \"Name must be at least 2 characters\"\n        ],\n        maxlength: [\n            50,\n            \"Name cannot exceed 50 characters\"\n        ]\n    },\n    email: {\n        type: String,\n        required: [\n            true,\n            \"Email is required\"\n        ],\n        unique: true,\n        lowercase: true,\n        trim: true,\n        match: [\n            /^\\S+@\\S+\\.\\S+$/,\n            \"Please provide a valid email\"\n        ]\n    },\n    password: {\n        type: String,\n        required: [\n            true,\n            \"Password is required\"\n        ],\n        minlength: [\n            6,\n            \"Password must be at least 6 characters\"\n        ],\n        select: false\n    },\n    role: {\n        type: String,\n        enum: [\n            \"admin\",\n            \"agent\"\n        ],\n        default: \"agent\"\n    },\n    phone: {\n        type: String,\n        trim: true\n    },\n    isActive: {\n        type: Boolean,\n        default: true\n    }\n}, {\n    timestamps: true\n});\n// Hash password before saving\nUserSchema.pre(\"save\", async function(next) {\n    if (!this.isModified(\"password\")) return next();\n    const salt = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().genSalt(12);\n    this.password = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().hash(this.password, salt);\n    next();\n});\n// Compare password method\nUserSchema.methods.comparePassword = async function(candidatePassword) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().compare(candidatePassword, this.password);\n};\nconst User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbW9kZWxzL1VzZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBNkQ7QUFDL0I7QUFjOUIsTUFBTUcsYUFBYSxJQUFJRiw0Q0FBTUEsQ0FDM0I7SUFDRUcsTUFBTTtRQUNKQyxNQUFNQztRQUNOQyxVQUFVO1lBQUM7WUFBTTtTQUFtQjtRQUNwQ0MsTUFBTTtRQUNOQyxXQUFXO1lBQUM7WUFBRztTQUFxQztRQUNwREMsV0FBVztZQUFDO1lBQUk7U0FBbUM7SUFDckQ7SUFDQUMsT0FBTztRQUNMTixNQUFNQztRQUNOQyxVQUFVO1lBQUM7WUFBTTtTQUFvQjtRQUNyQ0ssUUFBUTtRQUNSQyxXQUFXO1FBQ1hMLE1BQU07UUFDTk0sT0FBTztZQUFDO1lBQWtCO1NBQStCO0lBQzNEO0lBQ0FDLFVBQVU7UUFDUlYsTUFBTUM7UUFDTkMsVUFBVTtZQUFDO1lBQU07U0FBdUI7UUFDeENFLFdBQVc7WUFBQztZQUFHO1NBQXlDO1FBQ3hETyxRQUFRO0lBQ1Y7SUFDQUMsTUFBTTtRQUNKWixNQUFNQztRQUNOWSxNQUFNO1lBQUM7WUFBUztTQUFRO1FBQ3hCQyxTQUFTO0lBQ1g7SUFDQUMsT0FBTztRQUNMZixNQUFNQztRQUNORSxNQUFNO0lBQ1I7SUFDQWEsVUFBVTtRQUNSaEIsTUFBTWlCO1FBQ05ILFNBQVM7SUFDWDtBQUNGLEdBQ0E7SUFBRUksWUFBWTtBQUFLO0FBR3JCLDhCQUE4QjtBQUM5QnBCLFdBQVdxQixHQUFHLENBQUMsUUFBUSxlQUFnQkMsSUFBSTtJQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDQyxVQUFVLENBQUMsYUFBYSxPQUFPRDtJQUN6QyxNQUFNRSxPQUFPLE1BQU16Qix1REFBYyxDQUFDO0lBQ2xDLElBQUksQ0FBQ2EsUUFBUSxHQUFHLE1BQU1iLG9EQUFXLENBQUMsSUFBSSxDQUFDYSxRQUFRLEVBQUVZO0lBQ2pERjtBQUNGO0FBRUEsMEJBQTBCO0FBQzFCdEIsV0FBVzJCLE9BQU8sQ0FBQ0MsZUFBZSxHQUFHLGVBQ25DQyxpQkFBeUI7SUFFekIsT0FBTzlCLHVEQUFjLENBQUM4QixtQkFBbUIsSUFBSSxDQUFDakIsUUFBUTtBQUN4RDtBQUVBLE1BQU1tQixPQUNKbEMsd0RBQWUsQ0FBQ2tDLElBQUksSUFBSWxDLHFEQUFjLENBQVEsUUFBUUc7QUFFeEQsaUVBQWUrQixJQUFJQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvcGVydHktZGVhbGVyLWNybS8uL3NyYy9tb2RlbHMvVXNlci50cz8wOTZkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEsIERvY3VtZW50LCBNb2RlbCB9IGZyb20gXCJtb25nb29zZVwiO1xuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJVXNlciBleHRlbmRzIERvY3VtZW50IHtcbiAgbmFtZTogc3RyaW5nO1xuICBlbWFpbDogc3RyaW5nO1xuICBwYXNzd29yZDogc3RyaW5nO1xuICByb2xlOiBcImFkbWluXCIgfCBcImFnZW50XCI7XG4gIHBob25lPzogc3RyaW5nO1xuICBpc0FjdGl2ZTogYm9vbGVhbjtcbiAgY3JlYXRlZEF0OiBEYXRlO1xuICB1cGRhdGVkQXQ6IERhdGU7XG4gIGNvbXBhcmVQYXNzd29yZChjYW5kaWRhdGVQYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPjtcbn1cblxuY29uc3QgVXNlclNjaGVtYSA9IG5ldyBTY2hlbWE8SVVzZXI+KFxuICB7XG4gICAgbmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCBcIk5hbWUgaXMgcmVxdWlyZWRcIl0sXG4gICAgICB0cmltOiB0cnVlLFxuICAgICAgbWlubGVuZ3RoOiBbMiwgXCJOYW1lIG11c3QgYmUgYXQgbGVhc3QgMiBjaGFyYWN0ZXJzXCJdLFxuICAgICAgbWF4bGVuZ3RoOiBbNTAsIFwiTmFtZSBjYW5ub3QgZXhjZWVkIDUwIGNoYXJhY3RlcnNcIl0sXG4gICAgfSxcbiAgICBlbWFpbDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCBcIkVtYWlsIGlzIHJlcXVpcmVkXCJdLFxuICAgICAgdW5pcXVlOiB0cnVlLFxuICAgICAgbG93ZXJjYXNlOiB0cnVlLFxuICAgICAgdHJpbTogdHJ1ZSxcbiAgICAgIG1hdGNoOiBbL15cXFMrQFxcUytcXC5cXFMrJC8sIFwiUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBlbWFpbFwiXSxcbiAgICB9LFxuICAgIHBhc3N3b3JkOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogW3RydWUsIFwiUGFzc3dvcmQgaXMgcmVxdWlyZWRcIl0sXG4gICAgICBtaW5sZW5ndGg6IFs2LCBcIlBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgNiBjaGFyYWN0ZXJzXCJdLFxuICAgICAgc2VsZWN0OiBmYWxzZSxcbiAgICB9LFxuICAgIHJvbGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGVudW06IFtcImFkbWluXCIsIFwiYWdlbnRcIl0sXG4gICAgICBkZWZhdWx0OiBcImFnZW50XCIsXG4gICAgfSxcbiAgICBwaG9uZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdHJpbTogdHJ1ZSxcbiAgICB9LFxuICAgIGlzQWN0aXZlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICB9LFxuICB9LFxuICB7IHRpbWVzdGFtcHM6IHRydWUgfVxuKTtcblxuLy8gSGFzaCBwYXNzd29yZCBiZWZvcmUgc2F2aW5nXG5Vc2VyU2NoZW1hLnByZShcInNhdmVcIiwgYXN5bmMgZnVuY3Rpb24gKG5leHQpIHtcbiAgaWYgKCF0aGlzLmlzTW9kaWZpZWQoXCJwYXNzd29yZFwiKSkgcmV0dXJuIG5leHQoKTtcbiAgY29uc3Qgc2FsdCA9IGF3YWl0IGJjcnlwdC5nZW5TYWx0KDEyKTtcbiAgdGhpcy5wYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKHRoaXMucGFzc3dvcmQsIHNhbHQpO1xuICBuZXh0KCk7XG59KTtcblxuLy8gQ29tcGFyZSBwYXNzd29yZCBtZXRob2RcblVzZXJTY2hlbWEubWV0aG9kcy5jb21wYXJlUGFzc3dvcmQgPSBhc3luYyBmdW5jdGlvbiAoXG4gIGNhbmRpZGF0ZVBhc3N3b3JkOiBzdHJpbmdcbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICByZXR1cm4gYmNyeXB0LmNvbXBhcmUoY2FuZGlkYXRlUGFzc3dvcmQsIHRoaXMucGFzc3dvcmQpO1xufTtcblxuY29uc3QgVXNlcjogTW9kZWw8SVVzZXI+ID1cbiAgbW9uZ29vc2UubW9kZWxzLlVzZXIgfHwgbW9uZ29vc2UubW9kZWw8SVVzZXI+KFwiVXNlclwiLCBVc2VyU2NoZW1hKTtcblxuZXhwb3J0IGRlZmF1bHQgVXNlcjtcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlNjaGVtYSIsImJjcnlwdCIsIlVzZXJTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwidHJpbSIsIm1pbmxlbmd0aCIsIm1heGxlbmd0aCIsImVtYWlsIiwidW5pcXVlIiwibG93ZXJjYXNlIiwibWF0Y2giLCJwYXNzd29yZCIsInNlbGVjdCIsInJvbGUiLCJlbnVtIiwiZGVmYXVsdCIsInBob25lIiwiaXNBY3RpdmUiLCJCb29sZWFuIiwidGltZXN0YW1wcyIsInByZSIsIm5leHQiLCJpc01vZGlmaWVkIiwic2FsdCIsImdlblNhbHQiLCJoYXNoIiwibWV0aG9kcyIsImNvbXBhcmVQYXNzd29yZCIsImNhbmRpZGF0ZVBhc3N3b3JkIiwiY29tcGFyZSIsIlVzZXIiLCJtb2RlbHMiLCJtb2RlbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/models/User.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fhome%2Fnida-azam%2Fweb_programming%2FWeb-Programming-Tasks%2Fproperty-crm%2Fproperty-crm%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fnida-azam%2Fweb_programming%2FWeb-Programming-Tasks%2Fproperty-crm%2Fproperty-crm&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();