import obj from './budgetbakers copy.json'  assert { type: "json" };
// console.log(obj);

function getTotalNodeCount(obj) {
    return obj.length;
}

function getNodeWithNotes(obj) {
    var counter = 0;
    obj.forEach(ob => ob.note ? counter++ : counter);
    return counter;
}

function getNoteNames(obj) {
    var noteNames = [];
    obj.forEach(ob => { if (ob.note) { noteNames.push(ob.note) } });
    return noteNames;
}
function getCategories(obj){
    var result = obj.filter(ob=>ob?.reservedModelType=="Category").map(ob=>ob);
    var category = [];
    for(var index in result){
        var cat = {};
        cat.name = (result[index].name);
        cat.id = (result[index]._doc_id_rev);
        category.push(cat)
    }
    return category;
}

var categories = getCategories(obj);

function getCategory(obj){
    return categories.filter(cat=>cat.id.includes(obj))[0];
}


function createNoteObjects(obj) {
    var noteNames = [];
    var results = obj.filter(ob=>ob.note).map(ob=>ob);
    
    for(var index in results){
        var holder = {};
        var rec = results[index];
        holder.note = rec.note;
        holder.amount = +((rec.amount/100).toFixed(2));
        holder.paymentType = rec.paymentType;
        holder.type = rec.type;
        holder.recordDate = new Date(rec.recordDate);
        holder.accountId = rec.accountId;
        holder.categoryId = rec.categoryId;
        holder.category = getCategory(rec.categoryId)?.name;
        noteNames.push(holder);
    }
    noteNames.sort((a,b)=>a.recordDate.getTime()-(b.recordDate.getTime()));
    
    return noteNames;
}





console.log("Total Node Count : " + getTotalNodeCount(obj));
console.log("Total Node Count : " + getNodeWithNotes(obj));
// console.log("Total Node Count : " + JSON.stringify(getNoteNames(obj)));
console.log(createNoteObjects(obj));
// console.log(getCategories(obj));


