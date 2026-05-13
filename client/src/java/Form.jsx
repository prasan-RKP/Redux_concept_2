import React, { useState } from 'react'

const Form = () => {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
    }
  return (
    <div>
         <form>
            <input className='border-2' type="text" onChange={(e)=> setName(e.target.value)} value={name} />
            <button type='submit'>Submit</button>
         </form>
    </div>
  )
}

export default Form;
