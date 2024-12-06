export const handleUploadProfilePictureAction = async(client, fileStaticPath, username, formDataName) => {

    const updateProfilePictureQuery = `UPDATE users SET profile_picture = $1 WHERE username = $2`

    const updateProfilePictureResponse = await client.query(updateProfilePictureQuery, [fileStaticPath, username])


    if (updateProfilePictureResponse?.rowCount !== 1) {
      handleThrowNewErrorAction(500, "An error occurred during the profile picture update");
    }
    

    return {
        status: 200,
        success: true,
        message: "You have successfully updated your profile picture",
        filePath: fileStaticPath,
        removeUser: true,
        redirect: "/login",
        removePreview: true,
        removeImage: true,
        imageFrontendSlug: formDataName
    };
}