import { useState } from "react"

export default function BaiTap01() {
    const [name, setName] = useState('');

    function handleChange(event){
        setName(event.target.value);
    }

    function handleClick(){
        console.log(name);
    }
    return(
        <>
       
        <input onChange={handleChange} type="text" name="" id=""  />
        <br />
        <button onClick={handleClick}>Submit</button>
        <br />
        <span>{name}</span>
        </>
    )
}