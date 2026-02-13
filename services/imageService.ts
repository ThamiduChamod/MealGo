export const uploadImage = async (uri: string) => {
    const cloudName = "dhg6pf96x";
    const uploadPreset = "mealgo";

    const formData = new FormData();
    formData.append('file', {
        uri,
        type: 'image/jpeg',
        name: 'profile.jpg',
    } as any);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            console.log("Cloudinary Error Detail:", data);
            throw new Error(data.error?.message || "Failed to upload image");
        }

        console.log("Image uploaded successfully:", data.secure_url);
        return data.secure_url;
    } catch (error) {
        console.error("Upload function error:", error);
        throw error;
    }
}