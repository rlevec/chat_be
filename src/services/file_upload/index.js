import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { handleRequestQueryValidationAction } from "../../validators/index.js";
import { handleUploadProfilePictureAction } from "../upload_profile_picture/index.js";
import { handleThrowNewErrorAction } from "../../utils/index.js";
import { handleBroadcastFormDataEventAction } from "../broadcast_form_data_event/index.js";

// Helper function for safe file name sanitization
const sanitizeFileName = (filename) => {
  return filename.replace(/[^a-zA-Z0-9-_\.]/g, ""); // allows alphanumeric, dashes, underscores, and dots
};

export const handleFileUploadAction = async (client, req, io) => {
  const { query, files } = req;

  // Validate the query parameters

  await handleRequestQueryValidationAction(query);

  const { formDataName, username, directoryName } = query;

  if (!username) handleThrowNewErrorAction(400, "Missing username parameter");

  // Fetch user data based on the provided username
  const userExistsQuery = "SELECT * FROM users WHERE username = $1";
  const userExistsResponse = await client.query(userExistsQuery, [username]);

  const userExists = userExistsResponse?.rows?.length > 0;
  const userId = userExistsResponse?.rows?.[0]?.id;

  const userIdStringified = userId?.toString();

  if (!userExists) handleThrowNewErrorAction(404, "Account not found");


  // Ensure files are provided
  if (!files || !files[formDataName]) {
    return {
      status: 400,
      error: true,
      message: "No files were uploaded.",
      removePreview: true,
      removeImage: true,
      imageFrontendSlug: formDataName,
    };
  }

  // Retrieve the file from the form-data name
  const file = files[formDataName];
  const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp"];
  const fileExtension = path.extname(file.name).toLowerCase();

  // Validate file extension
  if (!allowedExtensions.includes(fileExtension)) {
    return {
      status: 400,
      error: true,
      message: "Invalid file type. Only images are allowed.",
      removePreview: true,
      removeImage: true,
      imageFrontendSlug: formDataName,
    };
  }

  // Define directory and file paths
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const safeDirectoryName = sanitizeFileName(directoryName);
  const uploadDir = path.join(
    __dirname,
    `../../public/images/${safeDirectoryName}`
  );

  const safeUserIdStringified = sanitizeFileName(userIdStringified);
  const fileName = `${safeUserIdStringified}${fileExtension}`;
  const uploadPath = path.join(uploadDir, fileName);

  const fileStaticPath = `/images/${safeDirectoryName}/${fileName}`;

  try {
    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Security check: Make sure the path is within the allowed directory (prevents directory traversal)
    if (
      !uploadPath.startsWith(path.resolve(__dirname, "../../public/images"))
    ) {
      return {
        status: 400,
        error: true,
        message: "Invalid upload path detected.",
        removePreview: true,
        removeImage: true,
        imageFrontendSlug: formDataName,
      };
    }

    // Check if the file already exists and delete it if it does
    try {
      await fs.access(uploadPath, fs.constants.F_OK); // Check if file exists
      await fs.unlink(uploadPath); // Delete the existing file
    } catch (err) {
      // If file doesn't exist, no need to delete
      if (err.code !== "ENOENT") {
        return {
          status: 400,
          error: true,
          message: "File does not exist",
          removePreview: true,
          removeImage: true,
          imageFrontendSlug: formDataName,
        };
      }
    }

    // Move the new file to the designated directory
    try {
      await file.mv(uploadPath);
    } catch (err) {
      console.error("Error during file move:", err); // Log the error for debugging
      return {
        status: 400,
        error: true,
        message: "Error while moving file.",
        removePreview: true,
        removeImage: true,
        imageFrontendSlug: formDataName,
      };
    }

    const uploadProfilePictureDatabaseResponse =
      await handleUploadProfilePictureAction(
        client,
        fileStaticPath,
        username,
        formDataName
      );



      const additionalData = {
        event: "update_profile_picture",
        message: `${username} updated their profile picture`
      }
      
      await handleBroadcastFormDataEventAction(io, userId, client, additionalData)

    return uploadProfilePictureDatabaseResponse;
  } catch (err) {
    console.error("File upload error:", err.message); // Log the error for debugging
    return {
      status: 500,
      error: true,
      message: "An error occurred during file upload.",
      removePreview: true,
      removeImage: true,
      imageFrontendSlug: formDataName,
    };
  }
};
