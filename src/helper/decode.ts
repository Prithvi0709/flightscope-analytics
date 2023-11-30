import * as fernet from "fernet";

function decrypt(data: string, key: string): any {
  const secret = new fernet.Secret(key);
  const token = new fernet.Token({
    secret: secret,
    token: data,
    ttl: 0,
  });

  try {
    const decryptedData = token.decode();
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}

export default decrypt;

// Usage example
// const key = "your_fernet_key_here"; // Replace with your Fernet key
// const encryptedData = "your_encrypted_data_here"; // Replace with your encrypted data

// const decryptedData = decrypt(encryptedData, key);
// console.log(decryptedData);
