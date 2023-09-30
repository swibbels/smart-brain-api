import fetch from "node-fetch";

const handleApiCall = (req, res) => {
    
    const PAT = 'e02b6dbaeb984a5abe3a3d07c21df0d0';
    const USER_ID = 'swibbels';       
    const APP_ID = 'SmartBrain'; 
    const IMAGE_URL = req.body.input;
    
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
  });
    
    const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw,
    
  }; 
    return requestOptions      
}

handleApiCall(req) = () =>{
    fetch("https://api.clarifai.com/v2/models/" + "face-detection"  + "/outputs", requestOptions.IMAGE_URL)
        .then(response => response.json())
        .then(data => {
            res.json(data);})
        .catch(error => console.log('error', error));
}


const handleImage = (req, res, db) => {
    const { id } =req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(error => res.status(400).json('unable to get entries'))
}

export default { handleImage, handleApiCall };