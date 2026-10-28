const {
  INDEXNOW_SITE,
  INDEXNOW_KEY,
} = process.env;

if (!INDEXNOW_SITE) {
  throw new Error("INDEXNOW_SITE is required.");
}

if (!INDEXNOW_KEY) {
  throw new Error("INDEXNOW_KEY is required.");
}

const site = INDEXNOW_SITE.replace(/\/+$/, "");
const siteUrl = new URL(site);

const host = siteUrl.hostname;
const endpoint = "https://api.indexnow.org/indexnow";
const keyLocation = `${site}/${INDEXNOW_KEY}.txt`;

const paths = process.argv.slice(2);

function pathToUrl(path) {
  path = path.replaceAll("\\", "/");

  if (!path.endsWith(".html")) {
    return null;
  }

  if (path === "index.html") {
    path = "";
  } else if (path.endsWith("/index.html")) {
    path = path.slice(0, -10);
  }

  return `${site}/${path}`;
}

const urls = [...new Set(paths.map(pathToUrl).filter(Boolean))];

if (urls.length === 0) {
  console.log("IndexNow: no changed HTML URLs to submit.");
  process.exit(0);
}

console.log(`IndexNow: submitting ${urls.length} URL(s):`);

for (const url of urls) {
  console.log(`  ${url}`);
}

for (let i = 0; i < urls.length; i += 10000) {
  const urlList = urls.slice(i, i + 10000);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation,
      urlList,
    }),
  });

  if (response.status !== 200 && response.status !== 202) {
    const body = await response.text();

    throw new Error(
      `IndexNow request failed (${response.status}): ${body}`
    );
  }

  console.log(
    `IndexNow: ${response.status} -- submitted ${urlList.length} URL(s).`
  );
}
