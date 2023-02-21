const fs = require("fs/promises");
 const files=  [...process.argv]
 files.splice(0,2);


/**
 * @description deletes only .txt and .json files
 * @param {string[]} files
 */
async function deleteFiles(files) {
  for await (let file of files) {
    try {
      if(file.endsWith('.txt')|| file.endsWith('.json')){
          await fs.unlink(file);
      }

    } catch (error) {
      console.log(error);
    }
  }
}

deleteFiles(files);
