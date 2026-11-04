const test = require("node:test");
const assert = require("node:assert/strict");

process.env.NODE_ENV = "test";
const { app } = require("../server");

async function withServer(run) {
  const server = app.listen(0);
  try {
    const address = server.address();
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
      server.closeAllConnections();
    });
  }
}

test("serves the frontend with a restrictive content security policy", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(baseUrl);
    const html = await response.text();
    const policy = response.headers.get("content-security-policy") || "";
    assert.equal(response.status, 200);
    assert.match(policy, /default-src 'self'/);
    assert.match(policy, /script-src 'self'/);
    assert.match(html, /<script src="security\.js"><\/script>/);
    assert.match(html, /<script src="app\.js"><\/script>/);
  });
});

test("does not expose server, dependency, test, or database files as static assets", async () => {
  await withServer(async (baseUrl) => {
    for (const file of ["/server.js", "/package.json", "/db/schema.sql", "/db/seed.js", "/tests/server.test.js"]) {
      const response = await fetch(`${baseUrl}${file}`);
      assert.equal(response.status, 404, `${file} should not be served`);
      assert.deepEqual(await response.json(), { error: "Not found" });
    }
  });
});

test("rejects unauthenticated API access and mutations without a CSRF token", async () => {
  await withServer(async (baseUrl) => {
    const read = await fetch(`${baseUrl}/api/employees`);
    assert.equal(read.status, 401);
    assert.deepEqual(await read.json(), { error: "Authentication required" });

    const mutation = await fetch(`${baseUrl}/api/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Unauthorized" })
    });
    assert.equal(mutation.status, 403);
    assert.deepEqual(await mutation.json(), { error: "Invalid CSRF token" });
  });
});

test("protects HR workflow and account-management endpoints", async () => {
  await withServer(async (baseUrl) => {
    for (const resource of ["roster", "overtime", "loans", "users"]) {
      const response = await fetch(`${baseUrl}/api/${resource}`);
      assert.equal(response.status, 401, `${resource} should require authentication`);
      assert.deepEqual(await response.json(), { error: "Authentication required" });
    }
    const chat = await fetch(`${baseUrl}/api/chat/messages`);
    assert.equal(chat.status, 401);
    assert.deepEqual(await chat.json(), { error: "Authentication required"});
    const history = await fetch(`${baseUrl}/api/employees/11111111-1111-4111-8111-111111111111/employment-history`);
    assert.equal(history.status, 401);
    assert.deepEqual(await history.json(), { error: "Authentication required" });
  });
});
