import { useState } from "react"
export default function BaiTap02() {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [result, setResult] = useState(0);

    function handleChangeA(event){
        setA(event.target.value);
    }

    function handleChangeB(event){
        setB(event.target.value);
    }

    function handleClick(){
        setResult(parseInt(a) + parseInt(b));
    }



    return(
        <>
        <input placeholder = "Nhập a" onChange={handleChangeA} type="text" name="" id="" />
        <input placeholder = "Nhập b" onChange={handleChangeB} type="text" name="" id="" />
        <br />
        <button onClick={handleClick} >Click me !!!</button>
        <br />
        <span>{result}</span>
        </>
    )
}
