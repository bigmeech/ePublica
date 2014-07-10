/**
 * Created by larry Eliemenye on 05/06/2014.
 */
<<<<<<< HEAD
'use strict'
//test suite for editor
describe("editor", function(){

  var mockEditorResource;
  beforeEach(function(){
    mockEditorResource = sinon.stub({
      get:function(){

      }
    });
    module(function($provide){
      $provide.value('editorService',mockEditorResource);
    })
  })
  it("should work", function(){
    expect(true).toBe(true);
  });
  it("should call",function(){
    expect(false).toBe(false);
  })

});

//test suit for dashboard
describe("dashboard", function(){
  it("should work", function(){
    expect(true).toBe(true);
  });
  it("should call",function(){
    expect(false).toBe(false);
  })
});
=======
>>>>>>> fef7ca58e08a738f1389a85ae3546224471d28d4
