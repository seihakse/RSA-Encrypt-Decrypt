// Function to calculate (base^exp) % modulus efficiently using the square and multiply algorithm
function modPow(base, exp, modulus) {
    let result = 1;
    base = base % modulus;
  
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % modulus;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % modulus;
    }
  
    return result;
  }
  
  // Function to calculate the modular inverse using the extended Euclidean algorithm
  function modInverse(a, m) {
    let m0 = m;
    let x0 = 0;
    let x1 = 1;
  
    if (m === 1) return 1;
  
    while (a > 1) {
        let q = Math.floor(a / m);
        let t = m;
  
        m = a % m;
        a = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }
  
    if (x1 < 0) x1 += m0;
  
    return x1;
  }
  
  // RSA Encryption
  function encrypt() {
    const message = document.getElementById('message').value;
    const p = parseInt(document.getElementById('p-value').value);
    const q = parseInt(document.getElementById('q-value').value);
    const e = parseInt(document.getElementById('e-value').value);
    const n = p * q;
  
    let encryptedMessage = '';
  
    for (let i = 0; i < message.length; i++) {
        const charCode = message.charCodeAt(i);
        const encryptedCharCode = modPow(charCode, e, n);
        encryptedMessage += encryptedCharCode + ' ';
    }
  
    document.getElementById('encrypted-message').textContent = encryptedMessage.trim();
    document.getElementById('n-value').textContent = n;
  }
  
  // RSA Decryption
  function decrypt() {
    const encryptedMessage = document.getElementById('encrypted-message').textContent.trim();
    const p = parseInt(document.getElementById('p-value').value);
    const q = parseInt(document.getElementById('q-value').value);
    const e = parseInt(document.getElementById('e-value').value);
    const n = p * q;
    const phiN = (p - 1) * (q - 1);
    const d = modInverse(e, phiN);
  
    let decryptedMessage = '';
  
    const encryptedCharCodes = encryptedMessage.split(' ').filter(code => code !== '');
    for (const encryptedCharCode of encryptedCharCodes) {
        const charCode = modPow(parseInt(encryptedCharCode), d, n);
        decryptedMessage += String.fromCharCode(charCode);
    }
  
    document.getElementById('decrypted-message').textContent = decryptedMessage;
    document.getElementById('n-value').textContent = n;
  }
  
  // Function to clear the input and output fields for RSA
  function clean() {
    document.getElementById('p-value').value = '';
    document.getElementById('q-value').value = '';
    document.getElementById('e-value').value = '';
    document.getElementById('message').value = '';
    document.getElementById('encrypted-message').textContent = '';
    document.getElementById('decrypted-message').textContent = '';
    document.getElementById('n-value').textContent = '';
  }
  
  // Event listeners for RSA buttons
  document.getElementById('encrypt-btn').addEventListener('click', encrypt);
  document.getElementById('decrypt-btn').addEventListener('click', decrypt);
  document.getElementById('reset-btn').addEventListener('click', clean);
  
  // Function for Caesar Cipher encryption
  function caesarEncrypt() {
    const text = document.getElementById('caesar-text').value;
    const key = parseInt(document.getElementById('caesar-key').value);
    let encryptedText = '';
  
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
  
        if (charCode >= 65 && charCode <= 90) {
            // Uppercase letters
            charCode = ((charCode - 65 + key) % 26) + 65;
        } else if (charCode >= 97 && charCode <= 122) {
            // Lowercase letters
            charCode = ((charCode - 97 + key) % 26) + 97;
        }
  
        encryptedText += String.fromCharCode(charCode);
    }
  
    document.getElementById('caesar-encrypted-text').textContent = encryptedText;
  }