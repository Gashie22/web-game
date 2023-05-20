let xp=0;
let Health=100;
let Gold=50;
let current_weapon = 0;//index of the cuurent weapon we start with= stick
let fighting=0
let monster_health;
let inventory=['stick'] //what we currently have
//updating html elements using refs
let health1,name3

const button1=document.querySelector('#button1')
const button2=document.querySelector('#button2')
const button3=document.querySelector('#button3')
const monsterhealth=document.querySelector('#monsterhealth')
const monstername=document.querySelector('#monstername')
const goldlevel=document.querySelector('#goldlevel')
const healthtext=document.querySelector('#healthlevel')
const instructions=document.querySelector('#instructions')
const monsterstats=document.querySelector('#monsterStats')
const xplevel=document.querySelector('#xplevel')
//onclick properties for buttons

button1.onclick=goStore;
button2.onclick=goCave;
button3.onclick=fightDragon;

//creating an object to remove redudancy
const arr_obj=[
    {
        //goTown object
        name1 : 'town sqaure',
        'button text': ["Go to Store","Go to Cave","Fight Dragon"],
        'button functions':[goStore,goCave,fightDragon],
        text:'You are in the Town Square when you see a sign "Store" ' 
    },
    {
        //goStore object
        name1 : 'store',
        'button text': ["Buy 10 Gold","Buy Weapon (30 Gold)","Go to town Square"],
        'button functions':[byHealth,buyWeapon,goTown],
        text:'You entered the store ! ' 
    },
    {   //goCave object
        name1:'cave',
        'button text' : ['Fight Slime','Fight Beast','go to town'],
        'button functions' : [fightslime,fightbeast,goTown],
        text:'You are in the cave , Now fight'
    },
    // for fighting
    {
    name1 : 'fight',
    'button text': ["Attack","Dodge","Run"],
    'button functions':[attack,dodge,goTown],
    text:'You are fighting a monster'
    },

    //object for killing monster
    {
    name1 : 'kill_monster',
    'button text' : ['go to town square','go to town square','go to town square'],
    'button functions':[goTown,goTown,goTown],
    text : 'you killed the monster'
    },
    //object for killing monster
    {
        name1 : 'loser',
        'button text' : ['REPLAY','REPLAY','REPLAY'],
        'button functions':[restart,restart,restart],
        text : 'Game over'
        },
        
        //object for killing monster
    {
        name1 : 'winner',
        'button text' : ['REPLAY','REPLAY','REPLAY'],
        'button functions':[restart,restart,restart],
        text : 'You are the BEST'
        }  

]

const weapons=[ {
    name2 : 'stick',
    power : 20
},
{
    name2 : 'hammer',
    power : 50
},
{
    name2 : 'sword',
    power : 100
}
]

const monsters = [
    {
        name3 : 'slime',
        level : 2,
        health1 :15 
    },
    {
        name3 :'dragon',
        level : 20,
        health1 : 50
    }
]

    
function attack (){
    instructions.innerText= 'The'+ monsters[fighting].name3 + 'attacks'
    instructions.innerText+='You attact it with your '+weapons[current_weapon].name2 //get the current weapon name
    Health -= monsters[fighting].level
    monsterhealth -= weapons[current_weapon].power+ Math.floor(Math.random()*xplevel)+1 //add random number between 1 and xp
    healthtext.innerText=Health
    monsterhealth.innerText=monsterhealth

    if (Health<=0){
        lose()
    }else if (monster_health<=0){
        if(fighting===2){
            winGame()
        }else {
            deafet_monster  ()
        }
    }


}
function dodge(){
    instructions.innerText='You dodge attack for the '+ monsters[fighting].name3

}
function remove_redundancy(arr){
    button1.innerText=arr ['button text'][0]
    button2.innerText=arr ['button text'][1]
    button3.innerText=arr ['button text'][2]
    button1.onclick=arr['button functions'][0];
    button2.onclick=arr['button functions'][1];
    button3.onclick=arr['button functions'][2];
    instructions.innerText=arr.text

}
//the functions
function goStore (){
  //  button1.innerText="Buy 10 Gold"
   // button2.innerText="Buy Weapon (30 Gold)"
   // button3.innerText="Go to town Square"
   // button1.onclick=byHealth;
   // button2.onclick=buyWeapon;
   // button3.onclick=goTown;
   // instructions.innerText="You entered the store !"
   remove_redundancy(arr_obj[1])

}
function byHealth(){ //health costs 10 gold coins
    if (Gold>=10){
        Health+=10
       Gold-=10
        goldlevel.innerText=Gold
        healthtext.innerText=Health
    } else
    {
        instructions.innerText="Not enough Gold to buy health"
    }

}
function buyWeapon(){ //weapon costs 30 gold
   if (current_weapon<weapons.length-1){ //size of weapns array
    if (Gold>=30){
        Gold-=30
        current_weapon++
        goldlevel.innerText=Gold
        instructions.innerText='new weapon acquired'
        let new_weapon = weapons[current_weapon].name2 //returns only the weapon name using curr_weapon as index
        inventory.push(new_weapon ) // adds the new weapon into the inventory
        instructions.innerText='You have '+ inventory + 'in your inventory'
    } else{
        instructions.innerText='You do not have enough gold for this weapon'
    }

   } else{
    instructions.innerText= 'You have the best weapons in stock'
    //make button2 a sell button
    button2.innerText='Sell current weapon(s)'
    button2.onclick=sellWeapons
   }

}
function sellWeapons(){
    if (inventory.length>1){
        Gold+=15
        goldlevel.innerText=Gold
        let current_weap=instructions.shift()
        instructions.innerText='You sold '+ current_weap
        instructions.innerText='You are left with '+ inventory
    }else{
        instructions.innerText = "You have nothing to sell"
    }
}
function goCave(){
    remove_redundancy(arr_obj[2])

}

function goTown(){
    //button1.innerText="Go to Store"
    //button2.innerText="Go to Cave"
   // button3.innerText="Fight Dragon"
    //button1.onclick=goStore;
    //button2.onclick=goCave;
    //button3.onclick=fightDragon;
    //instructions.innerText='You are in the Town Square when you see a sign "Store" ' 
    remove_redundancy(arr_obj[0] )

}
 function fightslime(){
    fighting=0 // index position of the first monnster , uses same logic as curr_weapon
    goFight()
  
 }
function fightbeast(){
    fighting=1
    goFight()

}
function fightDragon(){
    fighting = 2
    let health1
    goFight();

}
function goFight(){
    remove_redundancy(arr_obj[3]) // passing in the current location of the fighting obj
    monsterhealth=monsters[fighting].health1; // updates health to the cuurent monster 
    monsterstats.style.display='block' // js code to upudate the the css we had previously set to displ;ay=none
    monstername.innerText=monsters[fighting].name3 //name od the monster we are currently fighting
    monsterhealth.innerText=monsters[fighting].health1

} 

function deafet_monster(){
    Gold+= Math.floor(monsters[fighting].level*6.7)//set gold to that and round it off to the nearest whole nmbver
    xp += monsters[fighting].level
    xp.innerText=xp
    remove_redundancy(arr_obj[4])
}
function lose (){
    remove_redundancy(arr_obj[5])
}
function winGame(){
    remove_redundancy(arr_obj[6])
} 
function restart (){
    xp=0
    Health=100
    Gold=50
    current_weapon=0
    inventory=['stick']
    goldlevel=Gold
    healthtext.innerText=Health
    xplevel.innerText=xp
    goTown()

}
