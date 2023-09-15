
const Awb = document.querySelector('#awb')

Awb.addEventListener('input', function(){
    const number = Awb.value
    
    if(number.length == 8){
        execute(number)
    }
})

const container= document.querySelector('#container')
const history= document.querySelector('#table')
const body= document.querySelector('#body')
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
        const principal = document.createElement('DIV')
        principal.classList.add('row')
        const contenido = document.createElement('DIV') 
        contenido.classList.add('col', 'align-bottom')
        // contenido.classList.add('row')
        const contenido2 = document.createElement('DIV') 
        // contenido2.classList.add('col','routeBox')         
        contenido2.classList.add('col')         
               
        const segment = data.airwaybill.routingSegments[0]
        const events = Object.values(data.airwaybill.events)          
        
        contenido.innerHTML = `
            <h4>Summary</h4><br/>
            <strong>Air Waybill: </strong>${data.airwaybill.airlinePrefix}-${data.airwaybill.serialNumber} <br/>
            <strong>Status: </strong>${data.airwaybill.routingSegments[0].actionStatus.description}<br/>
            <strong>Shipper:</strong>  <br/>
            <strong>Consignee:</strong> <br/>
            <strong>Route: </strong>${data.airwaybill.origin.code}-${data.airwaybill.destination.code}<br/>
            <strong>Pieces/Weight/Volume</strong> ${data.airwaybill.pieces}/${data.airwaybill.weight.amount}/ 
                           ${data.airwaybill.volume.amount}<br/>
            <strong>Service:</strong> <br/>
            <strong>SCC: </strong> <br/>
            <strong>Goods: </strong>${data.airwaybill.natureOfGoods}<br/><br/>           
        `
        contenido2.innerHTML = `
        
            <table class="table table-ccm-day">             
              
                <tr class="headers">
                    <th>Flight</th>
                    <th>Date</th>
                    <th>Segment</th>
                    <th>Planned / Pieces / Weight</th>                    
                </tr>                               
             
                <tr>
                    <td>${segment.transportMeans.carrier.code}-${segment.transportMeans.transportNumber}</td>
                    <td>${segment.transportMeans.date}</td>
                    <td>${segment.onload.code}-
                        ${segment.offload.code}</td>
                    <td>${segment.pieces} / &nbsp; &nbsp; &nbsp; ${segment.weight.amount}${segment.weight.unit} / 
                        ${segment.volume.amount}${segment.volume.unit}</td>                      
                </tr> 
                              
            </table>       
          <br/>
          <h4>History</h4> 
        `
        const btn = document.createElement('BUTTON') 
        btn.textContent = 'Show'
        btn.classList.add('active')
        contenido2.appendChild(btn)

        btn.addEventListener('click', function(){
           
          const divHistory = document.querySelector('#history')
          divHistory.classList.remove('oculto')
        })
        
        events.forEach( event => {

          const tr = document.createElement('TR')
          tr.classList.add('headers')
          
          const time = document.createElement('TD')
          time.innerHTML = `${event.time}`
          tr.append(time)

          const onload = document.createElement('TD')
          onload.innerHTML = `${event.onload.code}-${event.offload.code} ${event.actionStatus.description}`
          tr.append(onload)

          const pieces = document.createElement('TD')
          pieces.innerHTML = `  ${event.pieces}`
          tr.append(pieces)

          const weight = document.createElement('TD')
          weight.setAttribute("id", "idWeight");
          weight.innerHTML = `${event.weight.amount}${event.weight.unit}`
          tr.append(weight)

          const details = document.createElement('TD')
          details.setAttribute("id", "idDetails")
          details.innerHTML = ` ${event.transportMeans.reference}`
          tr.append(details)

          body.append(tr)
          history.append(body)
           
        })        
          // contenido.appendChild(contenido2)
          // container.appendChild(contenido)
          // contenido.append(contenido2)
          // principal.appendChild(contenido)
          principal.append(contenido)
          principal.append(contenido2)
          container.appendChild(principal)
            
      })
      .catch(err => {
        console.error(err);
      });
  }

