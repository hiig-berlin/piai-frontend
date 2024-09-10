export async function getChannels(
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

    const channelNames = channelInfo.map(channel => channel.name);

    if (channelNames.length > 0) {
      // Store the fetched data in local storage
      localStorage.setItem(localStorageKeyNames, JSON.stringify(channelNames));
      localStorage.setItem(localStorageKeyInfo, JSON.stringify(channelInfo));
      console.log("Fetched and cached channel names and info:", channelNames, channelInfo);
    }

    // Return either full info or just names based on the mode
    return mode === "extended" ? channelInfo : channelNames;
  } catch (error) {
    console.error("Error fetching channel data:", error);
    throw error;
  }
}
