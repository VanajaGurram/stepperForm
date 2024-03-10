export function deposite(amount){
    return {type:"deposit",payload:amount}
}
export function withdraw(amount){
    return {type:"withdraw",payload:amount}
}
export function nameUpdate(fullName){
    return {type:"nameUpdate",payload:fullName}
}
export function mobileUpdate(mobile){
    return {type:"mobileUpdate",payload:mobile}
}
export function countrtIncrese(){
    return {type:"counterUpdate",payload:2}
}
export function counterDesc(){
    return{ type:"counterDesc",payload:2}
}
export function addTodo(todo){
    return{type:"ADD_TODO",payload:todo};
}
export function editTodo(todo){
    return{type:"EDIT_TODO",payload:todo}
}
export function deleteTodo(id){
    return{type:"DELETE_TODO",payload:id}
}