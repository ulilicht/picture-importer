import fs from 'fs'
import path from 'path'
import glob from 'glob'

/**
 * Returns all directories within srcpath, their name, path and a preview image
 * @param srcpath
 */
export const getDirectoriesWithPreviewImage = (srcpath) => {
  const dirs = fs.readdirSync(srcpath).filter(file => fs.statSync(path.join(srcpath, file)).isDirectory());
  return dirs.map(dir => {
    const globOptions = {
      cwd: path.join(srcpath, dir),
      absolute: true
    };

    const allImages = glob.sync('@(*.jpg|*.jpeg|*.JPG|*.JPEG)', globOptions);

    return {
      name: dir,
      path: srcpath + dir,
      img: allImages[0] || null
    }
  })
};


/**
 * Returns all directories within a srcpath
 * @param srcpath
 */
export const getDirectories = (srcpath) => {
  const dirs = fs.readdirSync(srcpath).filter(file => fs.statSync(path.join(srcpath, file)).isDirectory());
  return dirs.map(dir => ({
    name: dir,
    path: path.join(srcpath, dir)
  }))
};
