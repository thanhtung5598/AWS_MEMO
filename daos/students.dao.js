const AWS = require("aws-sdk");
AWS.config.update({
  region: "ap-southeast-1",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const docClient = new AWS.DynamoDB.DocumentClient();
const table = "students";

module.exports.getAllStudents = async () => {
  const params = {
    TableName: table,
  };
  return await (await docClient.scan(params).promise()).Items;
};

module.exports.addStudent = async (data) => {
  const params = {
    TableName: table,
    Item: data,
  };
  return await docClient.put(params).promise();
};
module.exports.deleteStudent = async (student_id) => {
  const params = {
    TableName: table,
    Key: {
      student_id,
    },
  };
  return await docClient.delete(params).promise();
};
