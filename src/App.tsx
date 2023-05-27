import React,{ useState } from 'react';
import './App.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

  interface MyCustodian {
    files: FileList;
    custodianName: string; 
    uploadProgress: number;
    uploaded: boolean;
  }

function App() {
  const [files,setFiles] = useState<MyCustodian[]>([]);
  const [CustodianTitle, setCustodianTitle] = useState<string>("");

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let newItems = {
        custodianName: "",
        files: e.target.files,
        uploadProgress: 0,
        uploaded: false
      }
      files.push(newItems)
      setFiles([...files]);
    }
  }

  const handleClick = () => {
    if (CustodianTitle !== "") {
      if (files) {
        const progress = Math.round(100);
        setTimeout(()=>{
          files[files.length-1].custodianName = CustodianTitle
          files[files.length-1].uploadProgress = progress
          files[files.length-1].uploaded = true
          setFiles([...files]);
          setCustodianTitle("")
        },1000)
      }
    }else{
      alert("please enter custodian")
    }
    
  }

  return (
    <div className="App">
      <div>
        <div className='file-container'>
          <div className='dragdrop-zone'>
            <input type="file" multiple onChange={handleFiles} />
            <p>Drag your files here or click in this area.</p>
          </div>
          
        </div>
        <div className='uploaded-files-container'>
          {
            files.length > 0?
            <div>
              <h2>Selected files</h2>
              {Array.from(files).map((each,index)=>{
              return(
                <div className='uploaded-container'>
                  <p className='file-title' key={index}>{each.custodianName}</p>
                  {each.uploaded?null:<div className='custodain-container'><input placeholder='Enter custodian' type="text" onChange={(e)=>setCustodianTitle(e.target.value)} value={CustodianTitle} name="Custodian" /><button type="submit" onClick={handleClick}>Upload</button></div>}
                  {Array.from(each.files).map((obj,i)=>{
                    return (<p className='file-title' key={index}>{obj.name}</p>)
                  })}
                  
                  <ProgressBar now={each.uploadProgress} label={`${each.uploadProgress}%`} />
                </div>
              )
            })}
            </div>
            :null
          }
        </div> 
      </div>
    </div>
  );
}

export default App;
