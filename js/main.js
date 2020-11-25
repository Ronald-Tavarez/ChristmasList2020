window.onload = function()
{
    const ListContainer = document.getElementById('ListContainer');
    const MainHeader = document.getElementById('MainHeader');
    const MainContent = document.getElementById('Content');
    const Buttons = new Array();
    const ContentContainers = new Array();
    let List;

    // Get List of Gifts
    fetch('/js/gifts.json')
    .then(res => res.json())
    .then(data => List = data)
    .then(() => {

        // Add Listener to Main Header
        MainHeader.addEventListener('click', function(){
            MainContent.scrollIntoView();
        });

        // Create Button Container
        ListContainer.innerHTML += `<nav id="navigation"></nav>`;
        let Navigation = document.getElementById('navigation');

        // Populate Button Container with Gift Section Navigation Buttons
        for (let Section of List.sections)
        {
            Navigation.innerHTML += `<button class="DropDownButton" id="${Section.title}" ${Section.title == "Electronics" ? 'Toggle="On"' : 'Toggle="Off"'}>${Section.icon}<br/>${Section.title}<br/>▼</button>`;
            // if (Section != List.sections[List.sections.length - 1])
            //     Navigation.innerHTML += `<span class"Divider">|</span>`;
        }
        // Populate List Container with Content Sections
        for (let Section of List.sections)
        {
            ListContainer.innerHTML += `<div class="DropDownContent" id=${Section.title}Content style="display: none;"></div>`;
            let Content = document.getElementById(`${Section.title}Content`);
            
            // Populate Content Section with Gifts of that Section
            for (let Gift of Section.gifts)
            {
                Content.innerHTML += 
                `<a href="${Gift.link}" target="_blank" title="${Gift.title}">
                    <span class="DropDownGroup">
                        <h2 class="DropDownLinkTitle">${Gift.title}</h2>
                        <img class="ClothingImage" src="${Gift.path}" alt="${Gift.title} Image">
                    </span>
                </a>`;
            }
        }
        
        // Get All Section Navigation Buttons
        for (let Button of document.getElementsByClassName('DropDownButton'))
            Buttons.push(Button);
        
        // Get All Gift Content Containers
        for (let Section of List.sections)
            ContentContainers.push(document.querySelectorAll(`#${Section.title}Content`)[0]);


        Buttons.forEach(Button => {
            if(Button.getAttribute("Toggle") == "On")
            {
                Button.innerHTML = Button.innerHTML.replace(/.$/, "►");
                ContentContainers[ContentContainers.findIndex(c => c.getAttribute("id") == `${Button.getAttribute("id")}Content`)].style.display = "grid";
            }
        });

        // Add Event Listener To All Section Navigation Buttons
        Buttons.forEach(Button => Button.addEventListener('click', function(Event) {

            // Toggle, "Toggle" Attribute & Adjust InnerText of Element to Match
            if (Button.getAttribute("Toggle") == "Off" || Button.getAttribute("Toggle") == undefined)
            {
                Button.setAttribute("Toggle", "On");
                Button.innerHTML = Button.innerHTML.replace(/.$/, "►");
                ContentContainers[ContentContainers.findIndex(c => c.getAttribute("id") == `${Button.getAttribute("id")}Content`)].style.display = "grid";
                Buttons.forEach(e => {
                    if (e != Button && e.getAttribute("Toggle") == "On")
                    {
                        e.setAttribute("Toggle", "Off");
                        e.innerHTML = e.innerHTML.replace(/.$/, "▼");
                        ContentContainers[ContentContainers.findIndex(c => c.getAttribute("id") == `${e.getAttribute("id")}Content`)].style.display = "none";
                    }
                });
            }
            else
            {
                Button.setAttribute("Toggle", "Off");
                Button.innerHTML = Button.innerHTML.replace(/.$/, "▼");
                ContentContainers[ContentContainers.findIndex(c => c.getAttribute("id") == `${Button.getAttribute("id")}Content`)].style.display = "grid";
            }
        }))
    });
}
