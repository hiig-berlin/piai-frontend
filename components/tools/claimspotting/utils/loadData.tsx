//
// This file contains utility functions to load data from the Claimspotting API and Github repo

const DEBUG = false;

// Get channels from Claimspotting Github repo via Github API
// TODO: Add token to avoid rate limiting
// ---------------------------------------------------------------------
export async function loadChannelsFromGithub(
  mode: "extended" | "basic" = "basic"
) {
  const repoOwner = process.env.NEXT_PUBLIC_CLAIMPOSTTING_CHANNEL_USER || "";
  const repoName = process.env.NEXT_PUBLIC_CLAIMPOSTTING_CHANNEL_REPO || "";
  const pathToFolder = process.env.NEXT_PUBLIC_CLAIMPOSTTING_CHANNEL_PATH || "";
  const localStorageKeyInfo = "channel_info";
  const localStorageKeyNames = "channel_names";

  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${pathToFolder}`;

  // Check local storage first
  const cachedNames = localStorage.getItem(localStorageKeyNames);
  const cachedInfo = localStorage.getItem(localStorageKeyInfo);

  // Return cached data if available
  if (mode === "basic" && cachedNames) {
    try {
      const parsedNames = JSON.parse(cachedNames);
      if (Array.isArray(parsedNames) && parsedNames.length > 0) {
        console.log("Returning cached channel names:", parsedNames);
        return parsedNames;
      }
    } catch (error) {
      console.error("Error parsing cached channel names:", error);
    }
  }

  if (mode === "extended" && cachedInfo) {
    try {
      const parsedInfo = JSON.parse(cachedInfo);
      if (Array.isArray(parsedInfo) && parsedInfo.length > 0) {
        console.log("Returning cached channel info:", parsedInfo);
        return parsedInfo;
      }
    } catch (error) {
      console.error("Error parsing cached channel info:", error);
    }
  }

  console.log("Fetching channel data from:", url);

  try {
    // Fetch the list of files in the folder
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch files");
    }

    const files = await response.json();
    console.log("Files:", files);

    // Extract and fetch the content of each JSON file
    const channelInfo = await Promise.all(
      files.map(async (file: { download_url: string | URL | Request }) => {
        const fileResponse = await fetch(file.download_url);
        const fileData = await fileResponse.json();
        return {
          name: fileData.Channel_Name,
          members: fileData.Channel_Members,
          description: fileData.Channel_Description,
        };
      })
    );

    const channelNames = channelInfo.map((channel) => channel.name);

    if (channelNames.length > 0) {
      // Store the fetched data in local storage
      localStorage.setItem(localStorageKeyNames, JSON.stringify(channelNames));
      localStorage.setItem(localStorageKeyInfo, JSON.stringify(channelInfo));
      console.log(
        "Fetched and cached channel names and info:",
        channelNames,
        channelInfo
      );
    }

    // Return either full info or just names based on the mode
    return mode === "extended" ? channelInfo : channelNames;
  } catch (error) {
    console.error("Error fetching channel data:", error);
    throw error;
  }
}

// Load claimlist data from the Claimspotting API
// ---------------------------------------------------------------------
export const loadClaimlistFromAPI = async (
  startDate: string,
  endDate: string,
  page: number = 1,
  channels: string[],
  pagination: boolean = true
) => {
  const params = {
    start_date: startDate,
    end_date: endDate,
    factual: "true",
    pagination: pagination.toString(),
    page: page.toString(),
    telegram_channels: "",
  };

  // Parameters for the GET request
  if (channels.length > 0) params.telegram_channels = channels.toString();

  // Convert the parameters object to a query string
  const url = new URL(process.env.NEXT_PUBLIC_CLAIMSPOTTING_API_LIST as string);
  const queryString = new URLSearchParams(params).toString();

  if (process.env.NODE_ENV === "development")
    DEBUG &&
      console.log(
        "Fetching list data from url: ",
        queryString,
        "with those params",
        params
      );
  try {
    const response = await fetch(`${url}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      if (process.env.NODE_ENV === "development")
        console.log("Data loaded successfully: ", data);
      return { error: null, data: data };
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development")
      console.log("Fetch Error:", error);
    return {
      error:
        "Error loading data. Try to refresh the page, the server might be tempoarily at capacity.",
      data: [],
    };
    // throw error;
  }
};

// Load trend data from the Claimspotting API
// ---------------------------------------------------------------------
export const loadStatsFromAPI = async (
  startDate: string,
  endDate: string,
  channel_names: string[]
) => {
  const params: Record<string, string> = {};

  if (startDate) params.start_day = startDate;
  if (endDate) params.end_day = endDate;
  if (channel_names.length > 0) params.channel_names = channel_names.toString();

  // Convert the parameters object to a query string
  const url = new URL(
    process.env.NEXT_PUBLIC_CLAIMSPOTTING_API_STATS as string
  );
  const queryString = new URLSearchParams(params).toString();
  // Only append query string if it's not empty
  const fullUrl = queryString ? `${url}?${queryString}` : url.toString();

  if (process.env.NODE_ENV === "development")
    console.log(
      "Fetching data from url: ",
      url + queryString,
      "with those params",
      params
    );
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      if (process.env.NODE_ENV === "development")
        console.log("Data loaded successfully: ", data);
      return { error: null, data: data };
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development")
      console.log("Fetch Error:", error);
    return {
      error:
        "Error loading data. Try to refresh the page, the server might be tempoarily at capacity.",
      data: [],
    };
    // throw error;
  }
};

// Load search data from the Claimspotting API
// ---------------------------------------------------------------------
export const loadSeachDataFromAPI = async (queryText: string) => {
  const params = {
    query_text: queryText,
  };

  // Convert the parameters object to a query string
  const url = new URL(
    process.env.NEXT_PUBLIC_CLAIMSPOTTING_API_SEARCH as string
  );
  const queryString = new URLSearchParams(params).toString();

  if (process.env.NODE_ENV === "development")
    console.log(
      "Fetching data from url: ",
      url + queryString,
      "with those params",
      params
    );
  try {
    const response = await fetch(`${url}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      if (process.env.NODE_ENV === "development")
        console.log("Data loaded successfully: ", data);
      return { error: null, data: data };
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development")
      console.log("Fetch Error:", error);
    return {
      error:
        "Error loading data. Try to refresh the page, the server might be tempoarily at capacity.",
      data: [],
    };
    // throw error;
  }
};
