import { useState } from "react";

const Square = ({value}) => {
    const [val, setVal] = useState('');
    return (
        <button onClick={() => setVal(val === '' ? value === 'X' ? 'X' : 'O' : val)}>
            {val}
        </button>
    );
}
export default Square;