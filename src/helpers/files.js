import glob from 'glob';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

/**
 *
 * @param {{picturesDirectory: string, backupDirectory: string}} importPath
 * @param directoriesToProcess
 * @returns [] of promises
 */
export const copyHelper = (importPath, directoriesToProcess) => {
  const createDirectoriesResult = createDirectories(importPath);
  if (createDirectoriesResult.error) {
    return createDirectoriesResult;
  } else {
    console.info(createDirectoriesResult.msg);
  }

  let jpegsToProcess = [];
  let allFiles = [];

  directoriesToProcess.forEach(dir => {
    const globOptions = {
      cwd: dir,
      absolute: true
    };

    jpegsToProcess = jpegsToProcess.concat(glob.sync('@(*.jpg|*.jpeg|*.JPG|*.JPEG)', globOptions));
    allFiles = allFiles.concat(glob.sync('*.*', globOptions));
  });

  const fileCopyPromises = [];
  jpegsToProcess.forEach(jpegImage => {
    fileCopyPromises.push(copyFileToFolder(jpegImage, importPath.picturesDirectory));
  });

  allFiles.forEach(allFilesItem => {
    fileCopyPromises.push(copyFileToFolder(allFilesItem, importPath.backupDirectory));
  });

  return fileCopyPromises;

  // console.log(importPath, jpegsToProcess, allFiles);
  // return createSuccess('Pictures Imported')
};

const createDirectories = importPath => {
  if (fs.existsSync(importPath.picturesDirectory)) {
    return createError(`The directory '${importPath.picturesDirectory}' already exists.`);
  }

  if (fs.existsSync(importPath.backupDirectory)) {
    return createError(`The backup directory '${importPath.backupDirectory}' already exists.`);
  }

  const importDirectoryWasCreated = mkdirp.sync(importPath.picturesDirectory);
  const backupDirectoryWasCreated = mkdirp.sync(importPath.backupDirectory);
  if (importDirectoryWasCreated === -1) {
    return createError(`The directory '${importPath.picturesDirectory}' could not be created.`);
  }
  if (backupDirectoryWasCreated === -1) {
    return createError(`The backup directory '${importPath.backupDirectory}' could not be created.`);
  }

  return createSuccess('Import Directories have been created');
};

const createError = msg => ({error: true, msg});
const createSuccess = msg => ({error: false, msg});

const copyFileToFolder = (source, targetFolder) => {
  return new Promise(function (resolve, reject) {
    const readStream = fs.createReadStream(source);
    readStream.on('error', rejectCleanup);

    const targetFile = path.join(targetFolder, path.basename(source));

    const writeStream = fs.createWriteStream(targetFile);
    writeStream.on('error', rejectCleanup);

    function rejectCleanup (err) {
      readStream.destroy();
      writeStream.end();
      reject(err);
    }

    writeStream.on('finish', resolve);
    readStream.pipe(writeStream);
  });
};
