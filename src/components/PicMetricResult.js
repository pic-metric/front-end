import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
const baseUrl = "https://bw-pic-metric.herokuapp.com/api" // needed for <img> tags

const PicMetricResult = ({ itemId, deleteItem }) => {
  const [imageAttributes, setImageAttributes] = useState([]);
  
  useEffect(() => {
    axiosWithAuth()
      .get("/attributes/" + itemId)
      .then(res => {
        setImageAttributes(
          res.data.map(a => {
            return {
              name: a.attribute,
              count: a.count,
              id: a.id
            }
        }));
      });
  }, [itemId]);

  return (
    <div style={{ display: "flex", border: "1px solid black", marginTop: "10px", marginBottom: "10px", padding: "10px" }} key={itemId}>
      <img alt="" src={baseUrl + "/pics/unprocessed/" + itemId} style={{ width: "450px", border: "1px solid black" }} />
      <div style={{ display: "flex", flexDirection: "column", width: "100%", marginLeft: "10px" }}>
        <div style={{ flexGrow: "1", marginBottom: "5px" }}>
          {
            imageAttributes.map(a => <div key={a.id}>{a.name} ({a.count})</div>)
          }
        </div>
        <div>
          <input onClick={() => deleteItem(itemId)} type="submit" value="Delete" style={{ margin: "0px", width: "100%" }} />
        </div>
      </div>
    </div>
  );
}

export default PicMetricResult
