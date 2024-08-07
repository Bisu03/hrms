

export const passGenerator = () => {

    function generateUnique6DigitNumber() {
        const min = 10000; // 6-digit minimum value
        const max = 99999; // 6-digit maximum value
        let uniqueNumber;

        do {
            uniqueNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (isNumberInUse(uniqueNumber));

        return uniqueNumber;
    }
    const usedNumbers = new Set();

    function isNumberInUse(number) {
        return usedNumbers.has(number);
    }
    const uniqueNumber = generateUnique6DigitNumber();
    usedNumbers.add(uniqueNumber);
    return uniqueNumber;


}
