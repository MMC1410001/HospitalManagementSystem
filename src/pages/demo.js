// write to js file
const fs = require('fs')

const content = 'this is what i want to write to file'

fs.writeFile('./newfile.txt', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
});
exec('ls', (error, stdout, stderr) => {
    if (error) {
            console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

  function ArrayAddition(arr) {
      let max=Math.max(...arr)
      let sum=0;
      arr.map(e=>{
          if(e!=max)
          sum+=e;

      })
      if(sum==max)
      return "true";
      else
      return "false";
      
  }