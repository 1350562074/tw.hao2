var condition = require('../main/datbase.js');
function printInventory(inputs){
loadAllItems=condition.loadAllItems();
loadPromotions=condition.loadPromotions();
var result = '***<没钱赚商店>购物清单***\n';
var res ='';
var sum =0.00;
var sum1=0.00;
for(var i=0;i<loadAllItems.length;i++){
    loadAllItems[i].count = 0;
    for(var j=0;j<inputs.length;j++){
        if(inputs[j].substr(0,10)==loadAllItems[i].barcode){  
            if(inputs[j].length<11){
                loadAllItems[i].count++;
            }
            else{
            inputs[j].substr(11,1);
            loadAllItems[i].count+=parseInt(inputs[j].substr(11,1));
        }
     }
    }
 }
 var temp=[];
 for(var i=0;i<loadAllItems.length;i++){
 if(loadAllItems[i].count!=0){
     loadAllItems[i].price =loadAllItems[i].price.toFixed(2);
   temp.push(loadAllItems[i]);
 }
}
 for(var i=0;i<temp.length;i++){
     for(var j=0;j<loadPromotions.length;j++){
         if(temp[i].barcode==loadPromotions[j]){
            temp[i].cheap = parseInt(temp[i].count/3);
            break;
    }
        else {
            temp[i].cheap =parseInt(temp[i].count/3);}
}
 }
for(var i=0;i<temp.length;i++){
   result +='名称：'+temp[i].name+'，数量：'+temp[i].count+temp[i].unit+'，单价：'+temp[i].price+'(元)，小计：'+(temp[i].price*(temp[i].count-temp[i].cheap)).toFixed(2)+'(元)\n';
   sum +=temp[i].price*(temp[i].count-temp[i].cheap);
   if(temp[i].cheap!=0)
   {
    res +='名称：'+temp[i].name+'，数量：'+temp[i].cheap+temp[i].unit+'\n';
    sum1 +=temp[i].cheap*temp[i].price;
   }
}
result +='----------------------\n'+'挥泪赠送商品：\n';
result += res+'----------------------\n';
result +='总计：'+sum.toFixed(2)+'(元)\n'+'节省：'+sum1.toFixed(2)+'(元)\n'+'**********************';

console.log(result);
}

module.exports =printInventory;
