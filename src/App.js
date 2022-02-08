import {useEffect, useLayoutEffect, useState} from "react";

const width = 8
const candyColors = [
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "yellow"
]

const App = () => {
    const [currentColorArray, setCurrentColorArray] = useState([]);

    const array = () => {
        const colorArray = []
        for (let i = 0; i < width * width; i++) {
            const arr = candyColors[Math.floor(Math.random() * candyColors.length)]
            colorArray.push(arr)
        }
        setCurrentColorArray(colorArray)
    }

    const rowOfFour = () => {
        for (let i = 0; i < currentColorArray.length; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3]
            const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37, 38,39,45, 46,47,53,54,55,62,63,64]
            const decidedColor = currentColorArray[i]

            if (notValid.includes(i)) continue

            if (rowOfFour.every(item => currentColorArray[item] === decidedColor)) {
                rowOfFour.forEach(el => {
                    currentColorArray[el] = ''
                })
            }
        }
    }

    const colorOfFour = () => {
        for (let i = 0; i < currentColorArray.length; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            const decidedColor = currentColorArray[i]
            if (columnOfFour.every(item => currentColorArray[item] === decidedColor)) {
                columnOfFour.forEach(el => {
                    currentColorArray[el] = ''
                })
            }
        }
    }
    const colorOfThree = () => {
        for (let i = 0; i < currentColorArray.length; i++) {
            const columnOfThree = [i, i + width, i + width * 2]
            const decidedColor = currentColorArray[i]
            if (columnOfThree.every(item => currentColorArray[item] === decidedColor)) {
                console.log(currentColorArray)
                columnOfThree.forEach(el => {
                    currentColorArray[el] = ''
                })
            }
        }
    }
    const rowOfThree = () => {
        for (let i = 0; i < currentColorArray.length; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const notValid = [6,7,14,15,22,23,30,31, 38,39, 46,47,54,55,63,64]
            const decidedColor = currentColorArray[i]

            if (notValid.includes(i)) continue

            if (rowOfThree.every(item => currentColorArray[item] === decidedColor)) {
                rowOfThree.forEach(el => {
                    currentColorArray[el] = ''
                })
            }
        }
    }

    const moveIntoSquare = () => {
        for (let i = 0; i < 64 - width; i++) {
            const firstRow = [0,1,2,3,4,5,6,7]
            const isFirstRow = firstRow.includes(i)

            if (isFirstRow && currentColorArray[i] === '') {
                  let randomNumber = Math.floor(Math.random() * candyColors.length)
                    currentColorArray[i] = candyColors[randomNumber]
            }

            if ((currentColorArray[i + width]) === '') {
                currentColorArray[i + width] = currentColorArray[i]
                currentColorArray[i] = ''
            }
        }
    }



    useEffect(() => {
        array()
    } ,[])

    useLayoutEffect(() => {
        const item = setInterval(() => {
            rowOfFour()
            colorOfFour()
            colorOfThree()
            rowOfThree()
            moveIntoSquare()
            setCurrentColorArray([...currentColorArray])
        }, 300)
        return () => clearInterval(item)
    }, [colorOfFour,rowOfFour,colorOfThree,rowOfThree,moveIntoSquare, currentColorArray]);


    return (
        <section className='flex'>
            <div className='game'>
                {currentColorArray?.map((square , i) => {
                    return (
                        <div key={i} style={{backgroundColor: square}}>

                        </div>
                    )
                })}
            </div>
        </section>
    )
}
export default App;

