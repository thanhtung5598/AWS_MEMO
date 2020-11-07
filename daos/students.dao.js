const AWS = require("aws-sdk");
const BUCKET_NAME = 'thanhtung';
AWS.config.update({
  region: "ap-southeast-1",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
const S3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const docClient = new AWS.DynamoDB.DocumentClient();
const table = "students";

module.exports.getAll = async () => {
  const params = {
    TableName: table,
  };
  return await (await docClient.scan(params).promise()).Items;
};

module.exports.uploadAvatar = async (avatar) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: avatar.name, // File name you want to save as in S3
    Body: avatar.data,
    ACL: "public-read",
  };
  return await (await S3.upload(params).promise()).Location;
};

module.exports.add = async (data) => {
  const params = {
    TableName: table,
    Item: data,
  };
  return await docClient.put(params).promise();
};
module.exports.delete = async (student_id) => {
  const params = {
    TableName: table,
    Key: {
      student_id,
    },
  };
  return await docClient.delete(params).promise();
};
