function sortData(){

    var containerOneList = []
    var containerTwoList = []
    var cardIdNames = [] 
    var empty;
    var emptySlotClassNames = []
    var startBtn;
    var instructionContainer;

    function gatherDataAndInitialize(){
        console.log("Gathering Data...!!!")
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            document.body.style.backgroundColor = "grey"
            alert("For better experience use Desktop/Laptop");
            alert("Closing tab")
            window.close()
            
          }else{
            console.log("Normal screen")
           
          }
        const disableselect = (e) => {  
            return false  
          }  

        document.onselectstart = disableselect  // to disable selection, if enabled empty box or cards selected by accident was able to drag and drop
        //document.onmousedown = disableselect
        var userInfo = document.querySelector(".userInformation")
        userInfo.classList.add("hideDisplay")

        var pageTitle = document.querySelector(".pageTitle")
        pageTitle.classList.add('hideDisplay')

        var copyright = document.querySelector('.copyright')
        copyright.classList.add('hideDisplay')

        copyrightContent = document.querySelector('.outerCopyrightContainer')
        copyrightCloseBtn = document.querySelector('.copyrightCloseBtn')
        copyrightNextBtn = document.querySelector('.nbtn')
        console.log("copyright: ", copyrightContent)
        
        startBtn = document.querySelector('.btn')
        closeBtn = document.querySelector('.closeBtn')
        instructionContainer = document.querySelector('.instructionContainer')
        console.log("INSTRUCTIONS: ", instructionContainer)
        //instructionContainer.classList.add('bg-active')
        
        var rearrangementConfirmation = document.querySelector('.confirmationContainer')
        rearrangementConfirmation.classList.add('hideDisplay')

        var rearrangementYes = document.querySelector('.yBtn')
        var rearrangementNo = document.querySelector('.nBtn')   
        
        var finishButton = document.querySelector('.button')
        finishButton.addEventListener('click', function(){
            console.log("clicked finish button",rearrangementConfirmation)
            document.querySelector('.outerContainer').style.filter = "blur(10px)"
            rearrangementConfirmation.classList.remove('hideDisplay')
        })

        rearrangementYes.addEventListener('click',function(){
            alert("Cards can be re-arranged")
            rearrangementConfirmation.classList.add('hideDisplay')
            document.querySelector('.outerContainer').style.filter = "none"
            
        })
    
        rearrangementNo.addEventListener('click',function(){
            alert("Generating PDF")
            document.querySelector('.outerContainer').style.filter = "none"
            rearrangementConfirmation.classList.add('hideDisplay')
            generatePDF.generatePDF()
        })

        copyrightNextBtn.addEventListener('click', function(){
            copyrightContent.style.visibility = "hidden"
            instructionContainer.classList.add('bg-active')
        })

        copyrightCloseBtn.addEventListener('click', function(){
            copyrightContent.style.visibility = "hidden"
            instructionContainer.classList.add('bg-active')
        })

        startBtn.addEventListener('click', function(){
            instructionContainer.classList.remove('bg-active')
            let removeBlur = document.querySelector('.outerContainer')
            removeBlur.style.filter = "none"
        })

        closeBtn.addEventListener('click', function(){
            instructionContainer.classList.remove('bg-active')
            let removeBlur = document.querySelector('.outerContainer')
            removeBlur.style.filter = "none"
        })

        

        cardIdNames = document.querySelectorAll('.blockOne')
        for ( i = 0 ;i < 7; i++) 
            containerOneList.push(cardIdNames[i].id)
        for(i = 7;i < cardIdNames.length; i++)
            containerTwoList.push(cardIdNames[i].id)
    
        empty = document.querySelectorAll("#empty")    
        for (let k = 0;k<empty.length;k++)
            emptySlotClassNames[k] = empty[k].className
        
        console.log("Card Details: ", cardIdNames)
        console.log("empty slot details: ", empty)
        console.log("empty slot class names: ",emptySlotClassNames)
        console.log("Container One List: ", containerOneList)
        console.log("Container Two List: ",containerTwoList)

        console.log("now")
        events.displaySingleSlot(empty)
        events.addListeners(cardIdNames,empty)
        events.deactivateFinishButton()
    }

    function afterFinishButtonPress(cBox, oldNo, newNo, oldYes, newYes)
    {
        /* after yes button press   
                . change innerHTML
                .deactivate old yes button
                .activate new yes button
                    .new yes button press -> alert -> confirmationScreen hide -> blur remove
         after no button press
                .alert 
                .blur removal
                .generate pdf    */

        
    }
    return{
        gatherDataAndInitialize : gatherDataAndInitialize,
        cardIdNames: cardIdNames,
        empty:empty,
        emptySlotClassNames: emptySlotClassNames,
        containerOneList: containerOneList,
        containerTwoList: containerTwoList,
    }
  
}

function events(){

    function displaySingleEmptySlot(empty)
    {
        for(k = 1 ;k<empty.length;k++)
            empty[k].classList.add('hideDisplay')
        afterDropEvents.addToEmptySlotList(empty[0].className)
        empty[0].classList.add('highlightAfterDisplay', 'addBorder')    
            
    }
    function addEListeners(cards,empty)
    {
        cards.forEach(function (element){
            element.addEventListener('dragstart',dragAndDropEvents.dragStart)
            element.addEventListener('dragend', dragAndDropEvents.dragEnd)
    })  

        empty.forEach( function (f)
        {
            f.addEventListener('dragstart', dragAndDropEvents.emptyDragStart);
            f.addEventListener('dragover', dragAndDropEvents.dragOver);
            f.addEventListener('dragenter', dragAndDropEvents.dragEnter);
            f.addEventListener('dragleave', dragAndDropEvents.dragLeave);
            f.addEventListener('dragend', dragAndDropEvents.dragEnd);
            f.addEventListener('drop', dragAndDropEvents.drop);
        })

    }

    function deactivateFinishButton(){

        var button  = document.querySelector('button')
        button.classList.add("hideDisplay")
        console.log("finish button: ",button)
    }

    return {
        displaySingleSlot: displaySingleEmptySlot,
        addListeners:addEListeners,
        deactivateFinishButton: deactivateFinishButton
    }

}


function dragAndDropEvents()
{
    var dragSource
    function dragStart(e)
    {
        console.log(" %c ************************** DRAG START ***********************************************", 'color: darkgreen')
        console.log('this :>> ', this);
        dragSource = this;
        dropEndIn = ""
        console.log("DragSource: ", dragSource)
        e.dataTransfer.effectAllowed = "move"
        e.dataTransfer.setData("text/plain", this.innerHTML)
        console.log("Drag start, from class", this.id)
    }

    function dragEnd(e)
    {
        console.log(" %c ************************** DRAG END ***********************************************", 'color: darkgreen')
    }

    function emptyDragStart(e)
    {
        console.log("***** Drag start from empty containers *****")
        dragSource = this;
        dropEndIn = ""
        console.log("DragSource: ", dragSource)
        e.dataTransfer.effectAllowed = "move"
        e.dataTransfer.setData("text/plain", this.innerHTML)
        console.log("Drag start, from class", this.id)
    }

    function dragOver(e)
    {
        e.preventDefault()
        console.log("Overthe slot", this.className)
    }

    function dragEnter(e)
    {
        console.log("Drag enter")
        this.classList.add('over')
    }

    function dragLeave(e)
    {
        console.log("drag leave")
        this.classList.remove('over')
    }

    function drop(e)
    {
        
        e.stopPropagation()
        console.log(" %c DROPPED",'color: red')
        console.log("this: ", this)

        if (dragSource.id == this.id)
        {
            console.log("*********** Drag and drop within empty container ***********")
            console.log("dragSource.className: ", dragSource.className, "\nthis: ", this, "\nthis.className: ",this.className)
            dragSource.innerHTML = this.innerHTML
            this.innerHTML = e.dataTransfer.getData('text/html')
            this.classList.remove('over')

            if (document.querySelector('.' + dragSource.className).children.length != 1)
            {
                console.log(dragSource.className, " children length ", document.querySelector('.' + dragSource.className).children.length)
                dragSource.classList.add('highlightAfterDisplay','addBorder')
                this.classList.remove('highlightAfterDisplay', 'addBorder')
                console.log("\ndragSource.className: ",dragSource.className, "\nthis.className: ", this.className,".")
                
            }
            
            else if (document.querySelector('.' + dragSource.className).children.length == 1)
                console.log("CONTAINS CHILD: ", document.querySelector('.' + dragSource.className).children.length)
           

            console.log("*********** AFTER DROP ***********","\ndragSource.className: ", dragSource.className, "\nthis: ", this, "\nthis.className: ",this.className, "\n**********************")

        }

        else if (dragSource != this && this.children.length != 1 )
        {
            console.log("Normal Case", this.children.length)
            if (gatherData.containerOneList.indexOf(dragSource.id)!= -1)
            {
                console.log("Container one element")
                console.log(dragSource.id, "Found at: ", gatherData.containerOneList.indexOf(dragSource.id)) 
                afterDropEvents.shiftCards(dragSource.id)  
            }

            dragSource.innerHTML = this.innerHTML
            this.innerHTML = e.dataTransfer.getData('text/html')

            console.log("1.",this.innerHTML)
            console.log("Dragsource.id: ", dragSource.id,"\nthis.id: ", this.id, "\nthis.className: ",this.className)
            this.classList.remove('over','addBorder','highlightAfterDisplay')
            console.log("Dragsource.id: ", dragSource.id,"\nthis.id: ", this.id, "\nthis.className: ",this.className)
            afterDropEvents.emptySlot.pop()
            afterDropEvents.displayNextSlot(dragSource,this)
            dragSource.removeEventListener('dragstart', emptyDragStart)

        }

        else if(dragSource!=this && this.children.length == 1 )
        {
            console.log(this.className, "filled, searching empty slot")
            console.log(afterDropEvents.emptySlot, " empty ")

            var tempContent = this.innerHTML   // store the old content of the slot
            var shiftTo = document.querySelector("."+afterDropEvents.emptySlot[0])  // the next empty slot is available in the emptySlotList and only one element is present, so find that and display the slot
            shiftTo.innerHTML = tempContent   // to the newly found slot transfer the old content
            this.innerHTML = e.dataTransfer.getData('text/html')  // to the old slot transfer the new content

            //afterDropEvents.addRipple(this)

            console.log("1.",this.innerHTML)
            console.log("Dragsource.id: ", dragSource.id,"\nthis.id: ", this.id, "\nthis.className: ",this.className)
            this.classList.remove('over','addBorder','highlightAfterDisplay')
            console.log("Dragsource.id: ", dragSource.id,"\nthis.id: ", this.id, "\nthis.className: ",this.className)
            afterDropEvents.displayNextSlot(dragSource, this)
            shiftTo.classList.remove('over','addBorder','highlightAfterDisplay')
        }
        
    }

    return{
        dragStart: dragStart,
        dragEnd: dragEnd,
        emptyDragStart: emptyDragStart, 
        dragOver: dragOver,
        dragLeave:dragLeave,
        dragEnter: dragEnter,
        drop:drop,
        dragSource: dragSource
    }   
}

function afterDropEvents()
{
    var emptySlotList = []
    var filledSlotList = [] 
    var lastDisplayedSlot = []

    function addToEmptySlotList(destination)
    {
        
        console.log("Card can be dropped at: ", destination)
        emptySlotList.push(destination)
        gatherData.emptySlotClassNames.splice(gatherData.emptySlotClassNames.indexOf(destination),1)
        console.log("UPDATED EmptySlotListClassNames: ",gatherData.emptySlotClassNames)
        console.log("EMPTY SLOT LIST: ",destination)
    }

    function shiftCardsFromSecondcontainer(source)
    {
        console.log("Moving container two element")
        var topElementSecondContainer = gatherData.containerTwoList.shift()
        if (topElementSecondContainer != undefined)
        {
            gatherData.containerOneList.push(topElementSecondContainer)
            console.log("moving ",topElementSecondContainer," from second container...")

            var findSecondContainerTopElement = document.getElementById(topElementSecondContainer)
            console.log("found card from second container", findSecondContainerTopElement)
            var createDiv = document.createElement('div')
            createDiv.appendChild(findSecondContainerTopElement)
            console.log("add this to container one tail:", createDiv)

            var findContainerOne = document.querySelector('.containerOne')
            findContainerOne.appendChild(createDiv)

        }   
            
        display.displayData()

        var findSecondContainerTopElement = document.getElementById(topElementSecondContainer)
        console.log("FOUND ELEMENT: ", findSecondContainerTopElement)

    }

    function displayNextSlot(draggedCard, eSlot)
    {
        console.log("source: ",draggedCard, "\nDestination: ", eSlot)
        draggedCard.classList.add('hideDisplay')
        eSlot.classList.remove('highlightAfterDisplay', 'addBorder','over')

        if (gatherData.containerOneList.indexOf(draggedCard.id)!= -1)
        {
            console.log("Container one element ")
            gatherData.containerOneList.splice(gatherData.containerOneList.indexOf(draggedCard.id),1)
            
        }
        else if (gatherData.containerTwoList.indexOf(draggedCard.id)!=-1)
        {
            console.log("Container two element ")
            gatherData.containerTwoList.splice(gatherData.containerTwoList.indexOf(draggedCard.id),1)
            
        }
       
        let items = gatherData.emptySlotClassNames
        console.log("AfterDropEvent: ", items, items.length)

        if((items.length)!=0)
        {
            let tempEmptySlot = document.querySelector("."+ items[0])

            let poppedEmptySlot = gatherData.emptySlotClassNames.splice(gatherData.emptySlotClassNames[0],1)
            console.log("popped Element: ",poppedEmptySlot[0])
            afterDropEvents.emptySlot.pop()
            afterDropEvents.emptySlot.push(poppedEmptySlot[0])
            console.log("AfterDropEvent: ",tempEmptySlot, tempEmptySlot.className)
            tempEmptySlot.classList.remove('hideDisplay')
            tempEmptySlot.classList.add('highlightAfterDisplay', 'addBorder')
            console.log("AfterDropEvent: ",tempEmptySlot, tempEmptySlot.className)
        }

        else 
            {
                console.log("activate finish button")
                var button  = document.querySelector('button')
                button.classList.remove("hideDisplay")
                button.style.cursor = "pointer"
                console.log("finish button: ",button)
            }  
            console.log("UPDATED EmptySlotListClassNames: ",gatherData.emptySlotClassNames)     
            console.log(" ****************** Displaying data *************************")
            display.displayData()
            console.log(" *************************************************")
    }

    return{
        displayNextSlot: displayNextSlot,
        addToEmptySlotList: addToEmptySlotList, 
        shiftCards: shiftCardsFromSecondcontainer,
        emptySlot : emptySlotList,
        filledSlot: filledSlotList
    }

}

function display()
{
    function displayData()
    {
        console.log("Updated containerOneList: ", gatherData.containerOneList)
        console.log("Updated containerTwoList: ", gatherData.containerTwoList)
        console.log("Updated emptySlotListClassNames: ", gatherData.emptySlotClassNames)
        console.log("Updated emptySlotList: ",afterDropEvents.emptySlot)
    }
    return {
        displayData: displayData
    }
}

function generatePDF()
{
    function saveAsPDF()
    {   
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        var today = new Date();
        var monthName = months[today.getMonth()]
        var year = today.getFullYear()
        var date = today.getDate()
        var cDate = monthName+ "-" + date + "-"+year
        console.log("Date: ",cDate)

        var time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        
        var containerOne = document.querySelector('.containerOne')
        var containerTwo = document.querySelector('.containerTwo')
        var division = document.querySelector('.division')
        var finishButton = document.querySelector('.button')

        containerOne.classList.add('hideDisplay')
        containerTwo.classList.add('hideDisplay')
        division.classList.add('hideDisplay')
        finishButton.style.visibility = "hidden"

        var name = prompt("Name: ")
        if(name == null)
        {
            alert("Name cannot be empty")
            finishButton.style.removeProperty("visibility")
        }
        else
        {   
            name = name.toLowerCase()
            var tName = name.split(" ")
            for (var i = 0; i < tName.length; i++) {
                tName[i] = tName[i].charAt(0).toUpperCase() + tName[i].slice(1);
            }
            name = " "
            for( i = 0;i<tName.length;i++)
                name+=tName[i]+" "
            console.log("FINAL NAME: ", name)
        
            var userInfo = document.querySelector(".userInformation")
            userInfo.classList.remove("hideDisplay")
            var checkNamelen =  document.querySelector(".name").innerHTML
            console.log("NAME: ", checkNamelen, checkNamelen.length)
            document.querySelector(".name").innerHTML += name;
            document.querySelector(".date").innerHTML += cDate;
            document.querySelector(".time").innerHTML += time;

            //Display title
            var pageTitle = document.querySelector(".pageTitle")
            pageTitle.classList.remove('hideDisplay')

            //Display copyright
            var copyright = document.querySelector('.copyright')
            copyright.classList.remove('hideDisplay')
    
            console.log("date: ",date, time)

            const shot = document.querySelector("body")
                var opt = {
                    margin:       0,
                    filename:     name+"_"+cDate+'.pdf',
                    image:        { type: 'jpeg', quality: 0.98 },
                    html2canvas:  { scale: 1 },
                    jsPDF:        { unit: 'in', format: 'A4', orientation: 'landscape' }
                };
            console.log("Generating PDF....!!!")
                
            html2pdf().set(opt).from(shot).save();

            setTimeout(() => { console.log("Actvating finish button!");finishButton.style.removeProperty('visibility');userInfo.classList.add('hideDisplay')
            pageTitle.classList.add('hideDisplay')
            copyright.classList.add('hideDisplay')
            document.querySelector(".name").innerHTML = "Name: ";
            document.querySelector(".date").innerHTML = "Date: ";
            document.querySelector(".time").innerHTML = "Time: ";}, 5000);         

        }
             
    }
    

    return{
        generatePDF: saveAsPDF
    }
}


var dragAndDropEvents = dragAndDropEvents()
var gatherData = sortData()
var events = events()
var afterDropEvents = afterDropEvents()
var display = display()
var generatePDF = generatePDF()

