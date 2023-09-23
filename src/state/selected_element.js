import _DEV from "./gui_elements.js"

import DEV from "./gui.js"

import { change_content_editable } from "../utility.js"

import * as Types from "../types.js"
import CLIENT_STORAGE from "./client_storage.js"

/** @type {Types.SelectedElement} */
const SELECTED_ELEMENT = {
    element: _DEV.body,
    selected: false,
    drag_start_element: _DEV.body,
    hovered_element: _DEV.body,
    select(element) {
        if (element === this.element) return false;
        this.deselect()
        this.element = element
        this.selected = true
        this.element?.classList.add('dev-selected')
		DEV.properties.set()
        return true
    },
    deselect() {
        let elems = document.querySelectorAll('.dev-selected')
        for (let elem of elems) {
            elem?.classList.remove('dev-selected')
            change_content_editable(elem, false)
        }
        this.selected = false
    },
    unhover() {
        [
            "center",
            "top",
            "bottom",
            "left",
            "right"
        ].forEach(pos => {
            while (this.hovered_element?.classList.contains(`dev-hover-${pos}`)) {
                this.hovered_element?.classList.remove(`dev-hover-${pos}`)
            }
        })
    },
    remove() {
        if (this.element === DEV.body) return;


        let parent = this.element.parentElement
        this.element.remove()
        this.select(parent)

        CLIENT_STORAGE.history.push()
    }
}

SELECTED_ELEMENT.hovered_element.addEventListener("mouseleave", e => {
    SELECTED_ELEMENT.unhover()
})

export default SELECTED_ELEMENT