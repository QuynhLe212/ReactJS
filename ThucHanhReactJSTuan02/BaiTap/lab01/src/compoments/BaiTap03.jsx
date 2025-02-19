import { useState } from "react";

export default function BaiTap03() {

    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [result, setResult] = useState(0);

    function handleChangeA(event){
        setA(Number(event.target.value));
    }

    function handleChangeB(event){
        setB(Number(event.target.value));
    }

    function handleClick(operation){
        let res = 0;
        switch(operation) {
            case 'add':
                res = a + b;
                break;
            case 'subtract':
                res = a - b;
                break;
            case 'multiply':
                res = a * b;
                break;
            case 'divide':
                res = b !== 0 ? a / b : 'Cannot divide by zero';
                break;
            default:
                res = 0;
        }
        setResult(res);
    }

    return(
        <>
            <input placeholder="Nhập a" onChange={handleChangeA} type="text" />
            <input placeholder="Nhập b" onChange={handleChangeB} type="text" />
            <br />
            <button onClick={() => handleClick('add')}>Cộng</button>
            <button onClick={() => handleClick('subtract')}>Trừ</button>
            <button onClick={() => handleClick('multiply')}>Nhân</button>
            <button onClick={() => handleClick('divide')}>Chia</button>
            <br />
            <span>{result}</span>
        </>
    )
}