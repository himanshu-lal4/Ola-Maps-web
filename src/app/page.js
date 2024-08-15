// "use client";
// import { useEffect, useState } from "react";
// import DeckGL from "@deck.gl/react";
// import StaticMap from "react-map-gl";
// import maplibregl from "maplibre-gl";

// import Head from "next/head";
// import "maplibre-gl/dist/maplibre-gl.css";

// const App = () => {
//   const [viewState, setViewState] = useState({
//     longitude: 0,
//     latitude: 0,
//     zoom: 1,
//   });
//   const [accessToken, setAccessToken] = useState(null);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const searchText = "goa"; // Replace with your actual search text

//   useEffect(() => {
//     async function fetchToken() {
//       try {
//         const response = await fetch(
//           "https://account.olamaps.io/realms/olamaps/protocol/openid-connect/token",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: new URLSearchParams({
//               grant_type: "client_credentials",
//               scope: "openid",
//               client_id: "cf220934-619a-4c4d-815c-5cec174e3e35", // Replace with your actual client ID
//               client_secret: "OKQW09r6Yir1SAXpyUWLicx5jAW3XpA0", // Replace with your actual client secret
//             }),
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch access token");
//         }

//         const data = await response.json();
//         setAccessToken(data.access_token);
//         console.log("Access Token:", data.access_token); // Log the access token

//         // Fetch data using the access token
//         const apiResponse = await fetch(
//           `https://api.olamaps.io/places/v1/autocomplete?input=${searchText}`,
//           {
//             headers: {
//               Authorization: `Bearer ${data.access_token}`,
//             },
//           }
//         );

//         if (!apiResponse.ok) {
//           throw new Error("Failed to fetch API data");
//         }

//         const apiData = await apiResponse.json();
//         setData(apiData);
//         console.log("API Data:", apiData); // Log the API response
//       } catch (error) {
//         setError(error.message);
//         console.error("Error:", error);
//       }
//     }

//     fetchToken();
//   }, [searchText]);
//   return (
//     <div>
//       <Head>
//         {/* Map style does not need to be linked here */}
//         {/* <link
//           href="https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json"
//           rel="stylesheet"
//         /> */}
//       </Head>
//       <DeckGL
//         style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
//         viewState={viewState}
//         onViewStateChange={({ viewState }) => setViewState(viewState)}
//         controller={true}
//         layers={[]}>
//         <StaticMap
//           mapLib={maplibregl}
//           mapStyle="https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json"
//           transformRequest={(url, resourceType) => {
//             if (resourceType === "Style" && !url.includes("api_key")) {
//               url += url.includes("?") ? "&" : "?";
//               url += `api_key=JlEtCfQXkXpTaDMsvrTCEl9kWGGccSwhObU8R3Gy`;
//             }
//             return { url, resourceType };
//           }}
//         />
//       </DeckGL>
//     </div>
//   );
// };

// export default App;

"use client";
import { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import StaticMap from "react-map-gl";
import maplibregl from "maplibre-gl";

import Head from "next/head";
import "maplibre-gl/dist/maplibre-gl.css";

const App = () => {
  const [viewState, setViewState] = useState({
    longitude: 78.9629, // Longitude for the center of India
    latitude: 20.5937, // Latitude for the center of India
    zoom: 4, // Zoom level (adjust as needed)
    pitch: 0,
    bearing: 0,
  });
  const [accessToken, setAccessToken] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const searchText = "goa"; // Replace with your actual search text

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch(
          "https://account.olamaps.io/realms/olamaps/protocol/openid-connect/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "client_credentials",
              scope: "openid",
              client_id: "cf220934-619a-4c4d-815c-5cec174e3e35", // Replace with your actual client ID
              client_secret: "OKQW09r6Yir1SAXpyUWLicx5jAW3XpA0", // Replace with your actual client secret
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch access token");
        }

        const data = await response.json();
        setAccessToken(data.access_token);
        console.log("Access Token:", data.access_token); // Log the access token

        // Fetch data using the access token
        const apiResponse = await fetch(
          `https://api.olamaps.io/places/v1/autocomplete?input=${searchText}`,
          {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          }
        );

        if (!apiResponse.ok) {
          throw new Error("Failed to fetch API data");
        }

        const apiData = await apiResponse.json();
        setData(apiData);
        console.log("API Data:", apiData); // Log the API response
      } catch (error) {
        setError(error.message);
        console.error("Error:", error);
      }
    }

    fetchToken();
  }, [searchText]);

  return (
    <div>
      <Head>
        <title>Map View</title>
      </Head>
      <DeckGL
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
        viewState={viewState}
        onViewStateChange={({ viewState }) => setViewState(viewState)}
        controller={true}
        layers={[]}>
        <StaticMap
          mapLib={maplibregl}
          mapStyle="https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json"
          transformRequest={(url, resourceType) => {
            if (!url.includes("?")) {
              url = url + "?api_key=JlEtCfQXkXpTaDMsvrTCEl9kWGGccSwhObU8R3Gy";
            } else {
              url = url + "&api_key=JlEtCfQXkXpTaDMsvrTCEl9kWGGccSwhObU8R3Gy";
            }
            return { url, resourceType };
          }}
        />
      </DeckGL>
    </div>
  );
};

export default App;
