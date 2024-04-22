// App.js
import React from 'react';
// import { Tree, TreeNode } from 'react-organizational-chart';
import data from '../data'
import test from './test'
// import Tree from 'react-hierarchy-tree-graph';
var familyData = [{
  id: 1,
  name: 'John Doe',
  children: [
    {
      id: 2,
      name: 'Jane Doe',
      children: [
        {
          id: 4,
          name: 'Emily Doe'
        },
        {
          id: 5,
          name: 'Michael Doe'
        }
      ]
    },
    {
      id: 3,
      name: 'David Doe',
      children: [
        {
          id: 6,
          name: 'Sophia Doe'
        },
        {
          id: 7,
          name: 'Daniel Doe'
        }
      ]
    }
  ]
}];


familyData = data;
familyData = test;



const WIDTH = 70;
const HEIGHT = 80;



function PeopleGraph() {
  const myTreeData = [
    {
      name: 'Top Level',
      attributes: {
        keyA: 'val A',
        keyB: 'val B',
        keyC: 'val C',
      },
      children: [
        {
          name: 'Level 2: A',
          attributes: {
            keyA: 'val A',
            keyB: 'val B',
            keyC: 'val C',
          },
        },
        {
          name: 'Level 2: B',
        },
      ],
    },
  ];

  const StyledNode = <div style={{
  padding: '5px',
  borderRadius: '8px',
  display: 'inline-block',
  border: '1px solid red'
  }}></div>;
  return (
    <div className="App" >
      <h1>Family Tree</h1>
      {/* <div> */}
      <div id="treeWrapper" style={{width: '85vw', height: '50em'}}>
{/* 
        <Tree data={familyData} 
          orientation='vertical'
          pathFunc='diagonal' zoom="5"/> */}

      </div>
      {/* </div> */}
    </div>
  );
}

export default PeopleGraph;
