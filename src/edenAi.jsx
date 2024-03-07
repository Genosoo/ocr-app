import { useState } from 'react';
import axios from 'axios';
import "./App.css"


const apiKey = import.meta.env.VITE_APIKEY_EDENAI

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [generatedText, setGeneratedText] = useState("")

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const form = new FormData();
    // Append the file to the form
    form.append('file', file);
    // Append other parameters as needed
    form.append('providers', 'microsoft,google');
    form.append('language', 'en');
    form.append('fallback_providers', '');

    try {
      // Send the POST request
      const response = await axios.post(
        'https://api.edenai.run/v2/ocr/ocr',
        form,
        {
          headers: {
            // Set authorization token in headers
            Authorization: `Bearer ${apiKey}`,
            // Set content type header for multipart/form-data with the boundary generated by FormData
            'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
          },
        }
      );

      // Handle successful response
      console.log(response.data);
      setGeneratedText(response.data.google.text);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      <div>
            <p >
               {generatedText}
            </p>
      </div>
    </div>
  );
};

export default ImageUpload;
