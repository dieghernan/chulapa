const {
  INDEXNOW_SITE,
  INDEXNOW_KEY,
  INDEXNOW_SINCE_HOURS = "24",
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
const sitemap = `${site}/sitemap.xml`;
const keyLocation = `${site}/${INDEXNOW_KEY}.txt`;
const endpoint = "https://api.indexnow.org/indexnow";

const sinceHours = Number(INDEXNOW_SINCE_HOURS);

if (!Number.isFinite(sinceHours) || sinceHours <= 0) {
  throw new Error("INDEXNOW_SINCE_HOURS must be a positive number.");
}

const since = Date.now() - sinceHours * 60 * 60 * 1000;

console.log(`IndexNow: sitemap ${sitemap}`);
console.log(`IndexNow: looking for changes in the last ${sinceHours} hours.`);

const sitemapResponse = await fetch(sitemap);

if (!sitemapResponse.ok) {
  throw new Error(
    `Could not fetch sitemap (${sitemapResponse.status}): ${sitemap}`
  );
}

const xml = await sitemapResponse.text();

const entries = [
  ...xml.matchAll(
    /<url>[\s\S]*?<loc>(.*?)<\/loc>[\s\S]*?<lastmod>(.*?)<\/lastmod>[\s\S]*?<\/url>/g
  ),
];

const urls = [
  ...new Set(
    entries
      .filter(([, , lastmod]) => {
        const modified = Date.parse(lastmod);
        return Number.isFinite(modified) && modified >= since;
      })
      .map(([, loc]) => loc.trim())
  ),
];

if (urls.length === 0) {
  console.log(
    `IndexNow: no URLs modified in the last ${sinceHours} hours.`
  );
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
