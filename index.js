
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuupt8sd7IurqFUDIxw1uYgkLV2VpGybE",
  authDomain: "dual-control-system.firebaseapp.com",
  databaseURL: "https://dual-control-system-default-rtdb.firebaseio.com",
  projectId: "dual-control-system",
  storageBucket: "dual-control-system.appspot.com",
  messagingSenderId: "56624826044",
  appId: "1:56624826044:web:86942aac69ab90991d72b9",
  measurementId: "G-TC0GL0EN0K",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig)
import {getDatabase, ref, child, get, set, update, remove, onValue} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";



const db = getDatabase();
console.log(db);








const green = document.querySelector(".green")
const blue = document.querySelector(".blue")
const transparent = document.querySelector(".transparent")
const left = document.querySelector(".left")
const right = document.querySelector(".right")
const size = document.querySelector("#size")
const increase = document.querySelector("#increase")
const decrease = document.querySelector("#decrease")
const degrees = document.querySelector(".deg")
const rod = document.getElementById("rod")
const icon = document.querySelector(".button_one .icon_mode")
const upper = document.querySelector(".contained_one")
const lower = document.querySelector(".contained_two")
const container_two = document.querySelector(".container_three")
const container_four = document.querySelector(".container_four")
const main_container = document.querySelector(".container")
const input = document.querySelector(".search")
const first_button = document.querySelector(".one")
const second_button = document.querySelector(".two")
const icon_two = document.querySelector(".two .icon_mode")
const input_button = document.querySelector(".btn")
const form = document.querySelector("form")
const input_bar = document.querySelector(".input")
const password_text = document.querySelector(".password")
const bot_one = document.querySelector("#bot.one")
const bot_two = document.querySelector("#bot.two")
const bot_three = document.querySelector("#bot.three")
const bot_four = document.querySelector("#bot.four")
const loading = document.querySelector(".loader")
const body = document.querySelector("body")
const text = document.querySelector(".text")
const iconnn = document.querySelector("#iconnn")
const iconnn_two = document.querySelector("#iconnn_two")
const view = document.querySelector(".view")








const dbRef = ref(db);



let idd = 0;
let degg =90;
let speed = 0;
let interval_1 = 'start';
let interval_2 = 'start';
let stopper_1 = 'start';
let stopper_2 = 'start';
let pass;
let mode;
let count = 2;
let admin_store;
let time_store = 0;




let practice;


function AddData() {
    set(ref(db, 'EmployeeSet/' + degg), {
        nameofemployee:{firstname: "boy", lastname: "fish"},
        department: 100,
        head:20

    }).then(()=>{
        alert('Data Added Successfully')
    }).catch((error)=>{
        alert("unsuccessful")
        console.log(error);
        
    })   
}
function RetData() {
    const dbRef = ref(db);
    get(child(dbRef, 'EmployeeSet/' + degg)).then((snapshot)=>{
        if(snapshot.exists()){
            practice = snapshot.val().nameofemployee.firstname;
            console.log(practice);
            

        }
        else{
            alert("Employee does not exist")
        }
    })
   
}
function UpdateData() {
    update(ref(db, 'EmployeeSet/' + degg), {
        nameofemployee:{firstname: "bro", lastname: "bear"},
        department: 200,
        head:400

    }).then(()=>{
        alert('Data updated Successfully')
    }).catch((error)=>{
        alert("unsuccessful")
        console.log(error);   
    })   
}

function DeleteData() {
    remove(ref(db, 'EmployeeSet/' + degg), {
        nameofemployee:{firstname: "bro", lastname: "bear"},
        department: 200,
        head:400

    }).then(()=>{
        alert('Data updated Successfully')
    }).catch((error)=>{
        alert("unsuccessful")
        console.log(error);   
    })   
}

function update_server_colors() {
    update(ref(db,  'Dual_control/' + idd), {
        transparent: JSON.parse(localStorage.getItem('transparent')),
        blue: JSON.parse(localStorage.getItem('blue')),
        green:JSON.parse(localStorage.getItem('green')),
        

    }).then(()=>{
        console.log('Data updated Successfully')
    }).catch((error)=>{
        alert("unsuccessful")
        console.log(error);   
    })   
    
}
function update_server_mode() {
    update(ref(db,  'Dual_control/' + idd), {
        mode: JSON.parse(localStorage.getItem('mode')),    
    }).then(()=>{
        console.log('Data updated Successfully')
    }).catch((error)=>{
        console.log(error);   
    })   
    
}


function update_server_mode_without_storage(mode) {
    update(ref(db,  'Dual_control/' + idd), {
        mode: mode    
    }).then(()=>{
        console.log('Data updated Successfully')
    }).catch((error)=>{
        console.log(error);   
    })   
    
}

function update_server_transparent_ON_without_storage() {
    update(ref(db,  'Dual_control/' + idd), {
        transparent:"ON"   
    
    }).then(()=>{
        console.log('Data updated Successfully')
    }).catch((error)=>{
        console.log(error);   
    })      
}

function update_server_transparent_OFF_without_storage() {
    update(ref(db,  'Dual_control/' + idd), {
        transparent:"OFF"   
    
    }).then(()=>{
        console.log('Data updated Successfully')
    }).catch((error)=>{
        console.log(error);   
    })      
}

function update_server_blue_OFF_without_storage() {
    update(ref(db,  'Dual_control/' + idd), {
        blue:"OFF"  
    
    }).then(()=>{
        console.log('Data updated Successfully')
    }).catch((error)=>{
        console.log(error);   
    })      
}
function update_server_blue_ON_without_storage() {
    update(ref(db,  'Dual_control/' + idd), {
        blue:"ON"  
    
    }).then(()=>{
        console.log('Data updated Successfully')
    }).catch((error)=>{
        console.log(error);   
    })      
}
function update_server_green_OFF_without_storage() {
    update(ref(db,  'Dual_control/' + idd), {
        green:"OFF"   
    
    }).then(()=>{
        console.log('Data updated Successfully')
    }).catch((error)=>{
        console.log(error);   
    })      
}
function update_server_green_ON_without_storage() {
    update(ref(db,  'Dual_control/' + idd), {
        green:"ON"   
    
    }).then(()=>{
        console.log('Data updated Successfully')
    }).catch((error)=>{
        console.log(error);   
    })      
}
function update_server_deg() {
    update(ref(db,  'Dual_control/' + idd), {
        deg: JSON.parse(localStorage.getItem('degree'))
          
    }).then(()=>{
        console.log('Data updated Successfully')
        console.log("ddddddds");
        
    }).catch((error)=>{
        alert("unsuccessful")
        console.log(error);   
    })   
    
}

function degree_reset(){
    degg = JSON.parse(localStorage.getItem('degree'))
    degrees.textContent = `${degg.toString()}°`                  
    rod.style.transform =  `rotate(${90-degg}deg)`
    
}
function update_self_mode(retrieved_mode) {
    mode = retrieved_mode
    console.log(mode);
    

           if (mode === 'S_master') {
                    iconnn.classList = ''
                    iconnn.classList.add('fa-solid')
                    iconnn.classList.add('fa-crown')
           }
           else if (mode === 'H_master') {
            iconnn.classList = ''
            iconnn.classList.add('fa-solid')
            iconnn.classList.add('fa-lock')
           }

            else if (mode === '-') {
                iconnn.classList = ''
                iconnn.classList.add('fa-solid')
                iconnn.classList.add('fa-circle-nodes')
            }
   
    
}
function update_self_deg(retrieved_deg){
    degg = retrieved_deg
    degrees.textContent = `${degg.toString()}°`
    rod.style.transform = `rotate(${90-degg}deg)`
}
function update_self_speed(){
    speed = JSON.parse(localStorage.getItem('speedd'))
           size.innerHTML = `${speed.toString()}`
    
}
function update_self_colors(retrieved_green,retrieved_blue, retrieved_transparent){
    if (retrieved_blue === 'ON') {
        blue.classList.add('active')             
        }
        else{
            blue.classList.remove('active')
        }
        if (retrieved_green === 'ON') {
            green.classList.add('active')                 
        }
        else{
            green.classList.remove('active')
        }
        if (retrieved_transparent === 'ON') {
            transparent.classList.add('active')                 
        }
        else{
            transparent.classList.remove('active')
        }

    
}
function stages(stage) {
    console.log(stage);
    
    if (stage === "first_stage"){
        
        upper.id='none'
        lower.id='none' 
        setTimeout(() => {
            upper.classList.add("fade_out")
            lower.classList.add("fade_out")
            first_button.classList.add("fade_out") 
        }, 100);
        
        setTimeout(() => {
            first_button.id= ""
            lower.id= ""
            upper.id= ""
            
        }, 200);
        setTimeout(() => {
            upper.classList.remove("fade_out")
            lower.classList.remove("fade_out")
            first_button.classList.remove("fade_out") 
        }, 600);


    }
else if (stage === "second_stage") {
        upper.id='none'
        lower.id='none' 
        first_button.id = 'none'
        setTimeout(() => {
            main_container.classList.add('password')
            input.style.opacity = "0"
            container_two.classList.add('fade_out')
            container_two.id="" 
    
        }, 300);
        setTimeout(() => {
        iconnn.style.color = `rgb(0, 0, 0)`
        container_two.classList.remove('fade_out')
        input.style.opacity = "1"
         second_button.classList.add("fade_out")
         second_button.id=""       
        }, 900);  
    }
else if (stage === "third_stage") {
        upper.id='none'
        lower.id='none' 
        first_button.id= "none"

        setTimeout(() => {
            second_button.classList.add('bot_mode')
            container_two.id='none'
            second_button.id='none'
            console.log('here');
            
            container_four.classList.add('fade_out')
            second_button.classList.add('fade_out')
            bot_four.style.marginBottom = `360px`
            bot_one.style.marginBottom = `360px`
            bot_two.style.marginBottom = `360px`
            bot_three.style.marginBottom = `360px`
            
        }, 2451-2300)

        setTimeout(() => {
            console.log('here');
            second_button.id=''
            container_four.id=''
            bot_one.classList.add('bottom_reducer')
        }, 2651 -2300)
        setTimeout(() => {
            bot_two.classList.add('bottom_reducer')
        }, 2680-2300)
        setTimeout(() => {
            bot_three.classList.add('bottom_reducer')
        }, 2710-2300)
        setTimeout(() => {
            bot_four.classList.add('bottom_reducer')
        }, 2730-2300)
        setTimeout(() => {
            bot_four.style.marginBottom = `10px`
            bot_one.style.marginBottom = `10px`
            bot_two.style.marginBottom = `10px`
            bot_three.style.marginBottom = `10px`
            bot_one.classList.remove('bottom_reducer')
            bot_two.classList.remove('bottom_reducer')
            bot_three.classList.remove('bottom_reducer')
            bot_four.classList.remove('bottom_reducer')
            container_four.classList.remove('fade_out')
            second_button.classList.remove('fade_out')
            
        }, 4000-2300)
        
    }
    
}
function admin_reset() {
    if (admin_store === "online") {
        body.classList.add('admin')  
        count=3
        text.innerText = "unadmin"
        bot_four.style.setProperty('--clr', 'aliceblue');
    }
    else{
        body.classList.remove('admin')
        text.innerText = "admin"
        bot_four.style.setProperty('--clr', 'black'); 
        count=2
    }
    
}

function icon_reset() {
    if (mode === "S_master") {
        iconnn.classList = ''
        iconnn.classList.add('fa-solid')
        iconnn.classList.add('fa-crown')
        
        

    }
    else if (mode === "H_master") {
        iconnn.classList = ''
        iconnn.classList.add('fa-solid')
        iconnn.classList.add('fa-lock')
        
        
    }
    else if(mode === "-"){
        iconnn.classList = ''
        iconnn.classList.add('fa-solid')
        iconnn.classList.add( 'fa-circle-nodes')
    }
    
}

function ret_dual_data() {
    
    
    const dbRef = ref(db);
    get(child(dbRef, 'Dual_control/' + idd)).then((snapshot)=>{
        
        if(snapshot.exists()){
       
           let retrieved_deg  = snapshot.val().deg;
           let retrieved_green = snapshot.val().green;
           let retrieved_blue= snapshot.val().blue;
           let retrieved_transparent = snapshot.val().transparent;
           let retrieved_mode = snapshot.val().mode;

           update_self_deg(retrieved_deg)
           update_self_mode(retrieved_mode)
           update_self_speed()
           
           update_self_colors(retrieved_green,retrieved_blue,retrieved_transparent)        
           
            }
            
        else{
            alert(" does not exist")
        }
        
    })}

    function ret_admin_Data() {
        const dbRef = ref(db);
        get(child(dbRef,'Dual_control/' + idd)).then((snapshot)=>{
            if(snapshot.exists()){
                admin_store = snapshot.val().admin;
                admin_reset()
                localStorage.setItem('admin_2',JSON.stringify(admin_store))

                
                
                
    
            }
            else{
                alert(" does not exist")
            }
        })
       
    }
    function ret_mode_Data() {
        const dbRef = ref(db);
        get(child(dbRef,'Dual_control/' + idd)).then((snapshot)=>{
            if(snapshot.exists()){
                mode = snapshot.val().mode;
                
                
                localStorage.setItem('mode_2',JSON.stringify(mode))
                icon_reset()
                
    
            }
            else{
                alert(" does not exist")
            }
        })
       
    }
    function ret_time_Data() {
        const dbRef = ref(db);
        get(child(dbRef,'Dual_control/' + idd)).then((snapshot)=>{
            if(snapshot.exists()){
                time_store = snapshot.val().time;
            }
            else{
                alert(" does not exist")
            }
        })
       
    }

function update_degree() {
    update(ref(db, 'Dual_control/' + idd), {
        deg:degg
    }).then(()=>{
        console.log('Data updated Successfully')
    }).catch((error)=>{
        console.log("unsuccessful");   
    })    
}

function time_updater() {
    update(ref(db, 'Dual_control/' + idd), {
        time:time_store
    }).then(()=>{
        console.log('Data updated Successfully')
    }).catch((error)=>{
        console.log("unsuccessful");   
    })    
}

function admin_updater() {
    update(ref(db, 'Dual_control/' + idd), {
        admin:admin_store
    }).then(()=>{
        console.log('Data updated Successfully')
    }).catch((error)=>{
        console.log("unsuccessful");   
    })    
}

function deg_reload_function(deg_status) {
    console.log(deg_status);
    degg = deg_status
    localStorage.setItem('degree',JSON.stringify(deg_status)) 
    console.log(degg);
    degrees.textContent = `${(degg).toString()}°`
    rod.style.transform = `rotate(${90-degg}deg)`
}
function led_reload_function(green_status,blue_status,transparent_status) {
    
    if (green_status==='ON' && !(green.classList.contains("active"))) {
        green.classList.add('active')
        localStorage.setItem('green',JSON.stringify(green_status)) 

    }
    else if  (green_status==='OFF'&& green.classList.contains("active")) {
         green.classList.remove('active')   
         localStorage.setItem('green',JSON.stringify(green_status)) 
    }

    if (blue_status==='ON' && !(blue.classList.contains("active"))) {
        blue.classList.add('active')   
        localStorage.setItem('blue',JSON.stringify(blue_status)) 
    }
    else if (blue_status==='OFF'&& blue.classList.contains("active")) {
         blue.classList.remove('active')   
         localStorage.setItem('blue',JSON.stringify(blue_status)) 
    }
    
    if (transparent_status==='ON' && !(transparent.classList.contains("active"))) {
        transparent.classList.add('active')   
        localStorage.setItem('transparent',JSON.stringify(transparent_status)) 
    }
    else if (transparent_status==='OFF'&& transparent.classList.contains("active")) {
         transparent.classList.remove('active')  
         localStorage.setItem('transparent',JSON.stringify(transparent_status))  
    }

   


    
}
function password_checker() {
    const dbRef = ref(db);
    console.log("cnncnc");
            
    // console.log("yess");




    // input_bar.value =''
    // loading.classList.add("quick")
    
    // setTimeout(() => {
    //     second_button.classList.remove("fade_out")
    //     second_button.classList.add("quick")
    // }, 200);

    // setTimeout(() => {
    //     password_text.classList.add("quick")
    //     input.classList.add('margin_grow')
    // }, 400);
    // setTimeout(() => {
    //     input_button.classList.add('reduce')
    //     input_bar.classList.add('reduce')
    // }, 320);

    // setTimeout(() => {
    //     input_bar.style.padding = "0px" 
    // }, 690);
    // setTimeout(() => {
        
    //     main_container.classList.remove('password')
    //     second_button.classList.add('bot_mode')
    //     input_button.classList.remove('reduce')
    //     input_bar.classList.remove('reduce')
    //     password_text.classList.remove("quick")
    //     input.classList.remove('margin_grow')
    //     second_button.classList.remove("quick")
    //     loading.classList.remove("quick")
    // }, 2650)
    // setTimeout(() => {
        
        
    //     container_two.id='none'
    //     second_button.id='none'
    //     console.log('here');
        
    //     container_four.classList.add('fade_out')
    //     second_button.classList.add('fade_out')
    //     bot_four.style.marginBottom = `360px`
    //     bot_one.style.marginBottom = `360px`
    //     bot_two.style.marginBottom = `360px`
    //     bot_three.style.marginBottom = `360px`
        
    // }, 2451)

    // setTimeout(() => {
    //     console.log('here');
    //     second_button.id=''
    //     container_four.id=''
         

    //     if (container_four.id === '') {
    //         localStorage.setItem('stage',JSON.stringify("third_stage"))     
    //     }
    //     bot_one.classList.add('bottom_reducer')
    // }, 2651)
    // setTimeout(() => {
    //     bot_two.classList.add('bottom_reducer')
    // }, 2680)
    // setTimeout(() => {
    //     bot_three.classList.add('bottom_reducer')
    // }, 2710)
    // setTimeout(() => {
    //     bot_four.classList.add('bottom_reducer')
    // }, 2730)
    // setTimeout(() => {
    //     bot_four.style.marginBottom = `10px`
    //     bot_one.style.marginBottom = `10px`
    //     bot_two.style.marginBottom = `10px`
    //     bot_three.style.marginBottom = `10px`
    //     bot_one.classList.remove('bottom_reducer')
    //     bot_two.classList.remove('bottom_reducer')
    //     bot_three.classList.remove('bottom_reducer')
    //     bot_four.classList.remove('bottom_reducer')
    //     container_four.classList.remove('fade_out')
    //     second_button.classList.remove('fade_out')
        
    // }, 4000)

    
   console.log("vbvbvb");
   
    get(child(dbRef, 'Dual_control/' + idd)).then((snapshot)=>{
        
        if(snapshot.exists()  && navigator.onLine){
            
            

            console.log(snapshot.val().password );
            console.log(pass);
            
            
            
            
            
            if ( snapshot.val().password === pass){
                console.log("yess");
                input_bar.value = ""
                

                loading.classList.add("quick")
                setTimeout(() => {
                    second_button.classList.remove("fade_out")
                    second_button.classList.add("quick")
                }, 200);

                setTimeout(() => {
                    password_text.classList.add("quick")
                    input.classList.add('margin_grow')
                }, 400);
                setTimeout(() => {
                    input_button.classList.add('reduce')
                    input_bar.classList.add('reduce')
                }, 320);

                setTimeout(() => {
                    input_bar.style.padding = "0px" 
                }, 690);
                setTimeout(() => {
                    
                    main_container.classList.remove('password')
                    second_button.classList.add('bot_mode')
                    input_button.classList.remove('reduce')
                    input_bar.classList.remove('reduce')
                    password_text.classList.remove("quick")
                    input.classList.remove('margin_grow')
                    second_button.classList.remove("quick")
                    loading.classList.remove("quick")
                }, 2650)
                setTimeout(() => {
                    
                    
                    container_two.id='none'
                    second_button.id='none'
                    console.log('here');
                    pass= ""
                    localStorage.setItem('input',JSON.stringify("")) =
                    container_four.classList.add('fade_out')
                    second_button.classList.add('fade_out')
                    bot_four.style.marginBottom = `360px`
                    bot_one.style.marginBottom = `360px`
                    bot_two.style.marginBottom = `360px`
                    bot_three.style.marginBottom = `360px`
                    
                }, 2451)

                setTimeout(() => {
                    console.log('here');
                    second_button.id=''
                    container_four.id=''
                    bot_one.classList.add('bottom_reducer')
                }, 2651)
                setTimeout(() => {
                    bot_two.classList.add('bottom_reducer')
                }, 2680)
                setTimeout(() => {
                    bot_three.classList.add('bottom_reducer')
                }, 2710)
                setTimeout(() => {
                    bot_four.classList.add('bottom_reducer')
                }, 2730)
                setTimeout(() => {
                    bot_four.style.marginBottom = `10px`
                    bot_one.style.marginBottom = `10px`
                    bot_two.style.marginBottom = `10px`
                    bot_three.style.marginBottom = `10px`
                    bot_one.classList.remove('bottom_reducer')
                    bot_two.classList.remove('bottom_reducer')
                    bot_three.classList.remove('bottom_reducer')
                    bot_four.classList.remove('bottom_reducer')
                    container_four.classList.remove('fade_out')
                    second_button.classList.remove('fade_out')
                    
                }, 4000)

                





                
                
            }
            else{
                console.log("no");
                input.classList.add('wrong')
                input_bar.value =''
                setTimeout(() => {

                    input.classList.remove('wrong')
                    
                }, 500);

                
            }

            

    
            

        }
        else{
            console.log('error'); 

        }

        
    })
    
        
        
}    
function icon_click() {
        console.log("broo");

        
    
        if(container_four.id===""){
            console.log('broo');
            
    
            bot_four.classList.add('top_increaser')
            setTimeout(() => {
                bot_three.classList.add('top_increaser')
            }, 30)
            setTimeout(() => {
                bot_two.classList.add('top_increaser')
            }, 70)
            setTimeout(() => {
                bot_one.classList.add('top_increaser')
            }, 90)
            setTimeout(() => {
                container_four.classList.add('fade_in')
                second_button.classList.add('fade_in')
                first_button.classList.add("fade_out")
               
                
            }, 800)
            setTimeout(() => {
                second_button.classList.remove('bot_mode')
                container_four.classList.remove('fade_in')
                second_button.classList.remove('fade_in')
                upper.classList.add("fade_out")
                lower.classList.add("fade_out") 
                container_four.id='none'
                second_button.id='none'
                bot_four.classList.remove('top_increaser') 
                bot_one.classList.remove('top_increaser') 
                bot_two.classList.remove('top_increaser') 
                bot_three.classList.remove('top_increaser') 
                
            
                bot_four.style.marginTop = `10px`
                bot_one.style.marginTop = `10px`
                bot_two.style.marginTop = `10px`
                bot_three.style.marginTop = `10px`
                first_button.id= ""
                lower.id= ""
                upper.id= ""




                if (upper.id === '') {
                    localStorage.setItem('stage',JSON.stringify("first_stage"))     
                } 
                
    
                
            }, 830);
            setTimeout(() => {
    
                


                upper.classList.remove("fade_out")
                lower.classList.remove("fade_out")
                first_button.classList.remove("fade_out") 
                first_button.classList.remove("fade_in") 
                
            }, 2000);
            
    
            
        }
    
        
        else{
            console.log('meeeeeeeeeeeeeeeeeee')
            
            second_button.classList.remove("fade_out")
        
        container_two.classList.remove('fade_in')
        console.log('1')
        
        setTimeout(() => {
            main_container.classList.remove('password')
            container_two.id= "none"
            container_two.classList.remove("fade_in") 
            console.log('2')

        }, 100);
        setTimeout(() => { 
            second_button.classList.add("fade_in")
            console.log('3')

        }, 300);
        setTimeout(() => { 
            second_button.id = "none"
            second_button.classList.remove("fade_in")
            console.log('4')

        }, 600);

        // console.log((localStorage.getItem('stage')));
        
    
    
        if (first_button.classList.contains("fade_in") || JSON.parse(localStorage.getItem('stage'))==='second_stage' ) {
            first_button.classList.remove("fade_in")
            first_button.classList.add("fade_out")
            
    
            setTimeout(() => {
                

                lower.id= ""
                upper.id= ""
                if (upper.id === '') {
                    localStorage.setItem('stage',JSON.stringify("first_stage"))     
                } 
                first_button.id= ""
                upper.classList.add("fade_out")
    
                lower.classList.add("fade_out")
                
            }, 800);
     
        }
    
        }
    
        
    
    
}
function current_time() {
    let time = new Date().getTime()
    return time
}
function store(modde,speedddd,transparentt,greenn,bluee) {
    mode = modde
        speed = speedddd
        size.innerHTML = `${speed.toString()}`
        degg =  JSON.parse(localStorage.getItem('degree'))
        rod.style.transform = `rotate(${90-degg}deg)`
        degrees.textContent = `${degg.toString()}°`
        



        if (bluee === 'ON') {
            blue.classList.add('active')
                        
        }
        else{
            blue.classList.remove('active')
        }

        if (greenn === 'ON') {
            green.classList.add('active')                 
        }
        else{
            green.classList.remove('active')
        }

        if (transparentt === 'ON') {
            transparent.classList.add('active')                 
        }
        else{
            transparent.classList.remove('active')
        }

    
}
onValue(ref(db, 'Dual_control/' + idd), (snapshot) => {
  const data = snapshot.val();
  
  led_reload_function(data.green, data.blue, data.transparent)
  deg_reload_function(data.deg)

  
//   adjust_function()
}, (error) => {
  console.error(error);
});





setTimeout(() => {
    view.id = 'none'
    
}, 6500);



function backend_function() {
    
    let speedd = JSON.parse(localStorage.getItem('speedd'))
    let transparentt = JSON.parse(localStorage.getItem('transparent'))
    let bluee = JSON.parse(localStorage.getItem('blue'))
    let greenn = JSON.parse(localStorage.getItem('green'))
    let degree = JSON.parse(localStorage.getItem('degree'))
    let stage = JSON.parse(localStorage.getItem('stage'))
    let modde = JSON.parse(localStorage.getItem('mode'))
    let adminn = JSON.parse(localStorage.getItem('admin'))
    let speedddd = JSON.parse(localStorage.getItem('speedd'))
    let timeeeee = JSON.parse(localStorage.getItem('time'))
    

    

    
    if (navigator.onLine) {

        get(child(dbRef, 'Dual_control/' + idd)).then((snapshot)=>{
            
            if(snapshot.exists()){
                
                let admin_status = snapshot.val().admin;
                let time_status = snapshot.val().time;

                console.log(admin_status);
                console.log(time_status);
                console.log(timeeeee);
                console.log(adminn);
                
                

                if(!(admin_status === adminn)){
                    console.log('haaa');
                    if (timeeeee > time_status) {
                        
                        admin_store = adminn
                        time_store = timeeeee 
                        localStorage.setItem('time',JSON.stringify(time_store))
                        localStorage.setItem('admin',JSON.stringify(admin_store)) 
                        time_updater()
                        admin_updater()
                        
                    }

                    if (timeeeee < time_status) {
                        admin_store = admin_status
                        time_store = time_status
                        localStorage.setItem('time',JSON.stringify(time_store))
                        localStorage.setItem('admin',JSON.stringify(admin_store)) 
                        time_updater()
                        admin_updater()  
                    }
                }

                if(admin_status === adminn){
                    console.log('hooo');
                    if (timeeeee > time_status) {
                        
                        
                        admin_store = adminn
                        time_store = timeeeee 
                        localStorage.setItem('time',JSON.stringify(time_store))
                        localStorage.setItem('admin',JSON.stringify(admin_store)) 
                        time_updater()
                        admin_updater()
                        
                    }

                    if (timeeeee < time_status) {
                        
                        
                        admin_store = admin_status
                        time_store = time_status
                        localStorage.setItem('time',JSON.stringify(time_store))
                        localStorage.setItem('admin',JSON.stringify(admin_store)) 
                        time_updater()
                        admin_updater()  
                    }
                }


                
                
                ret_admin_Data()
                ret_time_Data()
                ret_mode_Data()
                stages(stage)
                admin_store = JSON.parse(localStorage.getItem('admin_2'))
                mode = JSON.parse(localStorage.getItem('mode_2'))
                console.log(admin_store);
                update_self_speed()

                
                

                if ((JSON.parse(localStorage.getItem('stage')) === "second_stage") && JSON.parse(localStorage.getItem('input')) !== "") {
                        
                    console.log('herrrrreeeeee');
                    setTimeout(() => {
                        pass = JSON.parse(localStorage.getItem('input') )    
                        password_checker()       
                        
                    }, 3000);
                    

                    

                }

                if (admin_store === "manual") {
                    console.log("dsdfsfd");
                    console.log(mode);
                    console.log(degree);
                    
                    
                    
                    

                    
                    
                    if (mode === "S_master") {
                        if ((  !(transparentt ==="") || !(bluee ==="") || !(greenn ==="") || !(degree === 0) )) {
                            console.log("dsdfsfd");
                            store(modde,speedddd,transparentt,greenn,bluee,degree)
                            console.log('ksxlxx');
                            admin_reset()
                            update_server_colors()
                            update_server_deg()
                            degree_reset()
                            update_server_mode()
                            
                            localStorage.setItem('transparent',JSON.stringify(""))
                            localStorage.setItem('blue',JSON.stringify(""))
                            localStorage.setItem('green',JSON.stringify(""))
                            localStorage.setItem('degree',JSON.stringify(0))
                            localStorage.setItem('mode',JSON.stringify(""))
                            
                        
                        }
                        

     
                    }
                    else if (mode === "H_master"){
                        
                        ret_dual_data()

                        localStorage.setItem('transparent',JSON.stringify(""))
                        localStorage.setItem('blue',JSON.stringify(""))
                        localStorage.setItem('green',JSON.stringify(""))
                        localStorage.setItem('degree',JSON.stringify(0))
                        localStorage.setItem('mode',JSON.stringify(""))
                        

                    }
                    else if (mode === "-"){

                        ret_dual_data()

                        localStorage.setItem('transparent',JSON.stringify(""))
                        localStorage.setItem('blue',JSON.stringify(""))
                        localStorage.setItem('green',JSON.stringify(""))
                        localStorage.setItem('degree',JSON.stringify(0))
                        localStorage.setItem('mode',JSON.stringify(""))

                    }

                    


                    
                }
                
                
                if (admin_store ==="online" || admin_store === "") {
                    console.log(admin_store);
                    

                    if (mode === "S_master") {
                        if ((  !(transparentt ==="") || !(bluee ==="") || !(greenn ==="") || !(degree === 0) )) {
                            store(modde,speedddd,transparentt,greenn,bluee,degree)
                            console.log('ksxlxx');
                            admin_reset()
                            update_server_colors()
                            update_server_deg()
                            degree_reset()
                            update_server_mode()
                            localStorage.setItem('transparent',JSON.stringify(""))
                            localStorage.setItem('blue',JSON.stringify(""))
                            localStorage.setItem('green',JSON.stringify(""))
                            localStorage.setItem('degree',JSON.stringify(0))
                            localStorage.setItem('mode',JSON.stringify(""))
                            
                        
                        }
                        

     
                    }
                    else if (mode === "H_master"){
                        ret_dual_data()
                        localStorage.setItem('transparent',JSON.stringify(""))
                        localStorage.setItem('blue',JSON.stringify(""))
                        localStorage.setItem('green',JSON.stringify(""))
                        localStorage.setItem('degree',JSON.stringify(0))
                        localStorage.setItem('mode',JSON.stringify(""))
                        

                    }
                    else if (mode === "-"){
                        if ((  !(transparentt ==="") || !(bluee ==="") || !(greenn ==="") || !(degree === 0) )) {
                            store(modde,speedddd,transparentt,greenn,bluee,degree)
                            console.log('ksxlxx');
                            admin_reset()
                            update_server_colors()
                            update_server_deg()
                            degree_reset()
                            update_server_mode()
                            localStorage.setItem('transparent',JSON.stringify(""))
                            localStorage.setItem('blue',JSON.stringify(""))
                            localStorage.setItem('green',JSON.stringify(""))
                            localStorage.setItem('degree',JSON.stringify(0))
                            localStorage.setItem('mode',JSON.stringify(""))
                            
                        
                        }

                    }



                    
                }
                
                
                



    
            }

      } )
    
    }

    else {
        console.log('hertrrg')
        admin_store = adminn 
        stages(stage)
        store(modde,speedd,transparentt,greenn,bluee,degree) 
        icon_reset()
        admin_reset()
    }

    if (navigator.onLine) {
        

        get(child(dbRef, 'Dual_control/' + idd)).then((snapshot)=>{
            
            if(!snapshot.exists()){

                set(ref(db, 'Dual_control/' + idd), {
                    green: "OFF",
                    blue: "OFF",
                    transparent: "OFF",
                    deg:90,
                    admin:"online",
                    time: current_time(),
                }).then(()=>{
                    console.log('Data Added Successfully');   
                }).catch((error)=>{
                    console.log(error)

                    
                    
                    // let retrieved_mode = JSON.parse(localStorage.getItem('mode_stored'))
                }) 
                
                localStorage.setItem('speedd',JSON.stringify(speed))

            }
            
        })

        



    }

    
    
}


backend_function()



window.addEventListener("offline",()=>{
    console.log('you are  not connected');
    backend_function()
})

window.addEventListener("online",()=>{
    console.log('you are conected');
    backend_function()

})






decrease.addEventListener('mouseup',()=>{
    
    
    if (interval_1 !== 'start') {
        clearInterval(interval_1) 
        interval_1= 'start' 
        console.log("4");
        
    }

})
decrease.addEventListener('mouseleave',()=>{
    if (interval_1 !== 'start') {
        clearInterval(interval_1) 
        interval_1= 'start' 
    }
    
})
decrease.addEventListener('mousedown',()=>{
    console.log('hiii');
    if (interval_1 === 'start') {
        interval_1 = setInterval(() => {
            console.log('right here');
            console.log(mode);
            


            if (((mode==="S_master" || mode==="-") ) ){
                if(speed <= 0){
                    speed = 0
                    size.innerHTML = `${speed.toString()}`    
                }
                else {
                    speed--
                    size.innerHTML = `${speed.toString()}`
                }
                localStorage.setItem('speedd',JSON.stringify(speed))

            }
            
            
            
        }, 1000-((10-speed)*90));
        
    }
    
    
})
decrease.addEventListener('click',()=>{
    console.log(mode);
    
    if (((mode==="S_master" || mode==="-"))){
            
            if(speed <= 0){
                speed = 0
                size.innerHTML = `${speed.toString()}`    
            }
            else {
                speed--
                size.innerHTML = `${speed.toString()}`
            }
            localStorage.setItem('speedd',JSON.stringify(speed))

        }

}

)
increase.addEventListener('mouseleave',()=>{
    
    
    if (interval_2 !== 'start') {
        clearInterval(interval_2) 
        interval_2= 'start' 
        console.log("3");
        
    }})
increase.addEventListener('mouseup',()=>{
    
    
        if (interval_2 !== 'start') {
            clearInterval(interval_2) 
            interval_2= 'start' 
            console.log("4");
            
        }
    
})
increase.addEventListener('mousedown',()=>{
    console.log('835');
    console.log("mode");
    
    if (interval_2 === 'start') {
        console.log(speed);
        
        
        interval_2 = setInterval(() => {


            console.log(mode);
            console.log(admin_store);
            
            
            if ((mode==="S_master" || mode==="-") ){
                if(speed >= 10){
                    speed = 10
                    size.innerHTML = `${speed.toString()}`    
                }
                else {
                    speed++
                    size.innerHTML = `${speed.toString()}`
                }
                localStorage.setItem('speedd',JSON.stringify(speed))

            }
            
        }, 1000-(speed*90));
    }
})
increase.addEventListener('click',()=>{
    console.log('835');
    
    if ((mode==="S_master" || mode==="-")){
        if(speed >= 10){
            speed = 10
            size.innerHTML = `${speed.toString()}`    
        }
        else {
            speed++
            size.innerHTML = `${speed.toString()}`
        }
        localStorage.setItem('speedd',JSON.stringify(speed))

    }

    
}
)

right.addEventListener('mousedown', ()=>{
    if (stopper_1==="start" && speed>0) {
        stopper_1 = setInterval(() => {
            

         if ((mode==="S_master" || mode==="-") && (navigator.onLine) ){
                if(degg <= 0){
                    degg = 0
                    degrees.textContent = `${(degg).toString()}°`
                }
                else {
                    degg--
                    degrees.textContent = `${degg.toString()}°`
                } 
                rod.style.transform = `rotate(${90-degg}deg)`
                update_degree()
                localStorage.setItem('degree',JSON.stringify(degg))

                

            }

            else if ((mode==="S_master" || mode==="-") && !(navigator.onLine) ){
                if(degg <= 0){
                    degg = 0
                    degrees.textContent = `${(degg).toString()}°`
                }
                else {
                    degg--
                    degrees.textContent = `${degg.toString()}°`
                } 
                rod.style.transform = `rotate(${90-degg}deg)`
                localStorage.setItem('degree',JSON.stringify(degg))


            }



                        // if(degg <= 0){
                        //     degg = 0
                        //     degrees.textContent = `${(degg).toString()}°`
                        // }
                        // else {
                        //     degg--
                        //     degrees.textContent = `${degg.toString()}°`
                        // } 
                        // rod.style.transform = `rotate(${90-degg}deg)`
                        // update_degree()

                        
                    },(1000/(2*speed)));      
    }



    
})
right.addEventListener('mouseleave', ()=>{
    clearInterval(stopper_1)
    stopper_1 = "start"
})
right.addEventListener('mouseup',()=>{
    
    
    if (stopper_1 !== 'start') {
        clearInterval(stopper_1) 
        stopper_1= 'start' 
        console.log("4");
        
    }

})



left.addEventListener('mousedown', ()=>{
    if (stopper_2 === "start" && speed>0) {

        stopper_2 = setInterval(() => {

            if (mode==="H_master" && !(navigator.onLine) ) {   
                console.log('right hereeeee');
                console.log(mode);
                
            }
            else if ((mode==="S_master" || mode==="-")  && !(navigator.onLine)  ){
                if(degg >= 180){
                    degg = 180
                    degrees.textContent = `${(degg).toString()}°`
                }
                else {
                    degg++
                    degrees.textContent = `${degg.toString()}°`
                }          
                rod.style.transform =  `rotate(${90-degg}deg)`
                localStorage.setItem('degree',JSON.stringify(degg))

            }

            else if ((mode==="S_master" || mode==="-")  && (navigator.onLine)  ){
                if(degg >= 180){
                    degg = 180
                    degrees.textContent = `${(degg).toString()}°`
                }
                else {
                    degg++
                    degrees.textContent = `${degg.toString()}°`
                }          
                rod.style.transform =  `rotate(${90-degg}deg)`
                update_degree()
                localStorage.setItem('degree',JSON.stringify(degg))

            }



            // if(degg >= 180){
            //     degg = 180
            //     degrees.textContent = `${(degg).toString()}°`
            // }
            // else {
            //     degg++
            //     degrees.textContent = `${degg.toString()}°`
            // }          
            // rod.style.transform =  `rotate(${90-degg}deg)`
            // update_degree()
            
            
            
        },(1000/(2*speed)));
        
        
    }    
})
left.addEventListener('mouseleave', ()=>{
    clearInterval(stopper_2)
    stopper_1 = "start"
})
left.addEventListener('mouseup',()=>{
    
    
    if (stopper_2 !== 'start') {
        clearInterval(stopper_2) 
        stopper_2= 'start' 
        console.log("4");
        
    }

})

green.addEventListener('click', ()=>{
    console.log('boy');
    
    
    
     if ( (((mode === "S_master" || mode === "-")))  &&  !(navigator.onLine)   )
         {
            green.classList.toggle('active')

        if (transparent.classList.contains('active') && !(green.classList.contains('active'))) {
            console.log('heyyy');
            
            localStorage.setItem('green',JSON.stringify("OFF"))  
            transparent.classList.remove('active')   
            localStorage.setItem('transparent',JSON.stringify("OFF"))  
        }

        if (green.classList.contains('active')) {
            localStorage.setItem('green',JSON.stringify("ON"))  
            
        }
        if(!green.classList.contains('active')){
            localStorage.setItem('green',JSON.stringify("OFF"))  
        }
        
        
    }
        else if( ((navigator.onLine) && !(mode ==='H_master')) ){
            green.classList.toggle('active')

            if (transparent.classList.contains('active') && !(green.classList.contains('active'))) {
                console.log('heyyy');
                update_server_green_OFF_without_storage()
                localStorage.setItem('green',JSON.stringify("OFF"))  
                transparent.classList.remove('active')  
                update_server_transparent_OFF_without_storage()
                localStorage.setItem('transparent',JSON.stringify("OFF"))  
            }

    
            if (green.classList.contains('active')) {
                update_server_green_ON_without_storage()
                localStorage.setItem('green',JSON.stringify("ON"))  
                
            }
            if(!green.classList.contains('active')){
                update_server_green_OFF_without_storage()   
                localStorage.setItem('green',JSON.stringify("OFF"))  
    
            }
            
            
        }


    

})
blue.addEventListener('click', ()=>{

    

    if( ((!navigator.onLine) && !(mode ==='H_master')) ){
        blue.classList.toggle('active')
    if (transparent.classList.contains('active') && !(blue.classList.contains('active'))) {
        console.log('heyyy');
        
        localStorage.setItem('blue',JSON.stringify("OFF"))  
        transparent.classList.remove('active')   
        localStorage.setItem('transparent',JSON.stringify("OFF"))  
    }

    if (blue.classList.contains('active')) {
        localStorage.setItem('blue',JSON.stringify("ON"))  
        
    }
    if(!blue.classList.contains('active')){
        localStorage.setItem('blue',JSON.stringify("OFF"))  
    }
    
}  
    
    else if( ((navigator.onLine) && !(mode ==='H_master')) ){
        blue.classList.toggle('active')

        if (transparent.classList.contains('active') && !(blue.classList.contains('active'))) {
            console.log('heyyy');
            update_server_blue_OFF_without_storage()
            localStorage.setItem('blue',JSON.stringify("OFF"))  
            transparent.classList.remove('active')  
            update_server_transparent_OFF_without_storage()
            localStorage.setItem('transparent',JSON.stringify("OFF")) 
        }


        if (blue.classList.contains('active')) {
            update_server_blue_ON_without_storage()
            localStorage.setItem('blue',JSON.stringify("ON"))  
            
        }
        if(!blue.classList.contains('active')){
            update_server_blue_OFF_without_storage() 
            localStorage.setItem('blue',JSON.stringify("OFF"))    

        }
        
        
    }

    

})

transparent.addEventListener('click', ()=>{

    
    
    if (!(mode === "H_master") && (navigator.onLine)) {
        transparent.classList.toggle('active')
        if (transparent.classList.contains('active')) {
            update_server_transparent_ON_without_storage()
            localStorage.setItem('transparent',JSON.stringify("ON")) 
            if (green.classList.contains('active')=== false) {
                green.classList.add('active')
                update_server_green_ON_without_storage()  
                localStorage.setItem('green',JSON.stringify("ON")) 
    
            }
            if (blue.classList.contains('active')=== false) {
                blue.classList.add('active')  
                update_server_blue_ON_without_storage() 
                localStorage.setItem('blue',JSON.stringify("ON")) 
    

            }
            
        }
    
        else if (!(transparent.classList.contains('active'))) {
            localStorage.setItem('transparent',JSON.stringify("OFF"))
            update_server_transparent_OFF_without_storage()   

            if (green.classList.contains('active') === true) {
                update_server_green_OFF_without_storage() 
                localStorage.setItem('green',JSON.stringify("OFF")) 

                green.classList.remove('active')  
            }
            if (blue.classList.contains('active')=== true) {
                update_server_blue_OFF_without_storage() 
                localStorage.setItem('blue',JSON.stringify("OFF")) 

                blue.classList.remove('active')  
            }
            
        }


        
        
    }
    if ( (((mode === "S_master" || mode === "-"))) && !(navigator.onLine)) {
        transparent.classList.toggle('active')
        if (transparent.classList.contains('active')) {
            
            if (green.classList.contains('active')=== false) {
                green.classList.add('active')  
            }
            if (blue.classList.contains('active')=== false) {
                blue.classList.add('active')  
            }
            
        }
    
        else if (!(transparent.classList.contains('active'))) {
            if (green.classList.contains('active') === true) {
                green.classList.remove('active')  
            }
            if (blue.classList.contains('active')=== true) {
                blue.classList.remove('active')  
            }
            
        }

        
        if ((transparent.classList.contains("active"))) {
            localStorage.setItem('transparent',JSON.stringify("ON"))                 
        }
        else{
            localStorage.setItem('transparent',JSON.stringify("OFF")) 
        }
        if ((blue.classList.contains("active"))) {
            localStorage.setItem('blue',JSON.stringify("ON"))   
              
        }
        else{
            localStorage.setItem('blue',JSON.stringify("OFF"))   
        }
        if ((green.classList.contains("active"))) {
            localStorage.setItem('green',JSON.stringify("ON"))  
               
        }
        else{
            localStorage.setItem('green',JSON.stringify("OFF"))     

        }
        
    }

})







icon.addEventListener('click',()=>{


    if (count === 2) {
        upper.classList.add("fade_in")
    lower.classList.add("fade_in")
    first_button.classList.add("fade_in")
    setTimeout(() => {
        upper.id= "none"
        lower.id= "none"
        first_button.id= "none"
        upper.classList.remove("fade_in")
        lower.classList.remove("fade_in")

        
    }, 200);
    setTimeout(() => {
        main_container.classList.add('password')
        input.style.opacity = "0"
        container_two.classList.add('fade_out')
        
        container_two.id="" 

    }, 300);
    // setTimeout(() => {

        
    // }, 600 );
    setTimeout(() => {
    iconnn.style.color = `rgb(0, 0, 0)`
    container_two.classList.remove('fade_out')
     input.style.opacity = "1"


     second_button.classList.add("fade_out")
     second_button.id=""
     
     if (container_two.id==='') {
        localStorage.setItem('stage',JSON.stringify("second_stage"))    
} 
        
    }, 900);

    
            
    }

    else{

        upper.classList.add("fade_in")
        lower.classList.add("fade_in")
        first_button.classList.add("fade_in")
        setTimeout(() => {
        upper.id= "none"
        lower.id= "none"
        first_button.id= "none"
        upper.classList.remove("fade_in")
        lower.classList.remove("fade_in")
        second_button.classList.add('bot_mode')

        
    }, 200);

        setTimeout(() => {
                    
                    
            container_two.id='none'
            second_button.id='none'
            console.log('here');
            
            container_four.classList.add('fade_out')
            second_button.classList.add('fade_out')
            bot_four.style.marginBottom = `360px`
            bot_one.style.marginBottom = `360px`
            bot_two.style.marginBottom = `360px`
            bot_three.style.marginBottom = `360px`
            
        }, 2451-2300)

        setTimeout(() => {
            console.log('here');
            second_button.id=''
            container_four.id=''

            if (container_four.id==='') {
                localStorage.setItem('stage',JSON.stringify("third_stage"))  
            }
            bot_one.classList.add('bottom_reducer')
        }, 2651 -2300)
        setTimeout(() => {
            bot_two.classList.add('bottom_reducer')
        }, 2680-2300)
        setTimeout(() => {
            bot_three.classList.add('bottom_reducer')
        }, 2710-2300)
        setTimeout(() => {
            bot_four.classList.add('bottom_reducer')
        }, 2730-2300)
        setTimeout(() => {
            bot_four.style.marginBottom = `10px`
            bot_one.style.marginBottom = `10px`
            bot_two.style.marginBottom = `10px`
            bot_three.style.marginBottom = `10px`
            bot_one.classList.remove('bottom_reducer')
            bot_two.classList.remove('bottom_reducer')
            bot_three.classList.remove('bottom_reducer')
            bot_four.classList.remove('bottom_reducer')
            container_four.classList.remove('fade_out')
            second_button.classList.remove('fade_out')
            
        }, 4000-2300)

        
        
    }

     


})
icon.addEventListener('mouseover', () =>{
    console.log("broo");
    
    if (mode === "S_master") {
        console.log("haffa");
        iconnn.style.color = `rgba(209, 10, 146, 0.216)`
        

    }
    else if (mode === "H_master") {
        iconnn.style.color = `rgba(152, 145, 4, 0.585)`
        
        
    }
    else if(mode === "-"){
        iconnn.style.color =`rgba(149, 0, 255, 0.204)`
        

    }
})
icon.addEventListener('mouseout', () =>{
    console.log(1);
    
    if (mode === "S_master" || mode === "H_master" || mode === "-") {
        iconnn.style.color = `rgb(0, 0, 0)`  
    }
    
})
icon_two.addEventListener('mouseover', () =>{
    console.log('ckcxk');
    if (mode === "S_master") {
        iconnn_two.style.color = `rgba(209, 10, 146, 0.216)`
        
        
    }
    else if (mode === "H_master") {
        iconnn_two.style.color = `rgba(152, 145, 4, 0.585)`
        
    }
    else if(mode === "-"){
        iconnn_two.style.color =`rgba(149, 0, 255, 0.204)`

    }
})
icon_two.addEventListener('mouseout', () =>{
    console.log('ckcxk');
    
    if (mode === "S_master" || mode === "H_master" || mode === "-") {
        iconnn_two.style.color = `rgb(0, 0, 0)`  
    }
    
})
icon_two.addEventListener('click',()=>{
    icon_click()
})


bot_one.addEventListener('click', ()=>{

        

    if ((mode === "S_master" || mode === "-")  || (( admin_store=== "online")) ){
        icon_click()
        mode = "S_master"
        console.log('cmmmcmmm');
        

        update_server_mode_without_storage(mode)
        localStorage.setItem('mode',JSON.stringify("S_master")) 
        localStorage.setItem('mode_2',JSON.stringify("S_master")) 
        console.log(mode);
        iconnn.classList = ''
        iconnn.classList.add('fa-solid')
        iconnn.classList.add('fa-crown')
    }
    if (upper.id==='') {
        localStorage.setItem('stage',JSON.stringify("first_stage")) 
    }
    
    
    
})
bot_two.addEventListener('click', ()=>{
    console.log("bro");
    

     if ( (mode === "S_master" || mode === "-")  || (( admin_store === "online" )) ){
        console.log('vnncm');
        
        icon_click()
        mode = "H_master"
        console.log('cmmmcmmm');
        update_server_mode_without_storage(mode)
        localStorage.setItem('mode',JSON.stringify("H_master")) 
        localStorage.setItem('mode_2',JSON.stringify("H_master")) 
        iconnn.classList = ''
        iconnn.classList.add('fa-solid')
        iconnn.classList.add('fa-lock')
    }
    if (upper.id==='') {
        localStorage.setItem('stage',JSON.stringify("first_stage")) 
    }
    
    
})
bot_three.addEventListener('click', ()=>{
    console.log(admin_store);
    
    
    if ((mode === "S_master" || mode === "-")  || (( admin_store === "online"  )) ){

        console.log(admin_store);
        icon_click()
        mode = "-"
        console.log('cmmmcmmm');
        update_server_mode_without_storage(mode)
        localStorage.setItem('mode',JSON.stringify("")) 
        localStorage.setItem('mode_2',JSON.stringify("")) 
        console.log(mode);
        iconnn.classList = ''
        iconnn.classList.add('fa-solid')
        iconnn.classList.add( 'fa-circle-nodes')
    }
    if (upper.id==='') {
        localStorage.setItem('stage',JSON.stringify("first_stage")) 
    }
    
    
    
    
})
bot_four.addEventListener('click', ()=>{
    
    console.log((count));
    
    if( !(count % 2) ){
        count = 3
        body.classList.add("admin")
        admin_store= "online" 
        admin_updater()
        localStorage.setItem('admin_2',JSON.stringify(admin_store))
        localStorage.setItem('admin',JSON.stringify(admin_store))
        time_store = current_time()
        localStorage.setItem('time',JSON.stringify(time_store))
        icon_click()

        setTimeout(() => {
            text.innerText = "unadmin"
            bot_four.style.setProperty('--clr', 'aliceblue');
            console.log('bro');
            
            
        }, 2000);
    

    }
    else if((count % 2)){
        
        icon_click()
        admin_store= "manual"
        admin_updater()
        localStorage.setItem('admin_2',JSON.stringify(admin_store))
        localStorage.setItem('admin',JSON.stringify(admin_store))
        body.classList.remove("admin")
        time_store = current_time()
        console.log('bro');
        
        localStorage.setItem('time',JSON.stringify(time_store))
        console.log((body.classList));
        
        setTimeout(() => {
            text.innerText = "admin"
            bot_four.style.setProperty('--clr', 'black');  
        }, 2000);
        count = 2


        
        
    }
   
    

})

    
    


form.addEventListener("submit", (e)=>{
    e.preventDefault()
     pass = input_bar.value
     localStorage.setItem('input',JSON.stringify(pass))    
     
    console.log('here');
    
    password_checker()
    
    
})







