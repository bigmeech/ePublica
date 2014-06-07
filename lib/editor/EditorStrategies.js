/**
 * Created by JaneCockblocker on 04/06/2014.
 */

//Abstract Strategy Constructor
var AbStractStrategy = function(strategy){
  this.strategy = strategy;
}

AbStractStrategy.prototype.execute = function(){
  return this.strategy();
}

var BoldStrategy = function(){}
BoldStrategy.prototype