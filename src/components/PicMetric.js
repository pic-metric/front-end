import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import PicMetricResult from "./PicMetricResult";

const PicMetric = () => {
  const [userPicInfo, setUserPicInfo] = useState([]);
  const [uploadData, setUploadData] = useState();
  const userId = localStorage.getItem("USER_ID");
  
  useEffect(() => {
    axiosWithAuth()
      .get("/pics/for/" + userId)
      .then(res => setUserPicInfo(res.data))
      .catch(err => { console.log(err); });
  }, [userId]);

  useEffect(() => {
    if (uploadData) {
      const uploadIcon = document.getElementById("uploadIcon");
      const iconTimer = setInterval(() => {
        uploadIcon.style.visibility === "visible" ? 
          uploadIcon.style.visibility = "hidden" : uploadIcon.style.visibility = "visible";
      }, 250);

      setTimeout(() =>  {
        document.getElementById("uploadIcon").style.visibility = "visible";
        clearInterval(iconTimer);
      }, 3000);

      uploadIcon.style.visibility = "hidden";
      uploadIcon.style.fill = "green";
    }
  }, [uploadData])

  const deleteItem = picId => {
    axiosWithAuth()
      .delete("/pics/" + picId)
      .then(res =>  {
        console.log("DELETE OK", res);
        setUserPicInfo(userPicInfo.filter(i => i.id !== picId));
      })
      .catch(err => console.log("DELETE FAIL", err));
  }

  const handleAnalyze = () => {
    if (!uploadData) {
      alert("Select a file before Analyze");
    }
    
    const formData = new FormData();

    formData.append("pic", uploadData);

    axiosWithAuth()
      .post("/pics/" + userId, formData)
      .then(res => {
        console.log("uploadData OK", res);
        setUserPicInfo(res.data);
      })
      .catch(err => console.log("uploadData FAIL", err));
  }

  const handleImageChange = () => {
    if (document.getElementById("imageUpload").files.length === 1) {
      setUploadData(document.getElementById("imageUpload").files[0]);
    }
    else {
      setUploadData();
    }
  }
  
  return (
    !userPicInfo ? <div>Loading...</div> :
    <div>
      <div style={{ display: "flex", marginTop: "10px", justifyContent: "space-between", alignItems: "center" }}>        
        <label type="button" htmlFor="imageUpload" style={{ width: "40%", margin: "0px" }}>Select</label>
        <div style={{ width: "5rem", height: "5rem" }}>  
          <svg id="uploadIcon" viewBox="0 0 44 44" style={ !uploadData ? { fill: "red" } : { fill: "green" }}>
            <path d="M26.29,29.29a1,1,0,0,0,1.41,1.41l8-8a1,1,0,0,0,0-1.41l-8-8a1,1,0,1,0-1.41,1.41L32.59,21H1a1,1,0,0,0,0,2H32.59ZM43,0H7A1,1,0,0,0,6,1V16a1,1,0,0,0,2,0V2H42V42H8V28a1,1,0,0,0-2,0V43a1,1,0,0,0,1,1H43a1,1,0,0,0,1-1V1A1,1,0,0,0,43,0Z"/>
          </svg>
        </div>
        <input onClick={handleAnalyze} type="submit" value="Analyze" style={{ margin: "0px", width: "40%" }} />
        <input type="file" id="imageUpload" onChange={handleImageChange} accept=".jpg,.png" style={{ display: "none" }} />
      </div>
      <div style={{ textAlign: "center", marginTop: "5px" }}>
        Select an image from your computer, then click Analyze.
      </div>
      { 
        userPicInfo.map(i => <PicMetricResult key={i.id} itemId={i.id} deleteItem={deleteItem} />)
      }
    </div>
  );
}

export default PicMetric;