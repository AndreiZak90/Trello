import images from "../img/x.png";

export default class Card {
  constructor() {
    this.btn = document.body.querySelectorAll(".add_card");
    this.btnBox = document.body.querySelectorAll(".btn_box");
    this.btnClose = document.body.querySelectorAll(".form_btn_close");
    this.addCard = document.querySelectorAll(".form_btn_button");
    this.itemBox = document.querySelectorAll(".item_box");
    this.cards = document.querySelectorAll(".card");
    this.close = document.querySelectorAll(".item_card_close");
    this.actualElement = undefined;
  }
  start() {
    this.addValue();
    this.closeValue();
    this.newCard();
    this.removeElem();
    this.transfer();
  }
  addValue() {
    this.btn.forEach((e) => {
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
  closeValue() {
    this.btnClose.forEach((e) => {
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
    this.addCard.forEach((e) => {
      e.addEventListener("click", (el) => {
        el.preventDefault();
        const parent = e.closest(".item_box");
        const elem = parent.querySelector(".cards");
        const current = parent.querySelector(".form_btn_text");

        this.addText(elem, current.value);
        current.value = "";
        const element = parent.querySelector(".add_card");
        const elemNan = parent.querySelector(".form_btn");
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
    console.log(images);
  }

  removeElem() {
    this.close.forEach((e) => {
      e.addEventListener("click", (el) => {
        el.preventDefault();
        const parentElem = e.closest(".card");
        parentElem.remove();
      });
    });
  }

  transfer() {
    let actualElement;
    this.mouseDown = (el) => {
      el.preventDefault();
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
      el.preventDefault();
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
      el.stopPropagation();
      if (!actualElement) return;

      actualElement.style.top = el.pageY - this.shiftY + "px";
      actualElement.style.left = el.pageX - this.shiftX + "px";
    };

    document.addEventListener("mousedown", this.mouseDown);
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("mousemove", this.mouseMove);
  }
}
