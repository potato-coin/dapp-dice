export const getOdd = (compareNum, ammountIn = 1) => 
  ammountIn * (((10000 - 150) * 100) / (compareNum - 1)) / 10000;