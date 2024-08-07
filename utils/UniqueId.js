export function generateUniqueID() {
    let uniqueIdCounter = 0;
    const currentTimestamp = new Date().getTime();
    const uniqueId = currentTimestamp % 1000000 * 10000 + uniqueIdCounter;

    uniqueIdCounter = (uniqueIdCounter + 1) % 10000;

    return uniqueId.toString().substr(0, 6).padStart(6, '0'); // Ensure exactly 6 digits
}