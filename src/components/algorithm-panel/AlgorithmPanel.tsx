import { useEffect, useState } from "react";
import { shuffle } from "../../helpers/shuffle";
import "./AlgorithmPanel.scss";

interface AlgorithmPanelProps {
  barNumber: number;
  algorithm: number;
}

export function AlgorithmPanel({ barNumber, algorithm }: AlgorithmPanelProps) {
  const [bars, setBars] = useState<number[]>([]);
  const [accessedBarIndex, setAccessedBarIndex] = useState<number | null>(null);
  const [comparedBarIndex, setComparedBarIndex] = useState<number | null>(null);

  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    const newBars = barNumber
      ? Array(barNumber)
          .fill(0)
          .map((_, index) => ((height * 0.4) / barNumber) * (index + 1))
      : [];
    setBars(shuffle(newBars));
  }, [barNumber]);

  const algorithms = [
    async (arr: number[]) => {
      // Bubble Sort
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
          setAccessedBarIndex(j);
          setComparedBarIndex(j + 1);
          setBars([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
      }
      setAccessedBarIndex(null);
      setComparedBarIndex(null);
    },
    async (arr: number[]) => {

      async function sort(arr: number[], low = 0, high = arr.length - 1) {
        if (low < high) {
          let pivotIndex = await partition(arr, low, high);
          await sort(arr, low, pivotIndex - 1);
          await sort(arr, pivotIndex + 1, high);
        }
      }
      
      async function partition(arr: number[], low:number, high:number) {
        let pivotValue = arr[high];
        let i = low;
        for (let j = low; j < high; j++) {
          if (arr[j] < pivotValue) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
          }
          setAccessedBarIndex(j);
          setComparedBarIndex(high);
          setBars([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
        [arr[i], arr[high]] = [arr[high], arr[i]];
        setAccessedBarIndex(i);
        setComparedBarIndex(null);
        setBars([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 10));
        return i;
      }

      sort(arr)
    },

    async (arr: number[]) => {
      // Cocktail Sort
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
          setAccessedBarIndex(i);
          setComparedBarIndex(i + 1);
          setBars([...arr]);
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
          setAccessedBarIndex(i);
          setComparedBarIndex(i + 1);
          setBars([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
  
        start++;
      }
  
      setAccessedBarIndex(null);
      setComparedBarIndex(null);
    },
    async (arr: number[]) =>{
      const getDigit = (num: number, place: number) => Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
      const digitCount = (num: number) => (num === 0 ? 1 : Math.floor(Math.log10(Math.abs(num))) + 1);
      const getMaxDigitCount = (arr: number[]) => Math.max(...arr.map(digitCount));
  
      const maxDigitCount = getMaxDigitCount(arr);
  
      for (let k = 0; k < maxDigitCount; k++) {
        let digitBuckets: number[][] = Array.from({ length: 10 }, () => []);
        for (let i = 0; i < arr.length; i++) {
          const digit = getDigit(arr[i], k);
          digitBuckets[digit].push(arr[i]);
          setAccessedBarIndex(i);
          setComparedBarIndex(null);
          setBars([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
        arr = ([] as number[]).concat(...digitBuckets);
        setAccessedBarIndex(null);
        setComparedBarIndex(null);
        setBars([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
  
      return arr;
    }
  ];

  return (
    <div>
      <div className="algorithm-panel">
        {bars.map((height, index) => (
          <div
            key={index}
            className={`bar 
                ${index === accessedBarIndex ? "accessed" : ""} 
                ${index === comparedBarIndex ? "compared" : ""}`}
            style={{
              width: `${(width * 0.8) / barNumber}px`,
              height: `${height}px`,
            }}
          />
        ))}
      </div>
      <button
        onClick={() => algorithms[algorithm](bars)}
      >
        Sort
      </button>
    </div>
  );
}
