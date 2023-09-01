
// api =  EnbX12j02DDHFrAoqjaq3FIkmTGncrrk
// secret = ekD4hTO1DTpb19Kh

const Awb = document.querySelector('#awb')
Awb.addEventListener('input', function(){
    const number = Awb.value

    if(number.length > 7){
        execute(number)
    }
})

const container= document.querySelector('#container')




// const btn = document.querySelector('#btn')
//     btn.addEventListener('click', )

// API AVAILABILITY & PRICE

// function execute() {
//   const url = "https://api-gateway.champ.aero/csp/transport-means/v1/availability?accountNumber=14000110001&carrierCodes=XS&originAirportCode=SIN&destinationAirportCode=LHR&departureOn=2021-05-08T20%3A30%3A00&weight=150.5";
//   const options = {
//     method: "GET",
//     headers: {
//       "accept": "application/json",
//       "apikey": "EnbX12j02DDHFrAoqjaq3FIkmTGncrrk",
//       "Accept": "application/json"
//     },
//   };
//   fetch(url, options).then(
//     response => {
//       if (response.ok) {
//         return response.text();
//       }
//       return response.text().then(err => {
//         return Promise.reject({
//           status: response.status,
//           statusText: response.statusText,
//           errorMessage: err,
//         });
//       });
//     })
//     .then(data => {
//       console.log(data);
//     })
//     .catch(err => { 12345675
//       console.error(err);
//     });
// }

// API TRACK AND TRACE
function execute(numberAwb) {
    const url = `https://api-gateway.champ.aero/csp/track-and-trace/v1/airwaybill?airlinePrefix=950&serialNumber=${numberAwb}`;
    
    const options = {
      method: "GET",
      headers: {
        "accept": "application/json",
        "apikey": "EnbX12j02DDHFrAoqjaq3FIkmTGncrrk"
    },
    };
    fetch(url, options).then(
      response => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then(err => {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText,
            errorMessage: err,
          });
        });
      })
      .then(data => {
        const contenido = document.createElement('DIV')
        const segment = data.airwaybill.routingSegments[0]
        
        contenido.innerHTML = `
            <strong>Air Waybill: ${data.airwaybill.airlinePrefix}-${data.airwaybill.serialNumber}</strong>  <br />
            <strong>Status: ${data.airwaybill.routingSegments[0].actionStatus.description}</strong>  <br />
            <strong>Shipper:</strong>  <br />
            <strong>Consignee:</strong> <br />
            <strong>Route: ${data.airwaybill.origin.code}-${data.airwaybill.destination.code} </strong>  <br />
            <strong>Pieces/Weight/Volume ${data.airwaybill.pieces}/${data.airwaybill.weight.amount}/ 
                           ${data.airwaybill.volume.amount}</strong> <br />
            <strong>Service:</strong> <br />
            <strong>SCC: </strong> <br />
            <strong>Goods: ${data.airwaybill.natureOfGoods}</strong> <br /> 
            
            <h4>Bookings</h4>
            <div>
                <table width="100%">
                    <tr>
                        <th>Flight</th>
                        <th>Date</th>
                        <th>Segment</th>
                        <th>Planned<br />Pieces / Weight</th>
                        
                    </tr>                    
                        <tr>
                            <td>${segment.transportMeans.carrier.code}-
                                ${segment.transportMeans.transportNumber}</td>
                            <td>${segment.transportMeans.date}</td>
                            <td>${segment.onload.code}-
                                ${segment.offload.code}</td>
                            <td>${segment.pieces}/ ${segment.weight.amount}${segment.weight.unit}/ 
                                ${segment.volume.amount}${segment.volume.unit}</td>
                            <td></td>
                        </tr>                  
                </table>
            </div>
        </div>

    </div>
    <hr />
        `

        
        container.appendChild(contenido)
        
        console.log(data)
      })
      .catch(err => {
        console.error(err);
      });
  }

