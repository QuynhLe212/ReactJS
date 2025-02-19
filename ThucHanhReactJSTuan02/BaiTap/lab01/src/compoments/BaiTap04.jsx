import { useState } from "react";
export default function BaiTap04() {
    const ds = {
        Java: "java là ngôn ngữ lập trình phổ biến",
        Python: "Python là ngôn ngữ lập trình phổ biến",
        C: "C là ngôn ngữ lập trình phổ biến",
        JavaScript: "JavaScript là ngôn ngữ lập trình phổ biến",
    };
    const [content, setContent] = useState(ds.Java);
    const handleTabButtonClick = (key) => {
        setContent(ds[key.target.innerText]);
    };

    return(
        <>
            <button onClick={handleTabButtonClick}>Java</button>
            <button onClick={handleTabButtonClick}>Python</button>
            <button onClick={handleTabButtonClick}>C</button>
            <button onClick={handleTabButtonClick}>JavaScript</button>
            <br />
            <span>{content}</span>
        </>
    )

}