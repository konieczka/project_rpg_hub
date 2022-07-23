export const LOGICAL_OPERATORS = {
  add: { symbol: "+", type: "op" },
  subtract: { symbol: "-", type: "op" },
  multiply: { symbol: "X", type: "op" },
  divide: { symbol: "/", type: "op" },
};

export const DICES = {
  d4: {
    symbol: "d4",
    range: 5,
    type: "number",
    isDice: true,
  },
  d6: {
    symbol: "d6",
    range: 7,
    type: "number",
    isDice: true,
  },
  d8: {
    symbol: "d8",
    range: 9,
    type: "number",
    isDice: true,
  },
  d10: {
    symbol: "d10",
    range: 11,
    type: "number",
    isDice: true,
  },
  d12: {
    symbol: "d12",
    range: 13,
    type: "number",
    isDice: true,
  },
  d20: {
    symbol: "d20",
    range: 21,
    type: "number",
    isDice: true,
  },
};

export const getNumericInputValue = (number) => ({
  symbol: `${number}`,
  value: number,
  type: "number",
  isDice: false,
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getCheckNotation = (checkNotationArr) =>
  checkNotationArr.map((el) => `${el.symbol}`).join(" ");

const rollOrPutValue = (el) => {
  if (el.isDice) {
    return getRandomInt(1, el.range);
  } else {
    return parseInt(el.value);
  }
};

export const calculateNotation = (checkNotationArr) => {
  const array = [...checkNotationArr];
  var buffer;
  var transcript = [];

  do {
    let temp = array.shift();
    if (temp.type === "op") {
      let roll;
      switch (temp.symbol) {
        case "+":
          roll = rollOrPutValue(array.shift());
          buffer += roll;
          transcript.push(`+ ${roll}`);
          break;
        case "-":
          roll = rollOrPutValue(array.shift());
          buffer -= roll;
          transcript.push(`- ${roll}`);
          break;
        case "X":
          roll = rollOrPutValue(array.shift());
          buffer *= roll;
          transcript.push(`* ${roll}`);
          break;
        case "/":
          roll = rollOrPutValue(array.shift());
          buffer /= roll;
          transcript.push(`/ ${roll}`);
          break;
        default:
          break;
      }
    } else {
      buffer = rollOrPutValue(temp);
      transcript.push(`${buffer}`);
    }
  } while (array.length !== 0);

  transcript.push(`= ${buffer}`);

  return {
    result: buffer,
    testTemplate: getCheckNotation(checkNotationArr),
    testRundown: transcript.join(" "),
  };
};
