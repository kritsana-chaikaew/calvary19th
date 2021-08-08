const { v4: uuidv4 } = require("uuid");
const { asyncAll, asyncGet, asyncRun } = require("./db");
const { insertClothes, updateClothesStmt } = require("./statments");

export async function getClothes(id) {
  if (!id) {
    return null;
  }
  const sql = "SELECT * FROM clothes WHERE id=$id";
  const clothes = await asyncGet(sql, { $id: id });
  return clothes;
}

export async function deleteClothes(id) {
  const sql = "DELETE FROM clothes WHERE id=$id";
  await asyncRun(sql, { $id: id });
}

export async function getClotheses() {
  const sql = "SELECT * FROM clothes";
  const clotheses = await asyncAll(sql);
  return clotheses;
}

export async function createClothes(clothes) {
  const id = uuidv4();
  let createdClothes = null;
  await asyncRun(insertClothes, {
    $id: id,
    $type: clothes.type,
    $no: clothes.no,
    $list: clothes.list,
    $count: clothes.count,
    $spend: clothes.spend,
    $lack: clothes.lack,
    $exeed: clothes.exeed,
    $remain: clothes.remain,
    $receive: clothes.receive,
    $remark: clothes.remark
  });
  createdClothes = await getClothes(id);
  return createdClothes;
}

export async function updateClothes(clothes) {
  await asyncRun(updateClothesStmt, {
    $id: clothes.id,
    $type: clothes.type,
    $no: clothes.no,
    $list: clothes.list,
    $count: clothes.count,
    $spend: clothes.spend,
    $lack: clothes.lack,
    $exeed: clothes.exeed,
    $remain: clothes.remain,
    $receive: clothes.receive,
    $remark: clothes.remark
  });
  const updatedClothes = await getClothes(clothes.id);
  return updatedClothes;
}
