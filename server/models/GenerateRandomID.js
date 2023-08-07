function generateRandomID() {
  // Function to generate a random ID
  const IDLength = 15; // Length of the generated ID
  const characters = "0123456789";
  let ID = "";
  for (let i = 0; i < IDLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    ID += characters.charAt(randomIndex);
  }
  return "TRANS00" + ID;
}

module.exports = generateRandomID;
