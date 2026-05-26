import { db } from "./database/db.mjs";
import { get, ref } from "firebase/database";

try {
  const dbRef = ref(db, "/ping");
  const before = Date.now();
  const snapshot = await get(dbRef);
  const after = Date.now();
  const ping = after - before;
  if (!snapshot.exists()) {
    console.log("Dado não existente");
  } else {
    const data = snapshot.val();
    console.log("Sucesso ao logar na firebase!");
    console.log(`${data} ${ping}ms.`);
  }
} catch (e) {
  console.log("Erro ao logar na firebase!");
}
