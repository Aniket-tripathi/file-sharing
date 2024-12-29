import './App.css';
import { useEffect, useRef, useState } from 'react';
import { uploadFile } from './services/Api';

function App() {
  const fileInputRef = useRef();
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (file) {
      getImage();
    }
  }, [file]);

  const getImage = async () => {
    setIsUploading(true);
    try {
      const data = new FormData();
      data.append("name", file.name);
      data.append("file", file);

      let response = await uploadFile(data);
      setResult(response.path);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="title">File Sharing Made Simple</h1>
        <p className="description">Upload a file to generate a shareable link.</p>

        <div className="upload-section">
          <button onClick={onUploadClick} className="upload-btn">
            {isUploading ? 'Uploading...' : 'Upload File'}
          </button>
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file && !isUploading && (
            <p className="file-name">Selected File: {file.name}</p>
          )}
        </div>

        {result && (
          <div className="link-section">
            <p className="link-text">Your Download Link:</p>
            <a href={result} target="_blank" rel="noopener noreferrer" className="result-link">
              {result}
            </a>
            <button onClick={copyToClipboard} className="copy-btn">
              Copy Link
            </button>
            {isCopied && <p className="copy-notification">Link copied!</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;







// import './App.css';
// import { useEffect, useRef, useState } from 'react';
// import { uploadFile } from './services/Api';

// function App() {

//   const fileInputRef = useRef()
//   const [file, setFile] = useState('')
//   const [result, setResult] = useState('')


//   const logo = 'https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg'

//   const onuploadClick = () => {
//     fileInputRef.current.click();
//   }

//   useEffect(() => {
//     getImage();
//   }, [file])

//   const getImage = async () => {
//     if (file) {
//       const data = new FormData();
//       data.append("name", file.name);
//       data.append("file", file);

//       let response = await uploadFile(data);
//       setResult(response.path);
//     }
//   }

//   return (
//     <div className='container'>
//       <img src={logo} alt='banner' />
//       <div className='wrapper'>
//         <h1>Simple file sharing</h1>
//         <p>Upload and share the download link</p>

//         <button onClick={() => onuploadClick()}>Upload</button>
//         <input type='file' hidden
//           ref={fileInputRef}
//           onChange={(e) => setFile(e.target.files[0])}
//         />

//         <a href={result} >{result}</a>
//       </div>
//     </div>


//   );
// }

// export default App;
