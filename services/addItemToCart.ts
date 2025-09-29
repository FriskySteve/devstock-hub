export async function addItemToCart(productId: number, quantity: number = 1) {
  try {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("DataId: ", data);
      console.error(data.message || "Adding to cart failed.");
      return null;
    }

    return data;
  } catch (e) {
    console.log(e, "addItemToCart function failed.");
    return null;
  }
}
