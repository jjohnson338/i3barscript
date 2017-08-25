const  execSync = require("child_process").execSync;

module.exports = async function getPackStats(){
  const pacmanCount = await  parseInt(execSync(`pacman -Qu | wc -l`).toString());
  return {
    pacman: ` ${pacmanCount}`,
  };
};
