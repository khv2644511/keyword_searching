export async function setCachedData(cacheName, url, response) {
  const cacheStorage = await caches.open(cacheName);
  const init = {
    headers: {
      "Content-Type": "application/json, application/json; charset=utf-8",
      "content-length": "2",
    },
  };
  const clonedResponse = new Response(JSON.stringify(response), init);
  console.log("clonedResponse", clonedResponse);
  await cacheStorage.put(url, clonedResponse);

  return;
}

export async function getCachedData(cacheName, url) {
  try {
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);

    if (!cachedResponse || !cachedResponse.ok) {
      return false;
    }

    return await cachedResponse.json();
  } catch (error) {
    console.error("Error while getting data from cache:", error);
    return false;
  }
}
