import React, { useState, useRef } from "react";
import "../styles/GenerationPage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GeneratePage = () => {
  const [formData, setFormData] = useState({
    plaintiffName: "",
    plaintiffAddress: "",
    defendantName: "",
    defendantAddress: "",
    suitType: "",
    cause_of_action: "",
    relief_sought: "",
    jurisdiction: "", 
    advocateName: "",
    advocateAddress: "",
  });
  
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState("");
  const documentRef = useRef(null);
  
  const API_URL = "https://be12-34-106-184-37.ngrok-free.app";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.status === "success") {
        setGeneratedText(result.generatedText);
        setEditableText(result.generatedText);
        setIsEditing(false);
        console.log("Generated text:", result.generatedText);
      } else {
        console.error("Error:", result.error);
        alert("An error occurred while generating the text: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while connecting to the server. Please check if the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      plaintiffName: "",
      plaintiffAddress: "",
      defendantName: "",
      defendantAddress: "",
      suitType: "",
      cause_of_action: "",
      relief_sought: "",
      jurisdiction: "", 
      advocateName: "",  
      advocateAddress: "",  
    });
    setGeneratedText("");
    setEditableText("");
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save edited text
      setGeneratedText(editableText);
      setIsEditing(false);
    } else {
      // Enter editing mode
      setIsEditing(true);
    }
  };

  const handleEditChange = (e) => {
    setEditableText(e.target.value);
  };

  const generateWordDocument = () => {
    // Create a Blob with the text content
    const blob = new Blob([generatedText], { type: 'text/plain' });
    
    // Create a link element to download the file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'legal_document.docx';
    
    // Append to the body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="form-container">
      <Navbar/>
      <h1>Civil Suit Plaint Generator</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" name="plaintiffName" placeholder="Plaintiff Name" value={formData.plaintiffName} onChange={handleChange} required />
          <input type="text" name="plaintiffAddress" placeholder="Plaintiff Address" value={formData.plaintiffAddress} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <input type="text" name="defendantName" placeholder="Defendant Name" value={formData.defendantName} onChange={handleChange} required />
          <input type="text" name="defendantAddress" placeholder="Defendant Address" value={formData.defendantAddress} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <select name="suitType" value={formData.suitType} onChange={handleChange} required>
            <option value="">Select Suit Type</option>
            <option value="Suit for Recovery of Debt">Suit for Recovery of Debt</option>
            <option value="Property-Related Suits">Property-Related Suits</option>
            <option value="Contractual Disputes">Contractual Disputes</option>
            <option value="Money Recovery Suits">Money Recovery Suits</option>
          </select>
        </div>
        <div className="form-row">
          <input type="text" name="jurisdiction" placeholder="Enter Jurisdiction (City/District)" value={formData.jurisdiction} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <textarea name="cause_of_action" placeholder="Detailed Facts and Nature of Suit" value={formData.cause_of_action} onChange={handleChange} required></textarea>
        </div>
        <div className="form-row">
          <textarea name="relief_sought" placeholder="Relief Sought from the Court" value={formData.relief_sought} onChange={handleChange} required></textarea>
        </div>
        <div className="form-row">
          <input type="text" name="advocateName" placeholder="Advocate Name (Optional)" value={formData.advocateName} onChange={handleChange} />
          <input type="text" name="advocateAddress" placeholder="Advocate Address (Optional)" value={formData.advocateAddress} onChange={handleChange} />
        </div>
        <button type="submit" disabled={isLoading}>{isLoading ? "Generating..." : "Generate"}</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
      
      {generatedText && (
        <div className="generated-content">
          <h2>Generated Legal Document</h2>
          {isEditing ? (
            <textarea 
              ref={documentRef}
              value={editableText}
              onChange={handleEditChange}
              style={{width: '100%', height: '300px'}}
            />
          ) : (
            <div ref={documentRef} style={{whiteSpace: 'pre-wrap'}}>
              {generatedText}
            </div>
          )}
          <div className="document-actions">
            <button onClick={generateWordDocument}>Download Word</button>
            <button onClick={handleEditToggle}>
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratePage;