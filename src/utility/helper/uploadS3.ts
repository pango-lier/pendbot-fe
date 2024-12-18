import axios_base from 'axios';
export const pushUrlToS3 = async (params: any) => {
    const { blob, url, type } = params;
    return await axios_base({
      url,
      method: 'PUT',
      headers: {
        'Content-Type': type,
      },
      data: blob,
      timeout: 0,
    });
  };

  export const createBlobLink = async (file: any) => {
    if (!file)
      return new Promise((resolve, reject) => reject('File is not found .'));
    if (
      ['image/svg+xml', 'application/xml', 'image/svg'].includes(file.type.trim())
    ) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e: any) => {
          const blob = new Blob([e.target.result], { type: file.type });
          const blobURL = URL.createObjectURL(blob);
          resolve({
            _blobURL: blobURL,
            _blob: blob,
            width: null,
            height: null,
            size: file.size,
            type: file.type,
            name: file.name,
          });
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsArrayBuffer(file);
      });
    }
  
    return new Promise((resolve, reject) => {
      const readerSize = new FileReader();
      readerSize.readAsDataURL(file);
      readerSize.onload = async (e: any) => {
        const image = new Image();
        image.onload = async function () {
          const reader = new FileReader();
  
          reader.onload = async (e: any) => {
            const blob = new Blob([e.target.result], { type: file.type });
            const blobURL = URL.createObjectURL(blob);
            resolve({
              _blobURL: blobURL,
              width: image.width,
              height: image.height,
              size: file.size,
              type: file.type,
              name: file.name,
              _blob: blob,
            });
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsArrayBuffer(file);
        };
  
        image.onerror = (err) => {
          reject(err);
        };
  
        image.src = e.target.result;
      };
      readerSize.onerror = (err) => {
        reject(err);
      };
    });
  };