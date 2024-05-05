// apiHeader.js

export const getApiHeaders = (contentType = 'application/json') => {
  const token = localStorage.getItem('token'); 
  return {
    headers: {
      'Content-Type': contentType,
      'Authorization': `Bearer ${token}`
    }
  };
};


//header for image blob data
export const getApiHeaderForImage = (contentType = 'application/json') => {
  const token = localStorage.getItem('token'); 
  return {
    headers: {
      'Content-Type': contentType,
      'Authorization': `Bearer ${token}`,
      'Accept': 'image/*'
    }
  };
};

export default getApiHeaders;