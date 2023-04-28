import { useRef, useState } from 'react';
import './index.css';

function Ctl(props) {

  var json = useRef(null)
  var [templates, setTemplates] = useState([])
  var [selTemp, setSelTemp] = useState(null)

  const parse = ()=>{
    var t = []

    var lines = json.current.value.split("\n")

    var key = ""
    for(var i=0; i<lines.length; i++){
      var line = lines[i].trim()
      if(!line){
        continue
      }

      if(line.startsWith("#")){
        t.push({
            name: line.replace("#",""),
            template: ``,
            content: []
          })
        continue
      }

      if(line=="template:"){
        i++
        line=lines[i]
        while(line!="----"){
          t[t.length-1].template+=line+"\n"
          i++
          line=lines[i]
        }
        t[t.length-1].template=t[t.length-1].template.trim()
        continue
      }

      if(line=="content:"){
        t[t.length-1].content.push({})
        continue
      }

      if(line.startsWith("key-")){
        key = line.replace("key-","")
        continue
      }

      var x = t[t.length-1].content[t[t.length-1].content.length-1][key] || ""
      t[t.length-1].content[t[t.length-1].content.length-1][key] = x + line+"\n"
    }

    setTemplates(t)
  }

  const setSel = (e)=>{
    var ink = 0
    for(var ij=0; ij<templates.length; ij++){
      if(e.target.value==templates[ij].name){
        ink=ij
        break
      }
    }
    setSelTemp(ink)
  }

  const execTemplate = (c)=>{
    var ti = templates[selTemp].template
    Object.keys(c).map(k=>{
       ti=ti.replace(`{${k}}`,c[k].trim())
    })
    return ti
  }

  return (
    <div className='ctl'>
      <div className='jsonHolder'>
        <textarea className='templateJson' ref={json}></textarea>
        <div className='templateJsonGo' onClick={parse}>Go</div>
      </div>
      <div className='templateDisplay'>
        <select onChange={setSel}>
          {templates.map(tn=>{
            return <option key={tn.name}>{tn.name}</option>
          })}
        </select>
      </div>
      <div className='tempItemHolder'>
        {
          selTemp!==null?templates[selTemp].content.map(c=>{
            return <div className='listItemTemp' onClick={()=>{
              var bc = new BroadcastChannel("obscribe")
              bc.postMessage(execTemplate(c))
            }}
            dangerouslySetInnerHTML={{
              __html : execTemplate(c)
            }}></div>
          }):null
        }
      </div>
    </div>
  )

}

export default Ctl;