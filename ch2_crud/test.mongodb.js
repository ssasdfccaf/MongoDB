// playground : 연습장 만들어서,
// 전체 실행: ctrl + alt + r
// 한줄 실행: ctrl + alt + s
use("testBlog");
db.users.insertOne({ x: 1 });

use("testBlog");
db.users2.insertOne({ name: "SangYong Lee", email: "lsy@gmail.com" });

use("testBlog");

db.users2.find();

db.users2.updateOne({ name: "SangYong Lee" }, { $set: { age: 30 } });

db.users2.findOne({ name: "SangYong Lee" });

db.users2.updateOne(
  { "name.first": "SangYong2" },
  { $set: { "name.last": "Lee2" } }
);

db.users2.findOne({ _id: ObjectId("6577d31a84d90d1bd5755d27") });

db.users2.updateOne(
  { _id: ObjectId("6577d31a84d90d1bd5755d27") },
  { $inc: { age: 1 } }
);

db.users2.deleteOne({ _id: ObjectId("6577d31a84d90d1bd5755d27") });

db.users2.find();
