export interface UploadResponse {
  success: boolean;
  message?: string;
  url?: string;
  data?: {
    url?: string;
  };
}

const getUploadEndpoint = (): string => {
  const configuredUrl = import.meta.env.VITE_UPLOAD_API_URL as string | undefined;
  if (configuredUrl) return configuredUrl;
  return '/api/upload';
};

export const uploadMedia = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(getUploadEndpoint(), {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const fallbackMessage = response.status >= 500
        ? 'Upload server error. Please try again.'
        : 'Upload request was rejected.';
      return { success: false, message: fallbackMessage };
    }

    const data: UploadResponse = await response.json();
    if (!data.url && data.data?.url) {
      data.url = data.data.url;
    }
    return data;
  } catch (error) {
    console.error('Frontend upload error:', error);
    return {
      success: false,
      message: 'Failed to connect to the upload server.',
    };
  }
};
