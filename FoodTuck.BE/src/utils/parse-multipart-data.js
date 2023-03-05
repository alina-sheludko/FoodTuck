function parseMultipartData(body, boundary) {
  const data = body.split(`--${boundary}`);
  const files = [];

  for (let i = 1; i < data.length - 1; i++) {
    const fileData = data[i].split('\r\n\r\n');
    const headers = fileData[0].split('\r\n');
    let file = {};

    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];

      if (header.indexOf('Content-Disposition:') === 0) {
        const name = header.match(/name="([^"]+)"/)[1];
        const filename = header.match(/filename="([^"]+)"/)[1];

        file.name = name;
        file.filename = filename;
      }
    }

    file.data = new Buffer.from(fileData[1], 'utf-8');
    files.push(file);
  }

  return files;
}

function getBoundary(contentType) {
  return contentType.split(';')[1].split('=')[1];
}

module.exports = {
  getBoundary,
  parseMultipartData,
}