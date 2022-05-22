const axios = require('axios');
const fs = require('fs');
const { assemblyAiKey } = require('./config.json');
let transcriptText;
var test;
const APIKey = assemblyAiKey;
const refreshInterval = 5000;

const assemble = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: APIKey,
        "content-type": "application/json",
        "transfer-encoding": "chunked",
    },
});
const file = "7510.mp3";
const d = fs.readFileSync(file);
let assemblyData;
fs.readFile(file, (err, data) => {
        if (err) return console.error(err);
        assemble
            .post("/upload", data)
            .then((res)=>getURL(res.data))
            .catch((err) => console.log(err));
        //console.log(res.data);
})
console.log(assemblyData);
async function getURL(data) {
    console.log(data);
    test = await assemble.post("/upload", d);
    test = data;
    getTranscript(data);
};

//getURL();

const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: APIKey,
    "content-type": "application/json",
  },
})


 const getTranscript = async (test1) => {
    // Sends the audio file to AssemblyAI for transcription
    //const response = await assembly.post("/transcript", {
    //  //audio_url: audioURL,
   // })
   console.log(test1.data);
    const response = await assembly.post("/transcript", {
        audio_url: test1.data.upload_url,
    })

    // Interval for checking transcript completion
    const checkCompletionInterval = setInterval(async () => {
      const transcript = await assembly.get(`/transcript/${response.data.id}`)
      const transcriptStatus = transcript.data.status
  
      if (transcriptStatus !== "completed") {
        console.log(`Transcript Status: ${transcriptStatus}`)
      } else if (transcriptStatus === "completed") {
        console.log("\nTranscription completed!\n")
        let transcriptText = transcript.data.text
        console.log(`Your transcribed text:\n\n${transcriptText}`)
        clearInterval(checkCompletionInterval)
      }
    }, refreshInterval)
    
  }