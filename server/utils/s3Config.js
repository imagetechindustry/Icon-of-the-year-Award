import { S3Client } from "@aws-sdk/client-s3";
import config from "../config/config.js";

console.log("Initializing S3 Client with Region:", config.AWS.REGION);
const s3Client = new S3Client({
    region: config.AWS.REGION,
    credentials: {
        accessKeyId: config.AWS.ACCESS_KEY_ID,
        secretAccessKey: config.AWS.SECRET_ACCESS_KEY,
    },
});

export default s3Client;
