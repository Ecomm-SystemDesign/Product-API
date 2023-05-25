const fs = require('fs');
const readline = require('readline');

const inputFile = '/home/jerryrenn/photosCopy.csv';
const outputFile = 'output.csv';

const outputStream = fs.createWriteStream(outputFile);

// Create a readline interface to read the input file
const rl = readline.createInterface({
  input: fs.createReadStream(inputFile),
  output: outputStream,
  terminal: false,
});

//set firstLine = true to effectively ignore the first line when needed
let isFirstLine = true;

// Process each line of the input file
rl.on('line', (line) => {

  if (isFirstLine) {
    // Write the original line (headers) to the output file without modifications
    outputStream.write(`${line}\n`);
    isFirstLine = false;
    return;
  }

  // Split the line into columns
  const [id, styleId, url, thumbnailUrl] = line.split(',');

  // Check and fix quotes in URL column
  let formattedUrl = url.trim();
  if (!formattedUrl.startsWith('"')) {
    formattedUrl = `"${formattedUrl}`;
  }
  if (!formattedUrl.endsWith('"')) {
    formattedUrl = `${formattedUrl}"`;
  }

  // Check and fix quotes in thumbnail URL column
  let formattedThumbnailUrl = thumbnailUrl.trim();
  if (!formattedThumbnailUrl.startsWith('"')) {
    formattedThumbnailUrl = `"${formattedThumbnailUrl}`;
  }
  if (!formattedThumbnailUrl.endsWith('"')) {
    formattedThumbnailUrl = `${formattedThumbnailUrl}"`;
  }

  // Write the modified line with added quotes to the output file
  const modifiedLine = `${id},${styleId},${formattedUrl},${formattedThumbnailUrl}\n`;
  outputStream.write(modifiedLine);
});

// Handle the end of input file
rl.on('close', () => {
  outputStream.close();
  console.log('CSV file processed successfully.');
});
