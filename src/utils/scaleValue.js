export default function scaleValue(countVal, rangeArr, retRangeArr) {
 if (rangeArr[0] < countVal && countVal < rangeArr[1]) {
  return retRangeArr[0];
 } else {
  retRangeArr[1];
 }
}
