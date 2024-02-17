function generateRandomString(length) {
    const letters = 'abcdefghijklmnopqrstuvwxyz'; // You can add more characters if needed
    let randomString = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        randomString += letters[randomIndex];
    }
    
    return randomString;
}


module.exports = generateRandomString;
