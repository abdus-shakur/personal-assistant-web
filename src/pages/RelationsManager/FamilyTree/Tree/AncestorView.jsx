import Tree from "react-d3-tree";

import data from "./test.json";

import "./dc.scss";
import { useEffect, useState } from "react";
import { TextField, Typography , Button, Autocomplete, Grid } from "@mui/material";
import axios from "axios";

export default function D3Graph() {
  const MyTreeNode = ({ nodeDatum }) => (
    <div className="node">
      {/* Render your custom HTML content for each node */}
      <div>Name: {nodeDatum.name}</div>
      <div>Attributes: {JSON.stringify(nodeDatum.attributes)}</div>
    </div>
  );

  const MyTreeLink = ({ linkDatum }) => (
    <div className="link">
      {/* Render your custom HTML content for each link */}
      <div>Source: {linkDatum.source.name}</div>
      <div>Target: {linkDatum.target.name}</div>
    </div>
  );

  let orgChart = {
    name: "CEO",
    children: [
      {
        name: "Manager",
        attributes: {
          department: "Production",
        },
        children: [
          {
            name: "Foreman",
            attributes: {
              department: "Fabrication",
            },
            children: [
              {
                name: "Worker",
              },
            ],
          },
          {
            name: "Foreman",
            attributes: {
              department: "Assembly",
            },
            children: [
              {
                name: "Worker",
              },
            ],
          },
        ],
      },
    ],
  };

  orgChart = data;

  const renderRectSvgNode1 = ({ nodeDatum, toggleNode }) => (
    <g x="-110" y="0">
        <rect
          class="node-rect"
          width="220"
          height="85"
          x="-110"
          y="0"
          cursor="pointer"
          rx="3"
          fill="none"
          stroke="none"
          stroke-width="1"
        ></rect>
        <foreignObject onClick={toggleNode}
          class="node-foreign-object"
          width="220"
          height="85"
          x="-110"
          y="0"
          style={{ overflow: "visible" }}
        >
          <div
            class="node-foreign-object-div"
            style={{ width: "220px", height: "85px" }}
          >
            <div style={{ fontFamily: ['Inter', 'sans-serif'], backgroundColor: '#040910', position: 'absolute', marginTop: '-1px', marginLeft: '-1px', width:'220px',height:'85px', borderRadius: '10px', border: '1px solid #2599DD'}}>
            <div
              style={{
                backgroundColor: "#B41425",
                position: "absolute",
                marginTop: "-25px",
                marginLeft: "15px",
                borderRadius: "100px",
                width: "50px",
                height: "50px",
              }}
            ></div>
            <img
              src="https://bumbeishvili.github.io/avatars/avatars/portrait84.png"
              style={{ position: 'absolute', marginTop: '-20px', marginLeft: '20px', borderRadius: '100px', width: '40px', height: '40px'}}
            />
            <div
              style={{
                fontSize: "15px",
                color: nodeDatum?.gender=='M'?"#289AD0":"pink",
                marginLeft: "20px",
                marginTop: "32px",
              }}
            >
              {" "}
              {nodeDatum.name.join(", ")}{" "}
            </div>
            {nodeDatum.dob||nodeDatum.dod?
            <div
              style={{
                color: "#289AD0",
                marginLeft: "20px",
                marginTop: "3px",
                fontSize: "10px",
              }}
            >
              {" "}
              {nodeDatum.dob?" "+nodeDatum.dob+" ":""}
              {nodeDatum.dod?"-> "+nodeDatum.dod+" ":""}
            </div>:<></>}
          </div>
          </div>
        </foreignObject>
    </g>
  );

  const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
    <g x="-110" y="0">
      {/* <rect width="20" height="20" x="-10"  /> */}
      {/* <div > */}
      {/* <g onClick={toggleNode} width="40" height="40">
        <text fill="black" strokeWidth="1" x="20">
          {nodeDatum.name} !
        </text>
        {nodeDatum.attributes?.department && (
          <text fill="black" x="20" dy="20" strokeWidth="1">
            Department: {nodeDatum.attributes?.department}
          </text>
        )} */}
        <rect
          className="node-rect"
          width="220"
          height="85"
          x="-110"
          y="0"
          cursor="pointer"
          rx="3"
          fill="none"
          stroke="none"
          strokeWidth="1"
        ></rect>
        <foreignObject onClick={toggleNode}
          className="node-foreign-object"
          width="220"
          height="85"
          x="-110"
          y="0"
          style={{ overflow: "visible" }}
        >
          <div
            className="node-foreign-object-div"
            style={{ width: "220px", height: "85px" }}
            
          >
            
            <div style={{ fontFamily: ['Inter', 'sans-serif'], backgroundColor: '#040910', position: 'absolute', marginTop: '-1px', marginLeft: '-1px', width:'220px',height:'85px', borderRadius: '10px', border: '1px solid #2599DD'}}>
            <div
              style={{
                backgroundColor: "#B41425",
                position: "absolute",
                marginTop: "-25px",
                marginLeft: "15px",
                borderRadius: "100px",
                width: "50px",
                height: "50px",
              }}
            ></div>
            <img
              src="https://bumbeishvili.github.io/avatars/avatars/portrait84.png"
              style={{ position: 'absolute', marginTop: '-20px', marginLeft: '20px', borderRadius: '100px', width: '40px', height: '40px'}}
            />
            
            <div
              style={{
                fontSize: "15px",
                color: nodeDatum?.gender=='M'?"#289AD0":"pink",
                marginLeft: "20px",
                marginTop: "32px",
              }}
            >
              
              {" "}
              {nodeDatum.name.join(", ")}{" "}
              {nodeDatum?.children?.length>0?<span>🟢</span>:<span>🔴</span>}
            </div>
            {nodeDatum.dob||nodeDatum.dod?
            <div
              style={{
                color: "#289AD0",
                marginLeft: "20px",
                marginTop: "3px",
                fontSize: "10px",
              }}
            >
              {" "}
              {nodeDatum.dob?" "+nodeDatum.dob+" ":""}
              {nodeDatum.dod?"-> "+nodeDatum.dod+" ":""}
              
            </div>:<></>}
            
          </div>
          </div>
        </foreignObject>

        {/* <foreignObject x="-20" y="0" width="100" height="50">
            <div xmlns="http://www.w3.org/1999/xhtml">
            <body style={{ color: 'red' }}>This is HTML content inside SVG</body>
            </div>
        </foreignObject> */}
      {/* </g> */}
      {/* </div> */}
    </g>
  );

  const [userId,setUserId] = useState('');
  const [userName,setUserName] = useState('');

  useEffect(()=>{
    getSuggestions('name','mohaid')
    getSuggestions('id','mohaid')
  },[])

  function handleChange(event,value,type){
    console.log(event.target.name)
    if(type==='id')
      setUserId(value)
    if(type==='name')
      setUserName(value)
  }

  const [suggestions,setSuggestions] = useState({id:[],name:[]});
  const [suggestionData,setSuggestionsData] = useState();

  function getSuggestions(type,family){
    let axi = axios.create({baseURL:'http://localhost:8080'})
    axi.get(`/person/autocomplete?type=${type}&family=${family}`).then(response=>{
      setSuggestions((prev)=>({...prev,[type]:type==='name'?response.data.map(dat=>dat[type].join(", ")):response.data.map(dat=>dat[type])}));
      setSuggestionsData((prev)=>({...prev,[type]:response.data}));
    })
  }

  function getDescendantData(id,family){
  
    let axi = axios.create({baseURL:'http://localhost:8080'})
    axi.get(`/person/all-ancestors?id=${id}&family=${family}`).then(response=>{
      setChartData(response.data);
    })

  }
  const [chartData,setChartData] = useState(data);

  function refreshUserId(id,type){
    if(!id)  
      return;
    if(type==='id'){
      getDescendantData(id,'mohaid');
    }else{
      var filteredData = suggestionData[type].find(dat=>type==='name'?dat[type].join(", ")===id:dat[type]).id;
      getDescendantData(filteredData,'mohaid');
    }
  }

  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: "95vw", height: "90vh" }}>

        <Typography variant="h5">{chartData[0].name.join(", ")}</Typography>
      <Grid container gap={2}>
        <Grid container>
          <Grid item>
              <Autocomplete  sx={{ width: 300 }}  options={suggestions.id}  value={userId} onChange={(event,value)=>handleChange(event,value,'id')}
            renderInput={(params) => <TextField {...params}  
            label="User Id"></TextField>}></Autocomplete>
          </Grid>
          <Grid item>
          <Button onClick={()=>refreshUserId(userId,'id') }>Refresh Data</Button>
          </Grid>
        </Grid>
        
        <Grid container>
          <Grid item>
        <Autocomplete  sx={{ width: 300 }}  options={suggestions.name}  value={userName} onChange={(event,value)=>handleChange(event,value,'name')}
        renderInput={(params) => <TextField {...params}  
        label="Name"></TextField>}></Autocomplete>
        </Grid>
        <Grid item>
        <Button onClick={()=>refreshUserId(userName,'name') }>Refresh Data</Button>
        </Grid>
        </Grid>
        </Grid>
      {/* <Tree data={orgChart} pathFunc="step" orientation="vertical"/> */}
      <Tree
        data={chartData}
        orientation="vertical"
        collapsible={true}
        pathFunc="step"
        initialDepth={1}
        translate={{ x: 500, y: 50 }}
        nodeSvgShape={{ shape: "none" }} // Disable default SVG shape
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        nodeSize={{ x: 240, y: 190 }} // Set size for node container
        allowForeignObjects // Enable support for foreign objects (HTML)
        linkComponent={{
          render: <MyTreeLink />,
        }}
        renderCustomNodeElement={renderRectSvgNode}
        // onNodeMouseOver={(node)=>console.log('node mouse over'+JSON.stringify(node.data.id))}
      />
    </div>
  );
}
