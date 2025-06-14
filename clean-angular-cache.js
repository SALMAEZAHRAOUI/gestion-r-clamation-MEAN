const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const cacheDir = path.join(__dirname, '.angular', 'cache');

function deleteFolderRecursiveSync(folderPath) {
  if (!fs.existsSync(folderPath)) {
    console.log(`ℹ️ Le dossier n'existe pas : ${folderPath}`);
    return;
  }

  fs.readdirSync(folderPath).forEach(file => {
    const curPath = path.join(folderPath, file);
    try {
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursiveSync(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    } catch (err) {
      console.error(`❌ Impossible de supprimer : ${curPath}\n   ➤ ${err.message}`);
    }
  });

  try {
    fs.rmdirSync(folderPath);
    console.log(`✅ Dossier supprimé : ${folderPath}`);
  } catch (err) {
    console.error(`❌ Impossible de supprimer le dossier : ${folderPath}\n   ➤ ${err.message}`);
  }
}

console.log(`🚀 Nettoyage du cache Angular à : ${cacheDir}`);
deleteFolderRecursiveSync(cacheDir);

console.log('♻️ Lancement de "ng serve"...');
const ngServe = exec('npx ng serve');

ngServe.stdout.on('data', (data) => {
  process.stdout.write(data);
});

ngServe.stderr.on('data', (data) => {
  process.stderr.write(data);
});

ngServe.on('exit', (code) => {
  console.log(`⚙️ ng serve terminé avec le code : ${code}`);
});
