// export async function getData(url: string) {
//   const baseUrl = process.env.DB_SERVER;

//   const respond = await fetch(`${url}`);
//   const data = await respond.json();

//   return data;
// }

export async function getData(url: string) {
  const baseUrl = process.env.DB_SERVER || "http://localhost:3000";

  try {
    const respond = await fetch(`${baseUrl}${url}`);
    if (!respond.ok) {
      throw new Error(`HTTP error! status: ${respond.status}`);
    }
    const data = await respond.json();
    return data;
  } catch (e) {
    console.error("getData error:", e);
    throw e;
  }
}
