// use("test");
// find(<query>,<projection>)
// query: 조건부, projection: 보고 싶은 열
// 교차로 내 .accident_count"만 보여주기 -> _id 제외 

db.by_road_type.find({ county: "강릉시" }, { "교차로내.accident_count": 1 });

// _id 제외: elect 교차로 내.accident_count
db.by_road_type.find(
  { county: "강릉시" },
  { "교차로 내.accident_count": 1, _id: 0 }
);

// select * 모두 보여주기
db.by_road_type.find({ county: "강릉시" });

db.by_road_type.find(
  { county: "강릉시" },
  { "교차로내.accident_count": 1, "터널안.accident_count": 1 }
);

db.by_road_type.find(
  { "기타단일로.death_toll": 0 },
  { city_or_province: 1, county: 1 }
);

// use("test");
db.inventory.insertMany([
  { item: "journal", qty: 25, tags: ["blank", "red"] },
  { item: "notebook", qty: 50, tags: ["red", "blank"] },
  { item: "paper", qty: 100, tags: ["yellow", "pink"] },
  { item: "planner", qty: 75, tags: ["blank", "red"] },
  { item: "postcard", qty: 45, tags: ["blue"] },
]);

// 쿼리 예제 - 한문장 씩 확인 (projection: 모든 컬럼 보여주기)
db.inventory.find({ item: { $eq: "journal" } });

db.inventory.find({ item: "journal" });

db.inventory.find({ tags: { $in: ["red"] } });

db.inventory.find({ tags: { $nin: ["blank", "blue"] } });

db.inventory.find({ tags: { $in: [/^[a-z]*d/] } });

db.inventory.find({ tags: { $in: [/^b/] } });

db.inventory.find({ qty: { $not: { $gt: 50 } } });

db.inventory.find({ qty: { $lte: 50 } });

db.inventory.find({ $or: [{ qty: { $gt: 90 } }, { qty: { $lt: 50 } }] });

db.inventory.find({ $and: [{ qty: { $gt: 50 } }, { qty: { $lt: 90 } }] });

db.inventory.find({ qty: { $gt: 50, $lt: 90 } });

// 검색
db.stores.insert([
  { _id: 1, name: "Java Hut", description: "Coffee and cakes" },
  { _id: 2, name: "Burger Buns", description: "Gourmet hamburgers" },
  { _id: 3, name: "Coffee Shop", description: "Just coffee" },
  { _id: 4, name: "Clothes Clothes Clothes", description: "Discount clothing" },
  { _id: 5, name: "Java Shopping", description: "Indonesian goods" },
]);

// #Text index
db.stores.createIndex({ name: "text", description: "text" });
// $text Operation
db.stores.find({ $text: { $search: "java coffee shop" } });

db.stores.find({ $text: { $search: "java shop" } });

db.stores.find({ $text: { $search: "shop" } });

db.stores.find({ $text: { $search: '"coffee shop"' } });

db.stores.find({ $text: { $search: '"Coffee and"' } });

db.stores.find({ $text: { $search: "java shop -coffee" } });

db.stores.find({ $text: { $search: "-java shop coffee" } });

// tags가 "red", "blank" 둘 다 주어진 순서대로 가진 도큐먼트 전부 출력
db.inventory.find({ tags: ["red", "blank"] });

db.collection.insertMany([
  { item: "journal", qty: 25, tags: [10, 20, 30, 40, 50] },
  { item: "notebook", qty: 50, tags: [1, 2, 3, 4, 5] },
  { item: "paper", qty: 100, tags: [3, 6, 9, 12, 15] },
  { item: "planner", qty: 75, tags: [7, 8, 9, 10, 11] },
  { item: "postcard", qty: 45, tags: [2, 4, 6, 8, 10] },
]);

// all  x > 10
// all  x < 15
db.collection.find({ tags: { $gt: 10, $lt: 15 } });
// elemMatch : 10 < x < 15 : 11,12,13,14
db.collection.find({ tags: { $elemMatch: { $gt: 10, $lt: 15 } } });

db.by_month.find({
  $and: [
    { month_data: { $elemMatch: { month: "01월", heavy_injury: 0 } } },
    { month_data: { $elemMatch: { month: "02월", death_toll: 0 } } },
  ],
});

// 순서가 중요함
db.inventory.find({ tags: ["red", "blank"] });
db.inventory.find({ tags: ["blank", "red"] });

// $all => tory.find({ tags: { $all: ["red", "blank"] } });

db.collection.find({ tags: { $size: 5 } }); // 배열 length가 { }인 문서

// {item: "book", tags: ["red", "blank"]}
// 잘못됨. tags의 첫번째 인자[0]가 아니라 tags 배열의 0이란 원소를 출력하라는 의미
db.collection.find({}, { "tags.10": 1 });

// tags 배열의 [0], [1]을 출력하라 (앞에서 부터 2개를 출력하라.)
db.collection.find({}, { tags: { $slice: 2 } });

// tags 배열의 [2:3] 을 출력하라
// $slice: [2, 1]  : 2: 인덱스 번호
// 1 : 가지고 올 갯수
db.collection.find({}, { tags: { $slice: [2, 1] } });

// test #m 사용
db.inventory.find({ item: /^p/i });

// #(특정 조건에 부합하는 필드만 출력하라.)
// 확인 필요
db.inventory.find(
  {},
  { tags: { $elemMatch: { $regex: /^b/ } }, _id: 0, item: 0, qty: 0 }
);

db.inventory.find(
  {},
  { tags: { $elemMatch: { $regex: /^b/ } }, qty: 1, item: 1 }
);

// #(특정 조건에 부합하는 첫번째 데이터만 출력하라.)
db.inventory.find({ tags: "red" }, { "tags.$": true });
