
const fs=require("fs")


// fs.writeFile("mess.txt", "Hello from NodeJS!", (err) => {
//     if (err) throw err;
//     console.log('The file has been saved');
//   });



fs.readFile("./mess.txt",'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
}); 