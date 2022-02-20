import { reactive } from '@vue/composition-api'

const state = reactive({
    keyWord: "b"
})

function changeKeyWord(value) {
    state.keyWord = value
} 

export const test2Store = {
    state,
    changeKeyWord
}