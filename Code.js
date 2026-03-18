function moveFilesByAnimal() {
  const SOURCE_FOLDER_ID = "1U30kiozuwPLEx_edKO79hu4JKZKCQgPj"; // Replace with actual source folder ID
  const DESTINATION_FOLDER_ID = "1xRHsXFHepDyMouaIweregq5Fj8oC9Mm1"; // Replace with actual destination folder ID
  const LOG_SHEET_ID = "1zAxyKpRPALKzw1Ufz0Yuw9fUlO8QVdxmjIY5qz0kBRc"; // Google Sheet for logging moves
 
  // Define mapping of animal names to their respective destination folder IDs
  const animalFolderMap = {
    "alex": "1ac748zdPNsSC_2Nqch6-cWiyPMQ_vDmN",
    "badger": "1Wk4ixK_IoxXv-gzDiE6oBsLIDn82mkr1",
    "bat": "1-pSaAkL2kOflPU1EVmb6vnwkjhFklJgp",
    "beaver": "1EqCb-J65HAghIjEaqlL8kgPXhRb2mpz-",
    "blackbird": "1EhcUuztPJARdku0YuNtN5BpochhjU_OS",
    "blackcap": "10rmyt9yvj_dTg8vbYas364Mic6y6iVus",
    "bird of prey": "11jLxiKHddK0F4a1YUQfAMfLMZOeLEfI3",
    "bird to ID": "1CoB1Swy1AkfV3JjSdScA8PXrn1e_1Kls",
    "boar": "1htup-ETopOq3yJzGQ_b6eRFKUbG6-m9M",
    "bullfinch": "10rmyt9yvj_dTg8vbYas364Mic6y6iVus",
    "buzzard": "11jLxiKHddK0F4a1YUQfAMfLMZOeLEfI3",
    "cat": "1qRpIC6k9vglMZ3RbO16yOxDbFX9a8cYc",
    "chaffinch": "10rmyt9yvj_dTg8vbYas364Mic6y6iVus",
    "chiffchaff": "10rmyt9yvj_dTg8vbYas364Mic6y6iVus",
    "crow": "19MNQunDuyQBJgSFJvoUlWk1NRDO49Dkk",
    "damselfly": "1i6fDdtt05Ua6PJZilw_gqyMWHJE-0TFJ",
    "damselflies": "1i6fDdtt05Ua6PJZilw_gqyMWHJE-0TFJ",
    "dan": "1ac748zdPNsSC_2Nqch6-cWiyPMQ_vDmN",
    "deer": "1CHerwMZHM-k8EokrZRQWAnJ30aefzw0l",
    "dog": "1qRpIC6k9vglMZ3RbO16yOxDbFX9a8cYc",
    "dogs": "1qRpIC6k9vglMZ3RbO16yOxDbFX9a8cYc",
    "duckling": "1bckcCWZCZh6RHIX61rjyvmLxsYb06Mtq",
    "dunnock": "10rmyt9yvj_dTg8vbYas364Mic6y6iVus",
    "egret": "1-pmegBNnYlwrdMYvDvx1NJE2k9ar2X9H",
    "fallow deer": "1ronlEz1lL0w2hZDtu2h0cjZYhBwOnEV7",
    "fieldfare": "1EhcUuztPJARdku0YuNtN5BpochhjU_OS",
    "fox": "1fzMbKvvlSqL7OCTJnVg5ksUwq-KjCKii",
    "geese": "1r72eqfmVaJuHgoIBRs1yUGM6XmCbeowE",
    "goldfinch": "10rmyt9yvj_dTg8vbYas364Mic6y6iVus",
    "goose": "1r72eqfmVaJuHgoIBRs1yUGM6XmCbeowE",
    "hare": "1ZFetQONyq9I6ErHwObKeG7Vk8405zRGK",
    "hayley": "1ac748zdPNsSC_2Nqch6-cWiyPMQ_vDmN",
    "hedgehog": "17yUrAAC7GlT9eLCrSQYfo2rPINmW623o",
    "heron": "1-pmegBNnYlwrdMYvDvx1NJE2k9ar2X9H",
    "human": "1ac748zdPNsSC_2Nqch6-cWiyPMQ_vDmN",
    "insect": "1i6fDdtt05Ua6PJZilw_gqyMWHJE-0TFJ",
    "jackdaw": "19MNQunDuyQBJgSFJvoUlWk1NRDO49Dkk",
    "jan": "1ac748zdPNsSC_2Nqch6-cWiyPMQ_vDmN",
    "jay": "19MNQunDuyQBJgSFJvoUlWk1NRDO49Dkk",
    "jen": "1ac748zdPNsSC_2Nqch6-cWiyPMQ_vDmN",
    "jeremy": "1ac748zdPNsSC_2Nqch6-cWiyPMQ_vDmN",
    "kestrel": "11jLxiKHddK0F4a1YUQfAMfLMZOeLEfI3",
    "kingfisher": "1nMi0IbQvmtEXUALMrtuOGTKY0gvW6V_S",
    "lbj": "10rmyt9yvj_dTg8vbYas364Mic6y6iVus",
    "linnet": "10rmyt9yvj_dTg8vbYas364Mic6y6iVus",
    "location": "1RsKAfZMKuA4VCIHFVGk5FQaaHeFhdj-Z",
    "magpie": "19MNQunDuyQBJgSFJvoUlWk1NRDO49Dkk",
    "mallard": "1bckcCWZCZh6RHIX61rjyvmLxsYb06Mtq",
    "mammal": "1tsnUWkirhpHbJJgpNn4LNxycdsQuyCet",
    "mandarin": "1232pE_xpCtej4SWzhB6mugHRv3XHsiKS",
    "martin": "1ac748zdPNsSC_2Nqch6-cWiyPMQ_vDmN",
    "mink": "1Uw_c4DMpVLkWCRdfdW6wHlIiGViW5-Wf",
    "moorhen": "1YTdnUMr8C7PWOFrA2X92vmmXUNO-719P",
    "moth": "1i6fDdtt05Ua6PJZilw_gqyMWHJE-0TFJ",
    "mouse": "1dJp7e4qcUXorce9FC1m3Ljp-YIhsF09F",
    "muntjac": "1fvEtWSoqPbUUjxNHmVYYiI83vNpWcqRx",
    "nuthatch": "10rmyt9yvj_dTg8vbYas364Mic6y6iVus",
    "olli": "1ac748zdPNsSC_2Nqch6-cWiyPMQ_vDmN",
    "orange tip": "1i6fDdtt05Ua6PJZilw_gqyMWHJE-0TFJ",
    "otter": "10_G1TxqnFvUJckh9sdgfPK4SOao32c6X",
    "owl": "11jLxiKHddK0F4a1YUQfAMfLMZOeLEfI3",
    "partridge": "1WKMObhZ4ZvLbH2zxL0DF6Zb4jLdRFotR",
    "people": "1ac748zdPNsSC_2Nqch6-cWiyPMQ_vDmN",
    "person": "1ac748zdPNsSC_2Nqch6-cWiyPMQ_vDmN",
    "pheasant": "1WKMObhZ4ZvLbH2zxL0DF6Zb4jLdRFotR",
    "pig": "1cr44pt48d7vbj72Kz8SjU81CeJqJ8YzX",
    "pigeon": "12ctmHqiBnfOja2NAYCJdahnHiUiPfH--",
    "pine marten": "10E6HXyppo704Kf6qE1PqZDmjgCm6SUyQ",
    "rabbit": "1ZFetQONyq9I6ErHwObKeG7Vk8405zRGK",
    "rat": "11uhXAcuKIRfKQnyEWuevHaFwSu09XzjZ",
    "raven": "19MNQunDuyQBJgSFJvoUlWk1NRDO49Dkk",
    "red deer": "1ronlEz1lL0w2hZDtu2h0cjZYhBwOnEV7",
    "redwing": "1EhcUuztPJARdku0YuNtN5BpochhjU_OS",
    "redstart": "10rmyt9yvj_dTg8vbYas364Mic6y6iVus",
    "robin": "1v_G5qIPe8VS0J1OW9zJCYzcnToGd3C78",
    "rodent": "1-foY6t8tMj2BgMwUBgQCZc0pKqjS0vq3",
    "roe": "1aUrW6c4LCHOBrfFiVmt-5lHOaNrfMAx6",
    "rosa": "1ac748zdPNsSC_2Nqch6-cWiyPMQ_vDmN",
    "snipe": "1xQVXOOiMYF45nH7EtT90vJb1NH9n9RmY",
    "someone": "1ac748zdPNsSC_2Nqch6-cWiyPMQ_vDmN",
    "sparrow": "10rmyt9yvj_dTg8vbYas364Mic6y6iVus",
    "sparrowhawk": "11jLxiKHddK0F4a1YUQfAMfLMZOeLEfI3",
    "squirrel": "1d5KWt0D-sAFlD2Jl_IJ3GQN5_b1KCiR3",
    "stoat": "1mxc2Z9_Z_UHUFDaPFh2Iw-9kfeDEQUVF",
    "stonechat": "1mCgBh-38EhdGSCoYOtdoOuqPAc6YWcDF",
    "tawny": "11jLxiKHddK0F4a1YUQfAMfLMZOeLEfI3",
    "thrush": "1EhcUuztPJARdku0YuNtN5BpochhjU_OS",
    "tit": "10rmyt9yvj_dTg8vbYas364Mic6y6iVus",
    "treecreeper": "10rmyt9yvj_dTg8vbYas364Mic6y6iVus",
    "tom": "1ac748zdPNsSC_2Nqch6-cWiyPMQ_vDmN",
    "view": "1RsKAfZMKuA4VCIHFVGk5FQaaHeFhdj-Z",
    "vole": "1dJp7e4qcUXorce9FC1m3Ljp-YIhsF09F",
    "wagtail": "16tFQaClozPzQwvZ-Hc1aUQp2jNl9KMQv",
    "weasel": "1mxc2Z9_Z_UHUFDaPFh2Iw-9kfeDEQUVF",
    "woodpecker": "1OxbfQid62Qdc4HtD73cxZ11hZKvzO8Cu",
    "wren": "10rmyt9yvj_dTg8vbYas364Mic6y6iVus"
  };
 
  // Folders that use camera + year + month structure (Species → Camera Year → Camera Month-Year → Files)
  const CAMERA_MONTH_YEAR_FOLDERS = new Set([
    "1EqCb-J65HAghIjEaqlL8kgPXhRb2mpz-"  // Beaver
  ]);
  
  // Folders that use year + camera structure (Species → Year → Camera → Files)
  const YEAR_CAMERA_FOLDERS = new Set([
    "10_G1TxqnFvUJckh9sdgfPK4SOao32c6X",  // Otter
    "1Wk4ixK_IoxXv-gzDiE6oBsLIDn82mkr1"   // Badger
  ]);
  
  // All other folders use year-only structure by default (Species → Year → Files)
 
  // Pre-compile all animal name regexes for performance (avoids repeated regex creation)
  const animalRegexMap = new Map();
  for (const animal in animalFolderMap) {
    const regex = new RegExp(`\\b${animal}s?\\b[.,!?]*`, "i");
    animalRegexMap.set(animal, { regex: regex, folderId: animalFolderMap[animal] });
  }
 
  // Folder cache to avoid repeated API calls for the same folder IDs
  const folderCache = new Map();
  
  // Path cache to store folder paths for logging
  const pathCache = new Map();
 
  try {
    Logger.log("Fetching source and destination folders...");
    const sourceFolder = DriveApp.getFolderById(SOURCE_FOLDER_ID);
    const destinationFolder = DriveApp.getFolderById(DESTINATION_FOLDER_ID);
    
    // Initialize the log sheet and ensure headers exist
    const logSheet = initializeLogSheet(LOG_SHEET_ID);
   
    Logger.log("Scanning source folder...");
    const stats = { processed: 0, moved: 0, skipped: 0, errors: 0 };
    scanSubfolders(sourceFolder, animalRegexMap, CAMERA_MONTH_YEAR_FOLDERS, YEAR_CAMERA_FOLDERS, folderCache, pathCache, logSheet, stats);
    
    Logger.log("Cleaning up empty folders...");
    const deletedCount = deleteEmptyFolders(sourceFolder);
    Logger.log(`Deleted ${deletedCount} empty folders.`);
    
    Logger.log("File processing complete.");
    Logger.log(`Summary: ${stats.processed} files processed, ${stats.moved} moved, ${stats.skipped} skipped, ${stats.errors} errors, ${deletedCount} empty folders deleted`);
  } catch (error) {
    Logger.log(`Error: ${error.message}`);
  }
}

// Initialize the log sheet and add headers if needed
function initializeLogSheet(sheetId) {
  const spreadsheet = SpreadsheetApp.openById(sheetId);
  let sheet = spreadsheet.getActiveSheet();
  
  // Check if headers exist, if not create them
  if (sheet.getLastRow() === 0) {
    const headers = [
      "Timestamp",
      "Filename",
      "File ID",
      "Source Folder Path",
      "Destination Folder Path",
      "Animal Matched",
      "Folder Structure Type",
      "Camera Name",
      "Date Extracted",
      "File Size (MB)",
      "File Extension",
      "File Creation Date",
      "Move Status",
      "Error Message",
      "Processing Time (ms)"
    ];
    sheet.appendRow(headers);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#4285F4");
    headerRange.setFontColor("#FFFFFF");
  }
  
  return sheet;
}

// Log a file move operation to the Google Sheet
function logToSheet(sheet, logData) {
  const row = [
    logData.timestamp,
    logData.filename,
    logData.fileId,
    logData.sourcePath,
    logData.destinationPath,
    logData.animalMatched,
    logData.folderStructureType,
    logData.cameraName,
    logData.dateExtracted,
    logData.fileSizeMB,
    logData.fileExtension,
    logData.fileCreationDate,
    logData.moveStatus,
    logData.errorMessage,
    logData.processingTime
  ];
  
  sheet.appendRow(row);
}

// Get the full path of a folder for logging purposes
function getFolderPath(folder, pathCache) {
  const folderId = folder.getId();
  
  // Check cache first
  if (pathCache.has(folderId)) {
    return pathCache.get(folderId);
  }
  
  // Build path from folder hierarchy
  const pathParts = [];
  let currentFolder = folder;
  
  try {
    // Traverse up to root, collecting folder names
    while (currentFolder.getName() !== "My Drive") {
      pathParts.unshift(currentFolder.getName());
      const parents = currentFolder.getParents();
      if (parents.hasNext()) {
        currentFolder = parents.next();
      } else {
        break;
      }
    }
  } catch (error) {
    // If we can't get full path, just use the folder name
    pathCache.set(folderId, folder.getName());
    return folder.getName();
  }
  
  const fullPath = pathParts.join(" / ");
  pathCache.set(folderId, fullPath);
  return fullPath;
}
 
// Recursively scan all subfolders
function scanSubfolders(parentFolder, animalRegexMap, cameraMonthYearFolders, yearCameraFolders, folderCache, pathCache, logSheet, stats) {
  const subfolders = parentFolder.getFolders();
  const ignoreKeywords = ["don't move", "ignore"];
 
  while (subfolders.hasNext()) {
    const subfolder = subfolders.next();
    const subfolderName = subfolder.getName().toLowerCase();
 
    // Skip folders that include ignore terms in their name
    if (ignoreKeywords.some(keyword => subfolderName.includes(keyword))) {
      Logger.log(`Skipping folder: ${subfolder.getName()} (Contains ignore keyword)`);
      continue;
    }
 
    processFiles(subfolder, animalRegexMap, cameraMonthYearFolders, yearCameraFolders, folderCache, pathCache, logSheet, stats);
    scanSubfolders(subfolder, animalRegexMap, cameraMonthYearFolders, yearCameraFolders, folderCache, pathCache, logSheet, stats);
  }
}
 
function processFiles(folder, animalRegexMap, cameraMonthYearFolders, yearCameraFolders, folderCache, pathCache, logSheet, stats) {
  const files = folder.getFiles();
  const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv', '.webm'];
 
  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    const fileNameLower = fileName.toLowerCase();
    const startTime = new Date().getTime();
 
    stats.processed++;
    
    // Initialize log data object
    const logData = {
      timestamp: new Date(),
      filename: fileName,
      fileId: file.getId(),
      sourcePath: getFolderPath(folder, pathCache),
      destinationPath: "",
      animalMatched: "",
      folderStructureType: "",
      cameraName: "",
      dateExtracted: "",
      fileSizeMB: (file.getSize() / (1024 * 1024)).toFixed(2),
      fileExtension: fileName.substring(fileName.lastIndexOf('.')),
      fileCreationDate: file.getDateCreated(),
      moveStatus: "",
      errorMessage: "",
      processingTime: 0
    };
 
    // Check for known video file extensions (case-insensitive)
    let isVideo = videoExtensions.some(ext => fileNameLower.endsWith(ext));
 
    // If no known extension, check MIME type as a fallback
    if (!isVideo) {
      try {
        const mimeType = file.getMimeType();
        isVideo = mimeType && mimeType.startsWith("video/");
      } catch (error) {
        Logger.log(`Warning: Could not determine MIME type for ${fileName}: ${error.message}`);
      }
    }
 
    // Skip if not a video
    if (!isVideo) {
      stats.skipped++;
      logData.moveStatus = "Skipped";
      logData.errorMessage = "Not a video file";
      logData.processingTime = new Date().getTime() - startTime;
      logToSheet(logSheet, logData);
      Logger.log(`Skipped: ${fileName} (Not a video file)`);
      continue;
    }
 
    // Identify the appropriate destination folder for this file
    const animalMatch = getAnimalMatch(fileNameLower, animalRegexMap);
    if (!animalMatch) {
      stats.skipped++;
      logData.moveStatus = "Skipped";
      logData.errorMessage = "No matching animal found";
      logData.processingTime = new Date().getTime() - startTime;
      logToSheet(logSheet, logData);
      Logger.log(`Skipped: ${fileName} (No matching animal found)`);
      continue;
    }
    
    logData.animalMatched = animalMatch.animal;
    const targetFolderId = animalMatch.folderId;
 
    // Route to appropriate folder structure based on species
    try {
      let destinationInfo;
      
      // Check if this species uses camera + month + year structure (Beaver)
      if (cameraMonthYearFolders.has(targetFolderId)) {
        logData.folderStructureType = "Camera-Month-Year";
        destinationInfo = getOrCreateCameraMonthYearFolder(file, targetFolderId, folderCache);
        if (!destinationInfo) {
          throw new Error("Could not determine camera/month/year folder structure");
        }
      } 
      // Check if this species uses year + camera structure (Otter, Badger)
      else if (yearCameraFolders.has(targetFolderId)) {
        logData.folderStructureType = "Year-Camera";
        destinationInfo = getOrCreateYearCameraFolder(file, targetFolderId, folderCache);
        if (!destinationInfo) {
          throw new Error("Could not determine year/camera folder structure");
        }
      } 
      // Default: year-only structure (all other species)
      else {
        logData.folderStructureType = "Year-Only";
        destinationInfo = getOrCreateYearFolder(file, targetFolderId, folderCache);
        if (!destinationInfo) {
          throw new Error("Could not determine year folder structure");
        }
      }
      
      // Populate log data with destination information
      logData.cameraName = destinationInfo.cameraName || "";
      logData.dateExtracted = destinationInfo.dateExtracted || "";
      
      const destinationFolder = getCachedFolder(destinationInfo.folderId, folderCache);
      logData.destinationPath = getFolderPath(destinationFolder, pathCache);
      
      // Move the file
      moveFileToFolder(file, destinationInfo.folderId, folderCache);
      stats.moved++;
      logData.moveStatus = "Success";
      
    } catch (error) {
      stats.errors++;
      logData.moveStatus = "Error";
      logData.errorMessage = error.message;
      Logger.log(`Error processing ${fileName}: ${error.message}`);
    }
    
    logData.processingTime = new Date().getTime() - startTime;
    logToSheet(logSheet, logData);
  }
}

// Get animal match with animal name for logging
function getAnimalMatch(fileNameLower, animalRegexMap) {
  for (const [animal, data] of animalRegexMap) {
    if (data.regex.test(fileNameLower)) {
      return { animal: animal, folderId: data.folderId };
    }
  }
  return null;
}

// Extract year from filename or use file creation date
function extractYear(file) {
  const fileName = file.getName();
  const words = fileName.split(" ");
  
  // Look for 6-digit date (DDMMYY) in second word
  if (words.length >= 2) {
    const datePart = words[1].match(/^\d{6}$/);
    if (datePart) {
      const yearSuffix = datePart[0].substring(4, 6); // Last 2 digits
      const monthIndex = datePart[0].substring(2, 4);
      
      // Validate month
      const monthNum = parseInt(monthIndex, 10);
      if (monthNum >= 1 && monthNum <= 12) {
        return {
          fullYear: `20${yearSuffix}`,
          yearSuffix: yearSuffix,
          monthIndex: monthIndex,
          dateString: datePart[0],
          source: "filename"
        };
      }
    }
  }
  
  // Fallback: use file creation date
  Logger.log(`Warning: Could not parse date from filename "${fileName}", using file creation date`);
  const createdDate = file.getDateCreated();
  const yearSuffix = createdDate.getFullYear().toString().slice(-2);
  const monthIndex = String(createdDate.getMonth() + 1).padStart(2, '0');
  
  return {
    fullYear: createdDate.getFullYear().toString(),
    yearSuffix: yearSuffix,
    monthIndex: monthIndex,
    dateString: null,
    source: "file creation date"
  };
}

// Extract camera name from filename
function extractCameraName(file) {
  const fileName = file.getName();
  const words = fileName.split(" ");
  return words.length > 0 ? words[0] : null;
}

// Structure: Species → Year → Camera Year → Camera Month-Year → Files (Beaver only)
function getOrCreateCameraMonthYearFolder(file, parentFolderId, folderCache) {
  const cameraName = extractCameraName(file);
  if (!cameraName) {
    Logger.log(`Warning: Could not extract camera name from "${file.getName()}"`);
    return null;
  }
  
  const yearData = extractYear(file);
  const yearFolderName = yearData.fullYear;                                   // e.g., "2025"
  const monthYear = `${yearData.monthIndex}${yearData.yearSuffix}`;           // e.g., "0625"
  const cameraYearFolderName = `${cameraName} ${yearData.fullYear}`;          // e.g., "DAM3 2025"
  const cameraMonthYearFolderName = `${cameraName} ${monthYear}`;             // e.g., "DAM3 0625"
 
  // First, get or create the year folder (e.g., "2025")
  const yearFolderId = getOrCreateFolder(parentFolderId, yearFolderName, folderCache);
  
  // Then, get or create the camera + year folder within it (e.g., "DAM3 2025")
  const cameraYearFolderId = getOrCreateFolder(yearFolderId, cameraYearFolderName, folderCache);
  
  // Finally, get or create the camera + month-year folder within that (e.g., "DAM3 0625")
  const finalFolderId = getOrCreateFolder(cameraYearFolderId, cameraMonthYearFolderName, folderCache);
  
  return {
    folderId: finalFolderId,
    cameraName: cameraName,
    dateExtracted: yearData.dateString || yearData.source
  };
}

// Structure: Species → Year → Camera → Files (Otter, Badger)
function getOrCreateYearCameraFolder(file, parentFolderId, folderCache) {
  const cameraName = extractCameraName(file);
  if (!cameraName) {
    Logger.log(`Warning: Could not extract camera name from "${file.getName()}"`);
    return null;
  }
  
  const yearData = extractYear(file);
  const yearFolderName = yearData.fullYear;  // e.g., "2025"
  
  // First, get or create the year folder (e.g., "2025")
  const yearFolderId = getOrCreateFolder(parentFolderId, yearFolderName, folderCache);
  
  // Then, get or create the camera folder within it (e.g., "DAM3")
  const finalFolderId = getOrCreateFolder(yearFolderId, cameraName, folderCache);
  
  return {
    folderId: finalFolderId,
    cameraName: cameraName,
    dateExtracted: yearData.dateString || yearData.source
  };
}

// Structure: Species → Year → Files (All other species - DEFAULT)
function getOrCreateYearFolder(file, parentFolderId, folderCache) {
  const yearData = extractYear(file);
  const yearFolderName = yearData.fullYear;  // e.g., "2025"
  
  // Get or create the year folder (e.g., "2025")
  const finalFolderId = getOrCreateFolder(parentFolderId, yearFolderName, folderCache);
  
  return {
    folderId: finalFolderId,
    cameraName: null,  // No camera tracking for year-only structure
    dateExtracted: yearData.dateString || yearData.source
  };
}
 
function getOrCreateFolder(parentFolderId, folderName, folderCache) {
  // Check cache first to avoid repeated API calls
  const cacheKey = `${parentFolderId}:${folderName}`;
  if (folderCache.has(cacheKey)) {
    return folderCache.get(cacheKey);
  }
  
  const parentFolder = getCachedFolder(parentFolderId, folderCache);
  const subfolders = parentFolder.getFoldersByName(folderName);
 
  let folderId;
  // If folder exists, return its ID; otherwise create and return new
  if (subfolders.hasNext()) {
    folderId = subfolders.next().getId();
  } else {
    Logger.log(`Creating new folder: ${folderName}`);
    folderId = parentFolder.createFolder(folderName).getId();
  }
  
  // Cache the result for future lookups
  folderCache.set(cacheKey, folderId);
  return folderId;
}
 
function getCachedFolder(folderId, folderCache) {
  // Cache folder objects to avoid repeated getFolderById calls
  const folderCacheKey = `folder:${folderId}`;
  if (folderCache.has(folderCacheKey)) {
    return folderCache.get(folderCacheKey);
  }
  
  const folder = DriveApp.getFolderById(folderId);
  folderCache.set(folderCacheKey, folder);
  return folder;
}
 
function moveFileToFolder(file, targetFolderId, folderCache) {
  const targetFolder = getCachedFolder(targetFolderId, folderCache);
  file.moveTo(targetFolder);
  Logger.log(`Moved file: ${file.getName()} → ${targetFolder.getName()}`);
}

// Recursively delete empty folders within a parent folder
function deleteEmptyFolders(parentFolder) {
  let deletedCount = 0;
  const ignoreKeywords = ["don't move", "ignore"];
  const subfolders = parentFolder.getFolders();
  
  // Process folders recursively (depth-first to delete child folders before parents)
  while (subfolders.hasNext()) {
    const folder = subfolders.next();
    const folderName = folder.getName();
    const folderNameLower = folderName.toLowerCase();
    
    // Skip folders that include ignore terms in their name
    if (ignoreKeywords.some(keyword => folderNameLower.includes(keyword))) {
      Logger.log(`Skipping folder cleanup: ${folderName} (Contains ignore keyword)`);
      continue;
    }
    
    // First, recursively delete empty subfolders within this folder
    deletedCount += deleteEmptyFolders(folder);
    
    // After processing subfolders, check if this folder is now empty
    if (isFolderEmpty(folder)) {
      try {
        folder.setTrashed(true);
        Logger.log(`Deleted empty folder: ${folderName}`);
        deletedCount++;
      } catch (error) {
        Logger.log(`Error deleting folder ${folderName}: ${error.message}`);
      }
    }
  }
  
  return deletedCount;
}

// Check if a folder is completely empty (no files and no subfolders)
function isFolderEmpty(folder) {
  const hasFiles = folder.getFiles().hasNext();
  const hasSubfolders = folder.getFolders().hasNext();
  return !hasFiles && !hasSubfolders;
}