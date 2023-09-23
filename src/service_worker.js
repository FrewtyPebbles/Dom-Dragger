// Cached core static resources 
self.addEventListener("install",e=>{
	e.waitUntil(
		caches.open("static").then(cache=>{
		return cache.addAll(["../",'../assets/dom_dragger_logo_prototype_192x192.png']);
		})
	);
});
  
// Fetch resources
self.addEventListener("fetch",e=>{
	e.respondWith(
		caches.match(e.request).then(response=>{
		return response||fetch(e.request);
		})
	);
});