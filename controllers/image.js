import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";

const handleApiCall = (req, res) => {
    
    const PAT = 'e02b6dbaeb984a5abe3a3d07c21df0d0';
    const USER_ID = 'swibbels';       
    const APP_ID = 'SmartBrain';
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = req.body.input;
    
    

    const stub = ClarifaiStub.grpc();
    
    const metadata = new grpc.Metadata();
    metadata.set("authorization", "Key " + PAT);
    
    stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            model_id: MODEL_ID,
            inputs: [
                { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } }
            ]
        },
        metadata,
        (err, response) => {
            if (err) {
                throw new Error(err);
            }
    
            if (response.status.code !== 10000) {
                throw new Error("Post model outputs failed, status: " + response.status.description);
            }

            const output = response.outputs[0];
            res.json(response);
        }
    );
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