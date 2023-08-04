import React from "react";

const PageNumber = ({num, handler}) => {
    return (
        <button className={"manufactureManagement-pageNumber"} id={`manufactureManagement-pageNumber${num}`} onClick={handler}>{num}</button>
    );
}

export default PageNumber;