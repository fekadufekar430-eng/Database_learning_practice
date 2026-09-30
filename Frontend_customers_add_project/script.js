
// Switch between sections/tabs smoothly
function switchSection(sectionId, event) {
    document.querySelectorAll('.section-card').forEach(card => card.classList.remove('active-section'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    document.getElementById(sectionId + '-section').classList.add('active-section');
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
}


// // fetching data and connection of frontend and backend
 
// const createCustomer = (e)=>{
// // this use check?? is it reach the backend code 
// //  console.log("hello");
//     e.preventDefault();
//     fetch("http://localhost:6140/add",{
//     method:"post",
//     headers:{"content-type":"application/json"},
//     body:JSON.stringify({
//     name:document.querySelector("#add-form input[name=name]").value,
//     address:document.querySelector("#add-form input[name=address]").value,
//     company:document.querySelector("#add-form input[name=company]").value,
//     }),
//    })
// .then(()=>alert("Customer added successfully"))
//    .catch((err)=>console.log("hey Fikadu is no work this code try it???",err.message))
// //  console.log("hello"); 
// };


// document
// .getElementById("add-form")
// .addEventListener('submit',createCustomer);




// add function

const createCustomer = () => {
    // this use check?? is it reach the backend code 
    console.log("hello");
    e.preventDefault();
    
    fetch("http://localhost:6140/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.querySelector("#add-form input[name=name]").value,
            address: document.querySelector("#add-form input[name=address]").value,
            company: document.querySelector("#add-form input[name=company]").value,
        }),
    })
    .then(() => console.log("Customer added successfully"))
    .catch((err) => console.log("hey Fikadu is no work this code try it???", err));
    
    // console.log("hello"); 
};

document
.getElementById("add-form")
.addEventListener('submit', createCustomer);

// list function
const getMeList=()=>{
    const sectionList=document.getElementById("list-section");
      sectionList.innerHTML=" ";
     fetch("http://localhost:6140/list")
     .then((res)=>res.json())
     .then((data)=>{
        console.log(data)
        
        data?.map((customer)=>{
            {
                // console.log(customer.customer_name);
                // sectionList.innerHTML +=`${customer.customer_name}`;

                sectionList.innerHTML +=`
                  <div class="row">
                     <h2 class="col-4">${customer.customer_name}</h2>
                      <h2 class="col-4">${customer.address_place}</h2>
                      <h2 class="col-4">${customer.company_name}</h2>
                      <hr>
                </div>
                `;
              
            }

        })
    })
     .catch((err)=>{console.log(err.message)})
}

 document
 .getElementById("list")
 .addEventListener('click', getMeList);

//  update function

 const updateMeData=(e)=>{
    e.preventDefault()

      fetch("http://localhost:6140/update", {
        method: "Put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.querySelector("#editForm input[name=updateName]").value,
            id: document.querySelector("#editForm input[name=id]").value,
            
        }),
    })
    .then(() => alert("Name update successfully"))
    .catch((err) => console.log( err.message))

 };

//  please Here, make sure to select the ID of the form, not the button.
  document
  .getElementById("editForm")
  .addEventListener('submit', updateMeData);



// Delete data function
  
 const deleteData=(e)=>{
    e.preventDefault()

      fetch("http://localhost:6140/delete", {
        method: "Delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: document.querySelector("#deleteForm input[name=id]").value,
            
        }),
    })
    .then(() => alert("Delete are successfully"))
    .catch((err) => console.log( err.message))

 };

//  please Here, make sure to select the ID of the form, not the button.
  document
  .getElementById("deleteForm")
  .addEventListener('submit', deleteData);