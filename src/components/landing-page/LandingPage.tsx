import "./LandingPage.scss";
import { Container } from "../ui/Container/Container";
import { AlgorithmPanel } from "../algorithm-panel/AlgorithmPanel";
import { Select } from "../ui/Select/Select";
import { Input } from "../ui/Input/Input";
import { useState } from "react";
import { Card } from "../ui/Card/Card";

export function LandingPage() {

  const cardColor = "#444444";
  const cardMargin = "10px";

  const algorithms = [
    {
      value: 1,
      label: 'Bubble Sort'
    },
    {
      value: 2,
      label: 'Quick Sort'
    }
  ]

  const content = [
    {
      title: "What is this?",
      content: "This project's objective is to provide a small demostration of several sorting algorithms. The framework used to generate this project is React and is built with Vite"
    },
    {
      title: "What is a sorting algorithm?",
      content: "A sorting algorithm is an algorithm that puts elements of a list in a certain order. The most-used orders are numerical order and lexicographical order. Efficient sorting is important for optimizing the use of other algorithms (such as search and merge algorithms) which require input data to be in sorted lists; it is also often useful for canonicalizing data and for producing human-readable output. More formally, the output must satisfy two conditions:"
    }
  ]

  const min = 75
  const max = 200
  const [value, setValue] = useState<number>(Math.ceil((min+max)/2))
  const [algorithm, setAlgorithm] = useState<number>(1)

  const handleChange = (newValue: number) => {
      setValue(newValue)
  }

  const handleAlgorithmChange = (newValue: number) => {
      setAlgorithm(newValue)
  }

  const correctInput = () => {
      if(value < min){
          setValue(min)
      }
      else if(value > max){
          setValue(max)
      }
      else if(isNaN(value)){
          setValue(min)
      }
  }

  return (
    <Container justify="center" align="center" direction="column" color="#888888" width="95%" margin="auto">
      <h1 className="header">Sorting Algorithms</h1>
      <p>Welcome to this project</p>

      {content.map((item) => {
        return (
          <Card cardOptions={{appearance: "raised"}}>
            <h2 className="header">{item.title}</h2>
            <p>{item.content}</p>
          </Card>
        )
      })}

      <Container direction="column" align="center" justify="center">
        <Container direction="row" align="center" justify="space-around" color={cardColor} width="90%" margin={cardMargin}>
          <Select options={algorithms} onChange={handleAlgorithmChange}></Select>
          <Input type="number" min={min} max={max} value={value} onChange={handleChange} onBlur={correctInput}></Input>
        </Container>
        <AlgorithmPanel barNumber={value} algorithm={algorithm-1}></AlgorithmPanel>
      </Container>

    </Container>
  );
}
