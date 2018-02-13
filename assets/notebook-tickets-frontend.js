'use strict';

window.onload = function() {

  // console.log('js frontend is running');

  let httpReq = new XMLHttpRequest();


  getTable();


  // DRAWING THE TABLE
  function getTable() {
    
    httpReq.onreadystatechange = function() {
      if (httpReq.readyState === XMLHttpRequest.DONE && httpReq.status === 200) {
        // console.log(JSON.parse(httpReq.response)); 
  
        let tickets = JSON.parse(httpReq.response);
        buildTable(tickets);
        
      //   httpReq.open('GET', `http://localhost:8080/users`);
      //   httpReq.send();
  
      //   httpReq.onreadystatechange = function() {
      //     if (httpReq.readyState === XMLHttpRequest.DONE && httpReq.status === 200) {
      //       // console.log(JSON.parse(httpReq.response)); 
            
      //       let users = JSON.parse(httpReq.response);
  
      //       // console.log('planetsTContent: ', planetsTContent);
      //       // console.log('shipTContent: ', shipTContent);
            
      //       buildTable(tickets, users); 
      //     }
      //   };
      // }
      }
    };
  
    httpReq.open('GET', `http://localhost:8080/tickets`);
    httpReq.send();
  }

  // I DON'T HAVE ENOUGH TIIIIIME FOR THIS
  function buildTable(toBuildFrom1) {
    console.log('building');
    let table = document.querySelector('table');

    table.innerHTML = '';

    let tableHeader = document.createElement('thead');
    let tableBody = document.createElement('tbody');
    
    let tableHeaderRow = document.createElement('tr');

    let tableHeaderID = document.createElement('th'); 
    let tableHeaderReporter = document.createElement('th');
    let tableHeaderManufacturer = document.createElement('th');
    let tableHeaderSerialNumber = document.createElement('th');
    let tableHeaderDescription = document.createElement('th');
    let tableHeaderDate = document.createElement('th');
    let tableHeaderActions = document.createElement('th');

    table.appendChild(tableHeader);
    table.appendChild(tableBody);

    tableHeader.appendChild(tableHeaderRow);

    tableHeaderID.appendChild(document.createTextNode('ID'));
    tableHeaderReporter.appendChild(document.createTextNode('Reporter'));
    tableHeaderManufacturer.appendChild(document.createTextNode('Manufacturer'));
    tableHeaderSerialNumber.appendChild(document.createTextNode('Serial number'));
    tableHeaderDescription.appendChild(document.createTextNode('Description'));
    tableHeaderDate.appendChild(document.createTextNode('Date'));
    tableHeaderActions.appendChild(document.createTextNode('Actions'));

    tableHeaderRow.appendChild(tableHeaderID);
    tableHeaderRow.appendChild(tableHeaderReporter);
    tableHeaderRow.appendChild(tableHeaderManufacturer);
    tableHeaderRow.appendChild(tableHeaderSerialNumber);  
    tableHeaderRow.appendChild(tableHeaderDescription);  
    tableHeaderRow.appendChild(tableHeaderDate);  
    tableHeaderRow.appendChild(tableHeaderActions);  
  
    toBuildFrom1.forEach((e, i) => {
      let tableBodyRow = document.createElement('tr');
      
      let tableCellID = document.createElement('td');
      let tableCellReporter = document.createElement('td');
      let tableCellManufacturer = document.createElement('td');
      let tableCellSerialNumber = document.createElement('td');
      let tableCellDescription = document.createElement('td');
      let tableCellDate = document.createElement('td');
      let tableCellActions = document.createElement('td');
      
      tableBody.appendChild(tableBodyRow);
      tableBodyRow.appendChild(tableCellID);
      tableBodyRow.appendChild(tableCellReporter); 
      tableBodyRow.appendChild(tableCellManufacturer);
      tableBodyRow.appendChild(tableCellSerialNumber);   
      tableBodyRow.appendChild(tableCellDescription);   
      tableBodyRow.appendChild(tableCellDate);   
      tableBodyRow.appendChild(tableCellActions);   
    });
  }

};
