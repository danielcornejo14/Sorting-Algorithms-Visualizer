import "./LandingPage.scss";
import { Container } from "../ui/Container/Container";
import { AlgorithmPanel } from "../algorithm-panel/AlgorithmPanel";
import { Select } from "../ui/Select/Select";
import { Input } from "../ui/Input/Input";
import { useEffect, useState } from "react";
import { Card } from "../ui/Card/Card";
import { CardHeader } from "../ui/Card/CardHeader/CardHeader";
import { shuffle } from "../../helpers/shuffle";
import { bubbleSort, cocktailSort, quickSort, radixSort } from "../../helpers/Sorts";
import { PrimaryBtn } from "../ui/PrimaryBtn/PrimaryBtn";
import { SecondaryBtn } from "../ui/SecondaryBtn/SecondaryBtn";

export function LandingPage() {

  const cardColor = "#717171";
  const cardMargin = "10px";

  const content = [
    {
      title: "What is this?",
      content: "This project's objective is to provide a small demostration of several sorting algorithms. The framework used to generate this project is React and is built with Vite"
    },
    {
      title: "What is a sorting algorithm?",
      content: "A sorting algorithm is a set of instructions that arranges a collection of data or elements in a particular order. Sorting algorithms are used to sort or arrange data in a specific way, usually from smallest to largest or vice versa, or based on some other criteria such as alphabetical order, chronological order, or priority."
    }
  ]

  const min = 20
  const max = 100;
  const width = window.innerWidth;
  const height = window.innerHeight;

  const [barCount, setBarCount] = useState<number>(Math.ceil((min+max)/2))
  const [algorithm, setAlgorithm] = useState<number>(1)

  const [bars, setBars] = useState<number[]>([]);
  const [accessedBarIndex, setAccessedBarIndex] = useState<number | null>(null);
  const [comparedBarIndex, setComparedBarIndex] = useState<number | null>(null);
  
  const [disabled, setDisabled] = useState<boolean>(false)

  const algorithms = [
      {
        value: 1,
        label: 'Bubble Sort',
        method:() => bubbleSort(bars, setBars, setAccessedBarIndex, setComparedBarIndex)
      },
      {
        value: 2,
        label: 'Quick Sort',
        method: () => quickSort(bars, setBars, setAccessedBarIndex, setComparedBarIndex)
      },
      {
        value: 3,
        label: 'Cocktail Sort',
        method: () => cocktailSort(bars, setBars, setAccessedBarIndex, setComparedBarIndex)
      },
      {
        value: 4,
        label: 'Radix Sort',
        method: () => radixSort(bars, setBars, setAccessedBarIndex, setComparedBarIndex)
      }
    ]
  


  useEffect(() => {
    const newBars = barCount
      ? Array(barCount)
          .fill(0)
          .map((_, index) => ((height * 0.4) / barCount) * (index + 1))
      : [];
    setBars(shuffle(newBars));
  }, [barCount]);

  const handleReset = () => {
    const newBars = [...bars]
    setBars(shuffle(newBars))
  }

  const handleSort = async () => {
    setDisabled(true)
    await algorithms.filter((item)=> item.value === algorithm)[0].method()
    setDisabled(false)
  }


  const handleChange = (newValue: number) => {
      setBarCount(newValue)
  }

  const handleAlgorithmChange = (newValue: number) => {
      setAlgorithm(newValue)
  }

  const correctInput = () => {
      if(barCount < min){
          setBarCount(min)
      }
      else if(barCount > max){
          setBarCount(max)
      }
      else if(isNaN(barCount)){
          setBarCount(min)
      }
  }

  return (
    <Container justify="center" align="center" direction="column" color="#888888" width="95%" margin="auto">
      
      <h1 className="header">Sorting Algorithms</h1>
      <p>Welcome to this project</p>

      {content.map((item) => {
        return (
          <Card cardOptions={{appearance: "raised"}}>
            <CardHeader title={item.title}></CardHeader>
            <p>{item.content}</p>
          </Card>
        )
      })}

      <Container direction="column" align="center" justify="center">
        <Container direction="row" align="center" justify="space-around" color={cardColor} width="90%" margin={cardMargin}>
          <Input disabled={disabled} type="number" min={min} max={max} value={barCount} onChange={handleChange} onBlur={correctInput}></Input>
          <Select disabled={disabled} options={algorithms} onChange={handleAlgorithmChange}></Select>
        </Container>
        <AlgorithmPanel bars={bars} accessedBarIndex={accessedBarIndex} comparedBarIndex={comparedBarIndex}></AlgorithmPanel>
        <Container direction="row" align="center" justify="space-around" color={cardColor} width="90%" margin={cardMargin}>
          <SecondaryBtn text="Reset" disabled={disabled} onClick={handleReset}></SecondaryBtn>
          <PrimaryBtn text="Start" disabled={disabled} onClick={handleSort}></PrimaryBtn>
        </Container>
      </Container>

    </Container>
  );
}
