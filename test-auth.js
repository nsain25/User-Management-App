const axios = require("axios");

// 🔹 Replace with actual API URLs
const API_BASE = "http://localhost:3000/api"; // Change if needed
const testEmail = "testuser@example.com";
const testPassword = "Test@1234";
let verificationToken = null;
let resetToken = null;

async function registerUser() {
    console.log("\n🔹 Registering User...");
    try {
        const response = await axios.post(`${API_BASE}/register`, {
            email: testEmail,
            password: testPassword,
        });
        console.log("✅ Registration request sent:", response.data);
    } catch (error) {
        console.error("❌ Registration Failed:", error.response?.data || error.message);
    }
}

async function getVerificationToken() {
    console.log("\n🔹 Fetching Verification Token...");
    try {
        // Simulate fetching the token from the database
        const response = await axios.get(`${API_BASE}/debug/get-verification-token?email=${testEmail}`);
        verificationToken = response.data.token;
        console.log("✅ Verification Token:", verificationToken);
    } catch (error) {
        console.error("❌ Failed to get verification token:", error.response?.data || error.message);
    }
}

async function verifyEmail() {
    console.log("\n🔹 Verifying Email...");
    if (!verificationToken) {
        console.log("❌ No verification token found.");
        return;
    }
    try {
        const response = await axios.get(`${API_BASE}/verify-email?token=${verificationToken}`);
        console.log("✅ Email Verified:", response.data);
    } catch (error) {
        console.error("❌ Email Verification Failed:", error.response?.data || error.message);
    }
}

async function loginUser() {
    console.log("\n🔹 Logging In...");
    try {
        const response = await axios.post(`${API_BASE}/login`, {
            email: testEmail,
            password: testPassword,
        });
        console.log("✅ Login Success:", response.data);
    } catch (error) {
        console.error("❌ Login Failed:", error.response?.data || error.message);
    }
}

async function requestPasswordReset() {
    console.log("\n🔹 Requesting Password Reset...");
    try {
        const response = await axios.post(`${API_BASE}/forgot-password`, {
            email: testEmail,
        });
        console.log("✅ Password Reset Request Sent:", response.data);
    } catch (error) {
        console.error("❌ Password Reset Request Failed:", error.response?.data || error.message);
    }
}

async function getResetToken() {
    console.log("\n🔹 Fetching Reset Token...");
    try {
        const response = await axios.get(`${API_BASE}/debug/get-reset-token?email=${testEmail}`);
        resetToken = response.data.token;
        console.log("✅ Reset Token:", resetToken);
    } catch (error) {
        console.error("❌ Failed to get reset token:", error.response?.data || error.message);
    }
}

async function resetPassword() {
    console.log("\n🔹 Resetting Password...");
    if (!resetToken) {
        console.log("❌ No reset token found.");
        return;
    }
    try {
        const newPassword = "NewPass@123";
        const response = await axios.post(`${API_BASE}/reset-password`, {
            token: resetToken,
            newPassword,
        });
        console.log("✅ Password Reset Success:", response.data);
    } catch (error) {
        console.error("❌ Password Reset Failed:", error.response?.data || error.message);
    }
}

async function runTests() {
    await registerUser();
    await getVerificationToken();
    await verifyEmail();
    await loginUser();
    await requestPasswordReset();
    await getResetToken();
    await resetPassword();
    await loginUser(); // Test login after reset
}

runTests();
