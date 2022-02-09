const binToHex = (binStr: string) => {
    const conversions: { [bin: string]: string } = {
        "0000": "0",
        "0001": "1",
        "0010": "2",
        "0011": "3",
        "0100": "4",
        "0101": "5",
        "0110": "6",
        "0111": "7",
        "1000": "8",
        "1001": "9",
        "1010": "a",
        "1011": "b",
        "1100": "c",
        "1101": "d",
        "1110": "e",
        "1111": "f",
    };

    let hexHash = "";
    for (let i = 0; i < binStr.length; i += 4) {
        const chunk = binStr.slice(i, i + 4);
        hexHash += conversions[chunk];
    }

    return hexHash;
};

const dataToHash = (arr: number[]) => {
    const arrSum = arr.reduce((sum, x) => sum + x, 0);
    const arrMean = arrSum / arr.length;

    const bitStr = arr
        .map((value) => (value >= arrMean ? 1 : 0))
        .join("")
        .toString();

    if (bitStr.length % 4 !== 0) {
        throw new Error(`Invalid Bit Length: ${bitStr.length}`);
    }

    return binToHex(bitStr);
};

const hammDist = (strOne: string, strTwo: string) => {
    if (strOne.length != strTwo.length) {
        throw new Error("Hashes Are of Different Length.");
    }

    let difference = 0;
    for (let i = 0; i < strOne.length; i++) {
        if (strOne[i] !== strTwo[i]) {
            difference += 1;
        }
    }

    return difference;
};

export { dataToHash, hammDist };