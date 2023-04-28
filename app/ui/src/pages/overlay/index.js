import { useEffect, useRef, useState } from 'react';
import './index.css';

function Overlay(props) {

  var self = this
  const { ctl } = props
  var [content, setContent] = useState("ok")

  useEffect(()=>{
    const bc = new BroadcastChannel("obscribe")
    bc.onmessage = ev => {
      console.log(ev.data)
      setContent(ev.data)
    }
  },[])

  return (
    <div>
      {!!content?<div className='overlayRoot' dangerouslySetInnerHTML={{
        __html: content
        }}/>:null}   
    </div>


  )

}

export default Overlay