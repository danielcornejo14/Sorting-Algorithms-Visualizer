export async function bubbleSort(
  arr: number[],
  updateBars: Function,
  accessedBar: Function,
  comparedBar: Function
) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      accessedBar(j);
      comparedBar(j + 1);
      updateBars([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }
  accessedBar(null);
  comparedBar(null);
}

export async function quickSort(
  arr: number[],
  updateBars: Function,
  accessedBar: Function,
  comparedBar: Function
) {
  async function sort(arr: number[], low = 0, high = arr.length - 1) {
    if (low < high) {
      let pivotIndex = await partition(arr, low, high);
      await sort(arr, low, pivotIndex - 1);
      await sort(arr, pivotIndex + 1, high);
    }
  }

  async function partition(arr: number[], low: number, high: number) {
    let pivotValue = arr[high];
    let i = low;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivotValue) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
      accessedBar(j);
      comparedBar(high);
      updateBars([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    [arr[i], arr[high]] = [arr[high], arr[i]];
    accessedBar(i);
    comparedBar(null);
    updateBars([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 10));
    return i;
  }

  sort(arr);
}

export async function cocktailSort(
  arr: number[],
  updateBars: Function,
  accessedBar: Function,
  comparedBar: Function
) {
  let swapped = true;
  let start = 0;
  let end = arr.length - 1;

  while (swapped) {
    swapped = false;

    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
      accessedBar(i);
      comparedBar(i + 1);
      updateBars([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    if (!swapped) break;

    swapped = false;
    end--;

    for (let i = end - 1; i >= start; i--) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
      accessedBar(i);
      comparedBar(i + 1);
      updateBars([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    start++;
  }

  accessedBar(null);
  comparedBar(null);
}

export async function radixSort(
  arr: number[],
  updateBars: Function,
  accessedBar: Function,
  comparedBar: Function
){
  const getDigit = (num: number, place: number) =>
    Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
  const digitCount = (num: number) =>
    num === 0 ? 1 : Math.floor(Math.log10(Math.abs(num))) + 1;
  const getMaxDigitCount = (arr: number[]) => Math.max(...arr.map(digitCount));

  const maxDigitCount = getMaxDigitCount(arr);

  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets: number[][] = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < arr.length; i++) {
      const digit = getDigit(arr[i], k);
      digitBuckets[digit].push(arr[i]);
      accessedBar(i);
      comparedBar(null);
      updateBars([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    arr = ([] as number[]).concat(...digitBuckets);
    accessedBar(null);
    comparedBar(null);
    updateBars([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  return arr;
}
