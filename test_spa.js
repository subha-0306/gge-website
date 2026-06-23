async function checkRoutes() {
  const routes = [
    "https://gge-website-eosin.vercel.app/services",
    "https://gge-website-eosin.vercel.app/contact",
    "https://gge-website-eosin.vercel.app/about",
    "https://gge-website-eosin.vercel.app/blog"
  ];
  
  for (const route of routes) {
    try {
      console.log(`Checking ${route}...`);
      const res = await fetch(route);
      const text = await res.text();
      if (text.includes('id="root"')) {
        console.log(`✅ Success! React app served at ${route}`);
      } else if (res.status === 404) {
        console.log(`❌ 404 Not Found at ${route}`);
      } else {
        console.log(`⚠️ Unknown response at ${route}: Status ${res.status}`);
      }
    } catch(err) {
      console.log(`Error checking ${route}:`, err);
    }
  }
}

checkRoutes();
