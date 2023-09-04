
const Awb = document.querySelector('#awb')
Awb.addEventListener('input', function(){
    const number = Awb.value

    if(number.length > 7){
        execute(number)
    }
})

const container= document.querySelector('#container')
const history= document.querySelector('#table')
const td1 = document.querySelector('#td1')
const td2 = document.querySelector('#td2')


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
        const valor = document.createElement('TR')             
        const segment = data.airwaybill.routingSegments[0]
        const events = Object.values(data.airwaybill.events)          
        
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
            <hr/>
        `
        events.forEach( event => {
          const p = document.createElement('P')

           p.innerHTML += `${event.time} ${event.onload.code}-${event.offload.code} ${event.actionStatus.description}   
                           ${event.pieces} ${event.weight.amount}${event.weight.unit} ${event.transportMeans.reference}`
           
          td1.appendChild(p)
           
        })        
       
          container.appendChild(contenido)
          history.appendChild(td1)    
      })
      .catch(err => {
        console.error(err);
      });
  }

