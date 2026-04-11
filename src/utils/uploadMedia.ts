export interface UploadResponse {
  success: boolean;
  message?: string;
  url?: string;
}

export const uploadMedia = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:3001/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data: UploadResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Frontend upload error:', error);
    return {
      success: false,
      message: 'Failed to connect to the upload server.',
    };
  }
};
