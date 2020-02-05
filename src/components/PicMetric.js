import React, { useState, useEffect } from "react";

const fakeData = [
  {
    id: 1,
    image_url: "https://awoiaf.westeros.org/images/d/d2/Jon_snow_by_teiiku.jpg",
    attributes: [ "Jon Snow", "Ghost", "House Stark" ]
  },
  {
    id: 2,
    image_url: "https://awoiaf.westeros.org/images/3/3f/MKomarck_AryaDragonSkulls.jpg",
    attributes: [ "Arya", "Dragons", "King's Landing", "House Stark" ]
  },
  {
    id: 3,
    image_url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0e491a76-9764-4407-a0e6-dd5eccb7e94d/d4coc07-172ed6e6-b62e-4d08-9b4f-260d859c4977.jpg/v1/fill/w_900,h_577,q_75,strp/jaime_lannister_by_teiiku-d4coc07.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi8wZTQ5MWE3Ni05NzY0LTQ0MDctYTBlNi1kZDVlY2NiN2U5NGQvZDRjb2MwNy0xNzJlZDZlNi1iNjJlLTRkMDgtOWI0Zi0yNjBkODU5YzQ5NzcuanBnIiwid2lkdGgiOiI8PTkwMCIsImhlaWdodCI6Ijw9NTc3In1dXX0.B9c_Q1CUpPNW-Aym4iGElniaPLPooD29gPxjiNTaUdI",
    attributes: [ "Jamie", "House Lannister", "Sword" ]
  },
  {
    id: 4,
    image_url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aa33b97a-5919-43ab-952b-ffb538b73eb3/d555k8e-0fc7cc8e-d864-4815-85df-248c7f9f74b5.jpg/v1/fill/w_800,h_800,q_75,strp/the_kingsmoot_by_marcsimonetti-d555k8e.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9hYTMzYjk3YS01OTE5LTQzYWItOTUyYi1mZmI1MzhiNzNlYjMvZDU1NWs4ZS0wZmM3Y2M4ZS1kODY0LTQ4MTUtODVkZi0yNDhjN2Y5Zjc0YjUuanBnIiwid2lkdGgiOiI8PTgwMCIsImhlaWdodCI6Ijw9ODAwIn1dXX0.EutlTCSE7VDFaTQdp82Ye7XbvzxbNaxvDMqfnWUlJoQ",
    attributes: [ "Asha", "House Greyjoy", "Kingsmoot" ]
  }
];

const PicMetric = () => {
  const [imageInfo, setImageInfo] = useState();
  
  useEffect(() => {
    setImageInfo(fakeData);
  }, [fakeData]);

  const handleDelete = itemId => {
    console.log("Delete:", itemId);
  }

  const handleAdd = () => {
    console.log("Add:", document.getElementById("addUrl").value);
  }
  
  return (
    !imageInfo ? <div>Loading...</div> :
    <div>
      <div>
        <input type="text" id="addUrl" style={{ marginTop: "10px" }} />
        <input onClick={handleAdd} type="submit" value="Add Image" style={{ marginTop: "0px" }} />
      </div>
      { 
        imageInfo.map(i => { return (
          <div style={{ display: "flex", border: "1px solid black", marginTop: "10px", marginBottom: "10px", padding: "10px" }} key={i.id}>
            <img src={i.image_url} style={{ width: "500px", border: "1px solid black" }} />
            <div style={{ display: "flex", flexDirection: "column", width: "100%", marginLeft: "10px" }}>
              <div style={{ flexGrow: "1" }}>
                {
                  i.attributes.map(a => { return (
                    <div key={a}>{a}</div>
                  )})
                }
              </div>
              <div>
                <input onClick={() => handleDelete(i.id)} type="submit" value="Delete" style={{ margin: "0px", width: "100%" }} />
              </div>
            </div>
          </div>
        )})
      }
    </div>
  );
}

export default PicMetric;