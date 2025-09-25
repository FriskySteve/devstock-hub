export async function getData(url: string) {
  const baseUrl = process.env.DB_SERVER;

  try {
    const respond = await fetch(`${baseUrl}${url}`);
    const data = await respond.json();

    return data;
  } catch (e) {
    console.error(e);
  }
}
