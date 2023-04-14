import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-c765c-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("button")
const shoppingListEl = document.getElementById("shopping-list")

// add button
addButtonEl.addEventListener("click", function() {

    let inputValue = inputFieldEl.value

    if (inputValue === "") {
        return
        } else {
            
        push(shoppingListInDB, inputValue)

        clearInputFieldEl()
        }   
    }
)

onValue(shoppingListInDB, function(snapshot) {

    if (snapshot.exists()) {
        
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]

            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            addItemToShoppingListEl(currentItem)
            }
        } else {
            shoppingListEl.innerHTML = "No items in shopping list"
        }

    
    }
)

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}
function clearInputFieldEl() {
    inputFieldEl.value = ""
}
function addItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {

        let exactLocationOfItemDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationOfItemDB) 
    })

    shoppingListEl.append(newEl)
}

