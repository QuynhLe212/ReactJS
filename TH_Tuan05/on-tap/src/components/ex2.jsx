import { useRef } from "react";

export function TextInput(){
    const inputRef = useRef(null);
    const handleClick = () => {
        alert(inputRef.current.value);
    };

    return(
        <div>
            <input type="text" name="" id="" ref={inputRef}/>
            <button onClick={handleClick}>Lấy kí tự</button>
        </div>
    )
}