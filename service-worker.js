const CACHE_NAME = "kasku-v2";

const urlsToCache = [
"./",
"./index.html",
"./style.css",
"./app.js",
"./manifest.json",
"./img_iconkas.png"
];

self.addEventListener("install", function(event){

event.waitUntil(
caches.open(CACHE_NAME)
.then(function(cache){
return cache.addAll(urlsToCache);
})
);

self.skipWaiting();

});

self.addEventListener("activate", function(event){

event.waitUntil(
caches.keys().then(function(cacheNames){
return Promise.all(
cacheNames.map(function(cache){
if(cache !== CACHE_NAME){
return caches.delete(cache);
}
})
);
})
);

});

self.addEventListener("fetch", function(event){

event.respondWith(
caches.match(event.request)
.then(function(response){
return response || fetch(event.request);
})
);

});
