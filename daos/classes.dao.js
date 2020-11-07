const AWS = require("aws-sdk");
const BUCKET_NAME = "thanhtung";
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
const table = "classes";

module.exports.getAll = async () => {
  const params = {
    TableName: table,
  };
  return await (await docClient.scan(params).promise()).Items;
};

module.exports.add = async (data) => {
  const params = {
    TableName: table,
    Item: data,
  };
  return await docClient.put(params).promise();
};

module.exports.delete = async (class_id) => {
  const params = {
    TableName: table,
    Key: {
      class_id,
    },
  };
  return await docClient.delete(params).promise();
};

module.exports.getSingleById = async (class_id) => {
  const params = {
    TableName: table,
    Key: {
      class_id,
    },
  };
  return await (await docClient.get(params).promise()).Item;
};

module.exports.update = async (classData) => {
  const params = {
    TableName: table,
    Key: {
      class_id: classData.class_id,
    },
    UpdateExpression:
      "set tenLop = :name",
    ExpressionAttributeValues: {
      ":name": classData.tenLop,
    },
    ReturnValues: "UPDATED_NEW",
  };
  return await docClient
    .update(params)
    .promise()
    .catch(err => console.log(err));
};
