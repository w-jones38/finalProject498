// https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
export const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

// https://stackoverflow.com/questions/17745292/how-to-retrieve-all-localstorage-items-without-knowing-the-keys-in-advance
export function allStorage() {

  var archive = {}, // Notice change here
      keys = Object.keys(localStorage),
      i = keys.length;

  while ( i-- ) {
      archive[ keys[i] ] = localStorage.getItem( keys[i] );
  }

  return archive;
}
