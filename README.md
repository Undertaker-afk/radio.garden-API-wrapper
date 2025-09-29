# radio.garden-API-wrapper
API wrapper for the live radio site radio.garden
Wrapper endpoint https://radio-api-fast.vercel.app/

# How to use the Radio Garden API

This document explains how to use the unofficial Radio Garden API to search for radio stations and retrieve their stream URLs based on the provided JSON data.

**Disclaimer:** This API is not officially documented or supported by Radio Garden. It can be protected by measures that may block direct server-to-server requests. The following guide assumes you can make successful requests, for example from a browser environment or a similar client.

## 1. Searching for a Radio Station

To search for a radio station, you need to make a GET request to the search API endpoint.

**Endpoint:** `https://radio.garden/api/search/secure`

**Query Parameter:**
*   `q`: Your search term (e.g., "BBC").

**Example Request:**
```
https://radio.garden/api/search/secure?q=BBC
```

### Search Result Structure

The API will return a JSON object containing the search results. From the data you provided, here is an example snippet for one hit:

```json
{
    "hits": {
        "hits": [
            {
                "_source": {
                    "page": {
                        "url": "/listen/bbc-world-service/FXyhz9Xk",
                        "title": "BBC World Service"
                    }
                }
            }
        ]
    }
}
```

From each item in the `hits.hits` array, you need to extract the `url` from the `_source.page` object. The last part of this URL path is the **Channel ID**.

For the example URL `/listen/bbc-world-service/FXyhz9Xk`, the Channel ID is `FXyhz9Xk`.

## 2. Getting the Live Stream URL

Once you have the Channel ID, you can construct the URL to get the actual live stream.

**Endpoint Structure:** `https://radio.garden/api/ara/content/listen/{channelId}/channel.mp3`

Replace `{channelId}` with the ID you extracted from the search result.

**Example Request:**
For the Channel ID `FXyhz9Xk` (BBC World Service), the request URL would be:
```
https://radio.garden/api/ara/content/listen/FXyhz9Xk/channel.mp3
```

Making a request to this URL will typically result in a redirect (HTTP 302) to the actual `.mp3` stream URL, which you can then use in a media player.
