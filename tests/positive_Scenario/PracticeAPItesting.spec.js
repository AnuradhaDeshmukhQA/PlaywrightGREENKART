import { test, expect } from '@playwright/test';
test("Practice API Testing", async ({ request }) => {
    const resoponse = await request.get("https://jsonplaceholder.typicode.com/posts/1");
    console.log(await resoponse.json());
    expect(resoponse.status()).toBe(200);
    expect(await resoponse.json()).toMatchObject({
        "userId": 1,
        "id": 1, 
    });
    expect(await resoponse.json()).toHaveProperty("title");
    expect(await resoponse.json()).toHaveProperty("body");
});   


test('Create User API', async ({ request }) => {

  const response = await request.post('https://fakestoreapi.com/products', {
    data: {
      name: "Anu",
      job: "QA"
    }
  });
  console.log(`Anu,${response.status()}`);
  //console.log(response.json());
  expect(response.status()).toBe(201);
  //console.log(await response.json());

});
test('Get updated user details', async({request}) =>{
    const response = await request.get('https://fakestoreapi.com/products/7');
    expect(response.status()).toBe(200);
 expect(await response.json()).toMatchObject({
    title: "White Gold Plated Princess",
    price: 9.99
 });
    console.log(await response.json());
 })
