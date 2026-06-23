

async function testEnquiry() {
  const url = "https://gge-oisn.onrender.com/api/enquiries";
  const payload = {
    fullName: "Render Proxy Test",
    phoneNumber: "9999999999",
    email: "test@renderproxy.com",
    serviceType: "Private Finance",
    message: "Testing if the Express rate limiter works behind Render proxy with trust proxy = 1",
    source: "Automated Test"
  };

  try {
    console.log(`Sending POST request to ${url}...`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => null);
    
    console.log("Status:", response.status);
    console.log("Response:", JSON.stringify(data, null, 2));

    if (response.ok && data && data.success) {
      console.log("✅ MongoDB Save Confirmed: The server successfully processed and saved the enquiry.");
    } else {
      console.log("❌ Test Failed. Response was not successful.");
    }
  } catch (err) {
    console.error("Fetch Error:", err);
  }
}

testEnquiry();
