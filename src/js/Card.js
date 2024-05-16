import images from "../img/x.png";

export default class Card {
  start() {
    this.addCards();
    this.closeCard();
    this.newCard();
    this.removeCard();
    this.transfer();
    this.save();
  }
  addCards() {
    const btn = document.body.querySelectorAll(".add_card");
    btn.forEach((e) => {
      e.addEventListener("click", (el) => {
        el.preventDefault();
        const parent = e.closest(".item_box");
        const elem = parent.querySelector(".add_card");
        const elemNan = parent.querySelector(".form_btn");
        elem.classList.toggle("none");
        elemNan.classList.toggle("none");
      });
    });
  }
  closeCard() {
    const btnClose = document.body.querySelectorAll(".form_btn_close");
    btnClose.forEach((e) => {
      e.addEventListener("click", (el) => {
        el.preventDefault();
        const parent = e.closest(".item_box");
        const elem = parent.querySelector(".add_card");
        const elemNan = parent.querySelector(".form_btn");
        elem.classList.toggle("none");
        elemNan.classList.toggle("none");
      });
    });
  }
  newCard() {
    const addCard = document.body.querySelectorAll(".form_btn_button");
    addCard.forEach((e) => {
      e.addEventListener("click", (el) => {
        el.preventDefault();
        const parent = e.closest(".item_box");
        const elem = parent.querySelector(".cards");
        const current = parent.querySelector(".form_btn_text");
        const element = parent.querySelector(".add_card");
        const elemNan = parent.querySelector(".form_btn");

        if (current.value === "") {
          element.classList.toggle("none");
          elemNan.classList.toggle("none");
          return;
        }

        this.addText(elem, current.value);

        current.value = "";
        element.classList.toggle("none");
        elemNan.classList.toggle("none");
      });
    });
  }

  addText(elem, current) {
    const li = document.createElement("li");
    li.classList.add("card");
    const p = document.createElement("p");
    p.classList.add("item_card_text");
    p.textContent = current;
    li.append(p);
    const img = document.createElement("img");
    img.src = images;
    img.classList.add("item_card_close");
    li.append(img);
    elem.append(li);

    li.querySelector(".item_card_close").addEventListener("click", (e) => {
      e.preventDefault();
      li.remove();
    });
  }

  removeCard() {
    const removeBtn = document.querySelectorAll(".item_card_close");
    removeBtn.forEach((el) => {
      el.addEventListener("click", (e) => {
        const parent = e.closest(".card");
        console.log(parent);
        parent.remove();
      });
    });
  }

  transfer() {
    let actualElement;
    this.mouseDown = (el) => {
      if (el.target.classList.contains("card")) {
        actualElement = el.target.closest(".card");

        this.shiftX = el.offsetX;
        this.shiftY = el.offsetY;
        actualElement.style = `
				left: ${el.pageX - this.shiftX}px;
				top: ${el.pageY - this.shiftY}px;
			  `;
        actualElement.classList.add("dragged");
      } else {
        return;
      }
    };

    this.mouseUp = (el) => {
      el.stopPropagation();
      if (!actualElement) return;

      const x1 = parseFloat(actualElement.style.left);
      const y1 = parseFloat(actualElement.style.top);
      const targetElem = document.elementFromPoint(x1, y1);

      if (targetElem.classList.contains("card")) {
        let list = targetElem.closest(".cards");
        list.insertBefore(actualElement, targetElem);
      }

      if (targetElem.classList.contains("cards")) {
        targetElem.appendChild(actualElement);
      }

      actualElement.style.top = "";
      actualElement.style.left = "";
      this.shiftX = null;
      this.shiftY = null;
      actualElement.classList.remove("dragged");
      actualElement = undefined;
    };

    this.mouseMove = (el) => {
      el.preventDefault();
      el.stopPropagation();
      if (!actualElement) return;
      actualElement.style.top = el.pageY - this.shiftY + "px";
      actualElement.style.left = el.pageX - this.shiftX + "px";
    };
    document.addEventListener("mousedown", this.mouseDown);
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("mousemove", this.mouseMove);
  }

  save() {
    window.addEventListener("beforeunload", () => {
      const formData = [
        {
          title: "todo",
          cards: [],
        },
        {
          title: "progress",
          cards: [],
        },
        {
          title: "done",
          cards: [],
        },
      ];

      const boxTODO = document.querySelector(".todo");
      const todoItem = boxTODO.querySelector(".cards");
      formData[0].cards = todoItem.innerHTML;
      const boxProgress = document.querySelector(".progress");
      const ProgressItem = boxProgress.querySelector(".cards");
      formData[1].cards = ProgressItem.innerHTML;
      const boxDone = document.querySelector(".done");
      const doneItem = boxDone.querySelector(".cards");
      formData[2].cards = doneItem.innerHTML;

      localStorage.setItem("formData", JSON.stringify(formData));
      //localStorage.clear();
    });

    document.addEventListener("DOMContentLoaded", () => {
      const json = localStorage.getItem("formData");

      let formData;

      try {
        formData = JSON.parse(json);
      } catch (error) {
        console.log(error);
      }

      if (formData) {
        const boxTODO = document.querySelector(".todo");
        const todoItem = boxTODO.querySelector(".cards");
        const boxProgress = document.querySelector(".progress");
        const ProgressItem = boxProgress.querySelector(".cards");
        const boxDone = document.querySelector(".done");
        const doneItem = boxDone.querySelector(".cards");

        todoItem.innerHTML = formData[0].cards;
        ProgressItem.innerHTML = formData[1].cards;
        doneItem.innerHTML = formData[2].cards;
      }
    });
  }
}
