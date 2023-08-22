const AWS = require("aws-sdk");

require("dotenv").config();

// Store the file to the S3AWS so that anyone can easily access it.
exports.fileToS3 = (data, file) => {
  const BUCKET_NAME = "deepexpensetracker";
  const IAM_USER_KEY = process.env.IAM_USER_KEY;
  const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

  let s3Bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });

  var params = {
    Bucket: BUCKET_NAME,
    Key: file,
    Body: data,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3Bucket.upload(params, (err, s3Response) => {
      if (err) {
        console.log("Something Went Wrong!", err);
        reject(err);
      } else {
        console.log("Success", s3Response);
        resolve(s3Response.Location);
      }
    });
  });
}