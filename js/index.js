document.addEventListener("DOMContentLoaded", () => {
   const createMonsterForm = document.querySelector("#create-monster");
   createMonsterForm.innerHTML = `
   <form id="create-monster">
         <input type="text" placeholder="name" id="name" />
         <input type="text" placeholder="age" id="age" />
         <input type="text" placeholder="description" id="desc" />
         <input type="submit" />
      </form>`;
   const form = document.querySelector("form");
   form.addEventListener("submit", (e) => {
      e.preventDefault();
      const monsterObj = {
         name: e.target.name.value,
         age: e.target.age.value,
         description: e.target.desc.value,
      };
      fetch("http://localhost:3000/monsters", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
         },
         body: JSON.stringify(monsterObj),
      })
         .then((res) => res.json())
         .then((data) => console.log(data));
   });

   const monsterContainer = document.getElementById("monster-container");
   let page = 1;
   const addNavListeners = () => {
      let back = document.querySelector("#back");
      let forward = document.querySelector("#forward");

      //   Back Button
      back.addEventListener("click", () => {
         pageDown();
      });

      //   Forward Button
      forward.addEventListener("click", () => {
         pageUp();
      });
   };

   let pageDown = () => {
      page++;
      console.log("down");
   };

   let pageUp = () => {
      page--;
      console.log("Up");
   };

   addNavListeners();
   //    Fetch Data
   fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
      .then((res) => res.json())
      .then((data) => {
         data.forEach((monster) => {
            const monCard = document.createElement("div");
            monCard.innerHTML = `<div>
            <h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p>${monster.description}</p>
            </div>`;
            monsterContainer.append(monCard);
         });
      });
});
